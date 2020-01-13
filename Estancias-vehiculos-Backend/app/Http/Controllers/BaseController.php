<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;


class BaseController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }
    
    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */

    public function sendResponse($result, $message)
    {

    	$response = [
            'success' => true,
            'data'    => $result,
            'message' => $message,
        ];

        return response()->json($response, 200);
    }


    /**
     * return error response.
     *
     * @return \Illuminate\Http\Response
     */

    public function sendError($error, $errorMessages = [], $code = 404)
    {
    	$response = [
            'success' => false,
            'message' => $error,
        ];

        if(!empty($errorMessages)){
            $response['data'] = $errorMessages;
        }

        return response()->json($response, $code);
    }

    public function now(){ //funcion retorna el valor de la fecha y hora actual
        return Carbon::now()->toDateTimeString();
    }

    public function intervalInMinutes($start ,$end){ // retorna el intervalo de tiempo en minutos
        return Carbon::parse($start)->diffInMinutes($end);
    }
}
