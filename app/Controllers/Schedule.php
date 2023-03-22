<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class Schedule extends BaseController
{
    public function index()
    {
        return view('schedule');
    }
}
