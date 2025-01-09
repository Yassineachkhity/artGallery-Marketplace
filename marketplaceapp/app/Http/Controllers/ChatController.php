<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use App\Events\NewMessage;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function sendMessage(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string'
        ]);

        $message = ChatMessage::create([
            'sender_id' => auth()->id(),
            'receiver_id' => $request->receiver_id,
            'message' => $request->message
        ]);

        // Load relationships if necessary
        $message->load(['sender', 'receiver']);

        // Broadcast the message
        broadcast(new NewMessage($message))->toOthers();

        return response()->json($message);
    }

    public function getMessages(Request $request, $user_id)
    {
        $messages = ChatMessage::where(function ($query) use ($user_id) {
            $query->where('sender_id', auth()->id())
                  ->where('receiver_id', $user_id);
        })->orWhere(function ($query) use ($user_id) {
            $query->where('sender_id', $user_id)
                  ->where('receiver_id', auth()->id());
        })
        ->with(['sender:id,name,email', 'receiver:id,name,email'])
        ->orderBy('created_at', 'ASC')
        ->get();

        return response()->json($messages);
    }

    public function markAsRead(Request $request)
    {
        $request->validate([
            'sender_id' => 'required|exists:users,id',
        ]);

        ChatMessage::where('receiver_id', auth()->id())
                  ->where('sender_id', $request->sender_id)
                  ->where('is_read', false)
                  ->update(['is_read' => true]);

        return response()->json(['success' => true]);
    }
}
