<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Libraries\GenerateToken;
use Config\Services;

class Discipline extends BaseController
{
    private $service;
    private $generateToken;
    public function __construct()
    {
        $this->service = new Services();

        $this->generateToken = new GenerateToken();
    }
    public function index()
    {
        if (!session()->has('tokenAuth')) {
            return redirect()->to('/');
        }
        
        $tokenSession = session()->get('tokenAuth');

        $this->generateToken->setKey($this->service->getSecretKey());        

        if (!$this->generateToken->validate($tokenSession)) {
            return redirect()->to('/');
        }
        
        return view('discipline');
    }
}
