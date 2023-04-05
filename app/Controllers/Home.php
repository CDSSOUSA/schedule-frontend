<?php

namespace App\Controllers;

use App\Libraries\GenerateToken;
use Config\Services;

class Home extends BaseController
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
        $uri = current_url(true)->getQuery();

        if(!$uri && !session()->has('tokenAuth') ) {
            return redirect()->to('/');
        }

        $tokenAuth = str_replace("token=", "", $uri);

        if (!session()->has('tokenAuth')) {
            session()->set('tokenAuth', $tokenAuth);
        } 
        // else {

        //     echo 'estou sem token';
        // }
        //echo session()->get('tokenAuth');

        if (!session()->has('tokenAuth')) {
            return redirect()->to('/');
        }

        $tokenSession = session()->get('tokenAuth');

        $this->generateToken->setKey($this->service->getSecretKey());

        if (!$this->generateToken->validate($tokenSession)) {
            return redirect()->to('/');
        }

        return view('home');
    }
}
