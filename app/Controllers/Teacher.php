<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use Config\Services;

class Teacher extends BaseController
{
    public function index()
    {

        //$data = [ 'data' => session()->set('testSession', $this->generateJWT())];

        //var_dump(session()->get('testSession'));

         //echo "<script>document.write(sessionStorage.setItem('auth_Token', '".$this->generateJWT()."'))</script>";

        
         
         setcookie("token", $this->generateJWT());


        return view('teacher');

        //return $this->generateJWT();
        //$token = $this->generateJWT();
        //var_dump($token.'a');
        //return $this->validateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Nzk1MzI0MDYsImV4cCI6MTY3OTUzMjQ2Nn0=.GV7B8XdtXHWSjYZiIaB7dvM0IwrwASdPnduhzhkfWAI=');
    }

    protected function generateJWT()
    {
        $key = Services::getSecretKey();
        $time = time();

        $header = [
            'alg' => 'HS256',
            'typ' => 'JWT'
        ];

        $h = base64_encode(json_encode($header));

        $payload = [
            //'aud' => base_url(),
            'iat' => $time,
            'exp' => $time + 60,
            // 'data'=> [
            //     'login' => $usuario['login'],
            //     'id_system' => $usuario['id_system']
            // ]
        ];

        //$jwt = JWT::encode($payload,$key, 'HS256');
        $p = base64_encode(json_encode($payload));

        $s = base64_encode(hash_hmac('sha256', $h . '.' . $p, $key, true));

        $jwt = $h . "." . $p . "." . $s;

        return $jwt;
    }

    protected function validateToken($token)
    {
        $dados = explode('.', $token);
       

        $header = $dados[0];
        $payload = $dados[1];
        $signature = $dados[2];

        $key = Services::getSecretKey();

        $validate = base64_encode(hash_hmac('sha256', $header . '.' . $payload, $key, true));
        $time_exp = json_decode(base64_decode($payload));      
        
        if ($signature == $validate && $time_exp->exp > time()) {            
            
            return true;
        }
        return false;
    }
}
