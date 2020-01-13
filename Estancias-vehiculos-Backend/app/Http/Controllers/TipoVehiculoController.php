<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\TipoVehiculo;
use Validator;

class TipoVehiculoController extends BaseController
{

    public function index()
    {
        $tipos = TipoVehiculo::with('vehiculos')->get();
        return $this->sendResponse($tipos, "tipos de vehiculos recuperados exitosamente.");

    }


    public function store(Request $request)
    {
        $data = $request->only('nombre');

        $validator = Validator::make($data, [
            'nombre' => 'required|unique:tipo_vehiculos'
        ]);
        if($validator-> fails()){
            return $this->sendError('Validation Error.', $validator->errors());       

        }

        $tipo = new TipoVehiculo();

        $tipo->nombre = request()->nombre;
        $tipo->save();

        return $this->sendResponse($tipo, "Tipo de vehiculo creado exitosamente.");

    }

}
