<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class Series extends BaseController
{
    public function index()
    {
        return view('series');
    }
}
