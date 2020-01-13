<?php

namespace App\Http\Controllers;
use App\Models\Vehiculo;
use Validator;
use Illuminate\Http\Request;

class VehiculoController extends BaseController
{
    function __construct()
    {
        $this->middleware('jwt.auth');
    } 

    public function index()
    {
        return Vehiculo::get()->all();
    }

    public function altaOficial(Request $request)
    {
        $data = $request->only('placa');

        $validator = Validator::make($data, [
            'placa' => 'required|unique:vehiculos', //regla de validacion: placa sea unica y requerida
        ]);
        if($validator-> fails()){
            return $this->sendError('Validation Error.', $validator->errors());       

        }
        
        $vehiculo = new Vehiculo();
        $vehiculo->tipo_vehiculo_id = 1; //tipo de vehiculo 1 son Oficiales
        $vehiculo->tiempo_parqueado=0;
        $vehiculo->placa = request()->placa;

        $vehiculo->save();
        return $this->sendResponse($vehiculo, "vehiculo oficial añadido exitosamente.");

    } 

    public function altaResidente(Request $request)
    {
        $data = $request->only('placa');

        $validator = Validator::make($data, [
            'placa' => 'required|unique:vehiculos', //validando que la placa sea unica y requerida
        ]);
        if($validator-> fails()){
            return $this->sendError('Validation Error.', $validator->errors()); // envio de error regla de validacion, estatus 404      

        }
        
        $vehiculo = new Vehiculo();
        $vehiculo->tipo_vehiculo_id = 2; //tipo vehiculo 2 son Residentes
        $vehiculo->tiempo_parqueado=0;
        $vehiculo->placa = request()->placa;

        $vehiculo->save();
        return $this->sendResponse($vehiculo, "Vehiculo Residente añadido exitosamente.");

    }

}
