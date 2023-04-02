<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use Config\Services;

class Teacher extends BaseController
{
    public function index()
    {
        if (!session()->has('tokenAuth')) {
            return redirect()->to('/');
        }
        return view('teacher');
    }
}
