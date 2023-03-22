<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class Discipline extends BaseController
{
    public function index()
    {
        return view('discipline');
    }
}
