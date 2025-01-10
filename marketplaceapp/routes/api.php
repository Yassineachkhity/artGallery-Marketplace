<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImageGenerationController;
use App\Http\Controllers\ArtworkController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/generate-image/text', [ImageGenerationController::class, 'generateFromText']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    // Add this new route for getting all users except admin
    Route::get('/users', function (Request $request) {
        return \App\Models\User::where('id', '>', 1)->get(['id', 'name', 'email']);
    });
    
    Route::post('/messages', [ChatController::class, 'sendMessage']);
    Route::get('/messages/{user_id}', [ChatController::class, 'getMessages']);
    Route::post('/messages/mark-read', [ChatController::class, 'markAsRead']);
});

// Public Route
Route::get('/artworks', [ArtworkController::class, 'index']);
Route::get('/artworks/{artwork}', [ArtworkController::class, 'show']);

// Protected Routes for Admin
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/artworks', [ArtworkController::class, 'store']);
    Route::post('/artworks/{artwork}', [ArtworkController::class, 'update']);
    Route::delete('/artworks/{artwork}', [ArtworkController::class, 'destroy']);
});