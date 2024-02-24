<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index() {
        return auth()->user();
    }

    public function users(){
        return User::all();
    }
}
