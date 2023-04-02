<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class Login extends BaseController
{
    public function index()
    {
        session()->remove('tokenAuth');
              
        return view('login.html');
    }
   
}
