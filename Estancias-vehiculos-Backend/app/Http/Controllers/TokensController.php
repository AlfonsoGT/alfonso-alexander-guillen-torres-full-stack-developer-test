<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Validator;
use App\Models\User;

class TokensController extends Controller
{   
    public function __construct()
    {
        
        $this->middleware('jwt.auth', ['except' => ['login']]);
    }
    
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required'
        ]);
        if($validator-> fails()){
            return response()-> json([
                'success' =>  false,
                'message' => 'Wrong validation',
                'errors' => $validator->errors()
            ]);
        }
        
        $token = JWTAuth::attempt($credentials);

            if ($token ){
	            return response()->json([
                    'success' =>  true,
                    'token' => $token,
                    'User' => User::Where('email', $credentials['email'])->get()->first()
                ], 200); //status 200

            } else { //credenciales incorrectas
                    return response()-> json([
                   'success' =>  false,
                   'message' => 'Wrong credentials',
                   'errors' => $validator->errors()
                    ], 401);
                    } //status 401 unauthorizate
    }

    public function refreshToken()
    {
        $token = JWTAuth::getToken();
        try {
            $token = JWTAuth::refresh($token);
            return response()->json([
                'success' =>  true,
                'token' => $token
            ]); 

        } catch (TokenExpiredException $ex) {
            return response()->json([
                'success' =>  false,
                'message' => 'Need to Login again please (expired)!'
            ]); 
        } catch (TokenBlacklistedException $ex) {
            return response()->json([
                'success' =>  false,
                'message' => 'Need to Login again please (blacklisted)!'
            ]); 
        }
        

    }


    public function logout()
    {
        $token = JWTAuth::getToken();

        try {
            JWTAuth::invalidate($token);

            return response()->json([
                'success' =>  true,
                'message' => 'Logout successful'
            ], 200); 
        } catch (JWTExeption $ex) {
            return response()->json([
                'success' =>  false,
                'message' => 'Failed Logout, please try again!'
            ], 422);
            
        }
    }
}
