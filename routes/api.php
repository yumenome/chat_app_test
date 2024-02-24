<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use PHPUnit\Framework\MockObject\Stub\ReturnStub;

Route::get('/users',[UserController::class, 'users']);
Route::get('/groups/{id}',[EventController::class, 'groupRooms']);

Route::middleware('auth:sanctum')->get('/user',[UserController::class, 'index']);


Route::post('/searchRoom',[EventController::class, 'searchRoom']);
Route::post('/createGroup',[EventController::class, 'createGroupRoom']);
Route::post('/messages',[EventController::class, 'RoomMessages']);
Route::post('/send_noti',[EventController::class, 'SendNoti']);
Route::post('/set_question_setting',[EventController::class, 'setQuestionSetting']);
Route::get('/set_question_setting/{id}',[EventController::class, 'setting']);
Route::post('/set_question',[EventController::class, 'setQuestion']);


