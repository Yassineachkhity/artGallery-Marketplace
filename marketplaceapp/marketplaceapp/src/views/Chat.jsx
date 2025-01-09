import React, { useState, useEffect, useRef } from 'react';
import axiosClient from '../axiosClient';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { useStateContext } from '../context/ContextProvider';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import DarkModeToggle from '../components/DarkModeToggle';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const messagesEndRef = useRef(null);
    const { user } = useStateContext();
    const adminId = 1;

    useEffect(() => {
        if (!user) return;

        // If user is admin, load all users
        if (user.id === adminId) {
            loadUsers();
        }

        // Initialize Laravel Echo
        window.Echo = new Echo({
            broadcaster: 'pusher',
            key: import.meta.env.VITE_PUSHER_APP_KEY,
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
            forceTLS: true
        });

        // Load messages if user is not admin or if a user is selected
        if (user.id !== adminId || selectedUser) {
            loadMessages();
        }

        // Listen for new messages
        const chatId = user.id === adminId && selectedUser ? selectedUser.id : user.id;
        window.Echo.private(`chat.${chatId}`)
            .listen('NewMessage', (e) => {
                setMessages(prev => [...prev, e.message]);
                scrollToBottom();
                markMessageAsRead(e.message.sender_id);
            });

        return () => {
            if (window.Echo) {
                window.Echo.leave(`chat.${chatId}`);
            }
        };
    }, [user, selectedUser]);

    const loadUsers = async () => {
        try {
            const response = await axiosClient.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error loading users:', error);
        }
    };

    const loadMessages = async () => {
        try {
            setLoading(true);
            const userId = user.id === adminId ? selectedUser.id : adminId;
            const response = await axiosClient.get(`/messages/${userId}`);
            setMessages(response.data);
            scrollToBottom();
            if (response.data.length > 0) {
                markMessageAsRead(userId);
            }
        } catch (error) {
            console.error('Error loading messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const markMessageAsRead = async (senderId) => {
        try {
            await axiosClient.post('/messages/mark-read', {
                sender_id: senderId
            });
        } catch (error) {
            console.error('Error marking messages as read:', error);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
    
        const tempId = Date.now();
        const tempMessage = {
            id: tempId,
            message: newMessage.trim(),
            sender_id: user.id,
            created_at: new Date().toISOString(),
            temp: true, // Indicateur pour le message temporaire
        };
    
        setMessages(prev => [...prev, tempMessage]);
        scrollToBottom();
        setNewMessage('');
    
        try {
            const receiverId = user.id === adminId ? selectedUser.id : adminId;
            const response = await axiosClient.post('/messages', {
                receiver_id: receiverId,
                message: newMessage.trim()
            });
            // Remplacer le message temporaire par le message réel du serveur
            setMessages(prev => prev.map(msg => msg.id === tempId ? response.data : msg));
        } catch (error) {
            console.error('Error sending message:', error);
            // Optionnel : retirer le message temporaire ou afficher une erreur
            setMessages(prev => prev.filter(msg => msg.id !== tempId));
        }
    };
    

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Welcome to the Chat App</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Please log in to use the chat.</p>
                </div>
            </div>
        );
    }

    if (user.id === adminId && !selectedUser) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Chat Dashboard</h2>
                    <DarkModeToggle />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {users.map((u) => (
                        <div
                            key={u.id}
                            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer flex items-center space-x-4"
                            onClick={() => setSelectedUser(u)}
                        >
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-xl font-semibold text-blue-600 dark:text-blue-300">
                                {u.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-800 dark:text-white">{u.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{u.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex justify-center items-center">
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 p-4 mt-12">
                    <div className="flex items-center">
                        {user.id === adminId && selectedUser && (
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="mr-4 p-2 bg-gray-300 dark:bg-gray-600 rounded-full hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors text-gray-700 dark:text-gray-200"
                            >
                                <FaArrowLeft />
                            </button>
                        )}
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-lg font-semibold text-blue-600 dark:text-blue-300">
                                {(selectedUser ? selectedUser.name : 'A').charAt(0)}
                            </div>
                            <h2 className="ml-3 text-xl font-semibold text-gray-800 dark:text-white">
                                Chat with {selectedUser ? selectedUser.name : 'Admin'}
                            </h2>
                        </div>
                    </div>
                    <DarkModeToggle />
                </div>

                <div className="flex flex-col h-[600px]">
                    <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
                        {loading ? (
                            <div className="flex items-center justify-center h-full">
                                <svg className="animate-spin h-8 w-8 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                            </div>
                        ) : messages.length === 0 ? (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-400 dark:text-gray-500">No messages yet. Start the conversation!</p>
                            </div>
                        ) : (
                            messages.map((message) => (
                                <div
                                    key={message.id || message.tempId}
                                    className={`mb-4 flex ${
                                        message.sender_id === user.id ? 'justify-end' : 'justify-start'
                                    }`}
                                >
                                    <div>
                                        <div
                                            className={`max-w-xs md:max-w-md p-4 rounded-lg shadow ${
                                                message.sender_id === user.id
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                                            }`}
                                        >
                                            {message.message}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {new Date(message.created_at).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={sendMessage} className="p-4 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            />
                            <button
                                type="submit"
                                className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center"
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
