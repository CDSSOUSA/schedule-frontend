<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class Schedule extends BaseController
{
    public function index()
    {
        if (!session()->has('tokenAuth')) {
            return redirect()->to('/');
        }
        return view('schedule');
    }
}
