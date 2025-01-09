<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class ImageGenerationController extends Controller
{
    protected $client;
    protected $huggingfaceApiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->huggingfaceApiKey = env('HUGGINGFACE_API_KEY');
    }

    /**
     * Génère une image à partir d'un prompt textuel.
     */
    public function generateFromText(Request $request)
    {
        $request->validate([
            'prompt' => 'required|string',
        ]);

        $prompt = $request->input('prompt');

        try {
            $response = $this->client->post('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $this->huggingfaceApiKey,
                    'Content-Type'  => 'application/json',
                ],
                'json' => [
                    'inputs' => $prompt,
                ],
            ]);

            $statusCode = $response->getStatusCode();
            if ($statusCode !== 200) {
                return response()->json(['error' => 'Erreur lors de la génération de l\'image.'], $statusCode);
            }

            $imageData = $response->getBody()->getContents();
            // Les réponses de Hugging Face peuvent être des images encodées en base64 ou des URL selon le modèle
            return response($imageData, 200)->header('Content-Type', 'image/png');
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur : ' . $e->getMessage()], 500);
        }
    }
}
