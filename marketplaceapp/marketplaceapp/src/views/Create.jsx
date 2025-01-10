import React, { useState, useRef } from 'react';
import axiosClient from '../axiosClient';

const Create = () => {
    const [prompt, setPrompt] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // For audio recording management
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef(null);

    const startRecording = () => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Votre navigateur ne supporte pas l\'API de reconnaissance vocale.');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'fr-FR';

        recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                const transcriptPart = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcriptPart;
                } else {
                    interimTranscript += transcriptPart;
                }
            }

            setTranscript(finalTranscript + interimTranscript);
        };

        recognition.onerror = (event) => {
            console.error('Erreur de reconnaissance vocale :', event.error);
            setError('Erreur de reconnaissance vocale : ' + event.error);
            setIsRecording(false);
            recognition.stop();
        };

        recognition.onend = () => {
            setIsRecording(false);
        };

        recognition.start();
        setIsRecording(true);
    };

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsRecording(false);
    };

    const handleTextSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setImage(null);

        try {
            const response = await axiosClient.post('/generate-image/text', { prompt }, {
                responseType: 'blob',
            });
            const imageUrl = URL.createObjectURL(response.data);
            setImage(imageUrl);
        } catch (err) {
            setError('Erreur lors de la génération de l\'image à partir du texte.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAudioSubmit = async () => {
        if (!transcript.trim()) {
            setError('Aucune transcription disponible pour générer une image.');
            return;
        }

        setLoading(true);
        setError('');
        setImage(null);

        try {
            const response = await axiosClient.post('/generate-image/text', { prompt: transcript }, {
                responseType: 'blob',
            });
            const imageUrl = URL.createObjectURL(response.data);
            setImage(imageUrl);
        } catch (err) {
            setError('Erreur lors de la génération de l\'image à partir de l\'audio.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl w-full mt-12">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Générateur d'Images par IA</h1>

                {/* Text to Image Form */}
                <form onSubmit={handleTextSubmit} className="mb-8">
                    <h2 className="text-xl font-medium text-gray-700 mb-4">Texte vers Image</h2>
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Entrez votre prompt ici..."
                        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <button
                        type="submit"
                        className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ${
                            loading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        disabled={loading}
                    >
                        {loading ? 'Génération en cours...' : 'Générer l\'Image'}
                    </button>
                </form>

                {/* Audio to Image Form */}
                <div className="mb-8">
                    <h2 className="text-xl font-medium text-gray-700 mb-4">Audio vers Image</h2>
                    <div className="flex items-center mb-4">
                        <button
                            onClick={isRecording ? stopRecording : startRecording}
                            className={`flex items-center justify-center w-12 h-12 rounded-full focus:outline-none transition duration-200 ${
                                isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                            }`}
                            aria-label={isRecording ? 'Arrêter l\'enregistrement' : 'Démarrer l\'enregistrement'}
                        >
                            {isRecording ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16 3.422A2 2 0 0021 17.236V6.764a2 2 0 00-3.84-1.088L12 8.5l-5.16-3.804A2 2 0 003 6.764v10.472a2 2 0 003.84 1.088L12 14z" />
                                </svg>
                            )}
                        </button>
                        <span className="ml-4 text-gray-700">
                            {isRecording ? 'Enregistrement en cours...' : 'Cliquez pour enregistrer'}
                        </span>
                    </div>
                    <div className="mb-4">
                        <textarea
                            value={transcript}
                            onChange={(e) => setTranscript(e.target.value)}
                            placeholder="La transcription apparaîtra ici..."
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            rows={4}
                            readOnly
                        />
                    </div>
                    <button
                        onClick={handleAudioSubmit}
                        className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ${
                            loading || !transcript.trim() ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        disabled={loading || !transcript.trim()}
                    >
                        {loading ? 'Génération en cours...' : 'Générer l\'Image à partir de l\'Audio'}
                    </button>
                </div>

                {/* Display Generated Image */}
                {image && (
                    <div className="mt-8 text-center">
                        <h2 className="text-xl font-medium text-gray-700 mb-4">Résultat</h2>
                        <img src={image} alt="Générée par IA" className="mx-auto rounded-md shadow-md max-h-96" />
                    </div>
                )}

                {/* Display Errors */}
                {error && (
                    <div className="mt-4 text-center">
                        <p className="text-red-600">{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Create;
