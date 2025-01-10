<?php

namespace App\Http\Controllers;

use App\Models\Artwork;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ArtworkController extends Controller
{
    public function index()
    {
        $artworks = Artwork::latest()->get();
        return response()->json(['data' => $artworks]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image_title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        try {
            if (!$request->hasFile('image')) {
                return response()->json([
                    'message' => 'No image file provided'
                ], 422);
            }

            $imagePath = $request->file('image')->store('artworks', 'public');

            $artwork = Artwork::create([
                'image_title' => $request->image_title,
                'description' => $request->description,
                'image_path' => asset('storage/' . $imagePath)
            ]);

            return response()->json([
                'message' => 'Artwork created successfully',
                'data' => $artwork
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating artwork: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creating artwork',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Artwork $artwork)
    {
        return response()->json(['data' => $artwork]);
    }

    public function update(Request $request, Artwork $artwork)
    {
        $request->validate([
            'image_title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        try {
            $data = [
                'image_title' => $request->image_title,
                'description' => $request->description,
            ];

            if ($request->hasFile('image')) {
                // Delete old image
                $oldPath = str_replace(asset('storage/'), '', $artwork->image_path);
                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }

                // Store new image
                $imagePath = $request->file('image')->store('artworks', 'public');
                $data['image_path'] = asset('storage/' . $imagePath);
            }

            $artwork->update($data);

            return response()->json([
                'message' => 'Artwork updated successfully',
                'data' => $artwork
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating artwork: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error updating artwork',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Artwork $artwork)
    {
        try {
            // Delete the image file
            $imagePath = str_replace(asset('storage/'), '', $artwork->image_path);
            if (Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }

            $artwork->delete();

            return response()->json([
                'message' => 'Artwork deleted successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting artwork: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error deleting artwork',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
