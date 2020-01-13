<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController; 
use App\Models\EstanciaVehiculo;
use App\Models\Vehiculo;
use Validator;

class EstanciaVehiculoController extends BaseController
{
    function __construct()
    {
        $this->middleware('jwt.auth');
    } 

    public function registrarEntrada(Request $request)
    {
        $data = $request->only('placa');
        //validando que se ingrese la placa del carro
        $validator = Validator::make($data, [//regla de validacion
            'placa' => 'required'
        ]);

        if($validator-> fails()){ // validacion por si no se introduce ninguna placa, status 404
            return $this->sendError('Validation Error.', $validator->errors());       
        }
        
        $vehiculo = Vehiculo::where('placa', $request->placa)->first(); //Obteniendo el vehiculo con la placa ingresada
        if(!blank($vehiculo)){ //Se crea la instancia con la hora actual , si existe el vehiculo
            $estanciaVehiculo = new EstanciaVehiculo();
            $estanciaVehiculo->vehiculo_id = $vehiculo->id;
            $estanciaVehiculo->user_id = auth()->user()->id;// ingresando el id del usuario que realizo la entrada
            $estanciaVehiculo->entrada = $this->now(); //asignando la fecha y hora de ingreso
            $estanciaVehiculo->save();

            return $this->sendResponse($estanciaVehiculo, "Entrada de vehiculo registrada exitosamente.");

        }
        return $this->sendError('Validation Error.', ["vehiculo no encontrado"]);       

    }

    public function registrarSalida(Request $request)
    {
        $data = $request->only('placa');
        
        $validator = Validator::make($data, [ //regla de validacion
            'placa' => 'required'
        ]);
        if($validator-> fails()){// validacion por si no se introduce ninguna placa, status 404
            return $this->sendError('Validation Error.', $validator->errors());       

        }
        
        $vehiculo = Vehiculo::where('placa', $request->placa)->first();
        if(!blank($vehiculo)){ //si existe vehiculo
            $estanciaVehiculo = EstanciaVehiculo::where('vehiculo_id', $vehiculo->id)->get()->last();
            if(!blank($estanciaVehiculo)){ //si hay estancia de entrada vehiculo registrada

            $estanciaVehiculo->vehiculo_id = $vehiculo->id;
            $estanciaVehiculo->salida = $this->now(); //asignando la fecha y hora de salida
            switch ($vehiculo->tipo_vehiculo_id) {
                case 1: // vehiculo oficial
                    $estanciaVehiculo->importe = 0;// no pagan al salir 
                    // se notifica la hora de entrada y salida
                    $mensaje = "el vehiculo ingreso: ".$estanciaVehiculo->entrada." y salio a las ". $estanciaVehiculo->salida; 
                    break;
                case 2: // vehiculo residente
                    $estancias = EstanciaVehiculo::where('vehiculo_id', $vehiculo->id)->get();
                    // se acumula el tiempo
                    $vehiculo->tiempo_parqueado +=  $this->intervalInMinutes($estanciaVehiculo->entrada, $estanciaVehiculo->salida);
                    $vehiculo->update();
                    $estanciaVehiculo->importe = $vehiculo->tiempo_parqueado*0.05; //calculo de importe solo para mostrarlo
                    //se notifica el tiempo que tiene acumulado y el monto
                    $mensaje = "Tiempo acumulados: ".$vehiculo->tiempo_parqueado." min -> $".$estanciaVehiculo->importe;
                    break;
                default: // Vehiculo No Residente
                    // se calcula el monto a pagar
                    $estanciaVehiculo->importe = ($this->intervalInMinutes($estanciaVehiculo->entrada, $estanciaVehiculo->salida))*0.5;
                    //se notifica la cantidad a pagar
                    $mensaje = "El monto a pagar es de: $".$estanciaVehiculo->importe." gracias feliz viaje";
            }

            $estanciaVehiculo->save();

            return $this->sendResponse($estanciaVehiculo, $mensaje);
            }

        }
        return $this->sendError('Validation Error.', ["vehiculo no encontrado"]);       

    }

    public function comenzarMes()
    {
        //obteniendo los vehiculos oficiales
        $estanciasVehiculosOficiales = EstanciaVehiculo::with('vehiculos')->get()->where('vehiculos.tipo_vehiculo_id',1);

        foreach($estanciasVehiculosOficiales as $estancia){
            $estancia->delete(); //eliminando estancias de vehiculos oficiales
        }
        //obteniendo los vehiculos residentes que tienen tiempo estacionado mayor que cero
        $vehiculosRes = Vehiculo::where('tipo_vehiculo_id',2)->where('tiempo_parqueado','>',0)->get();

        foreach($vehiculosRes as $vehiculo){
            $vehiculo->tiempo_parqueado=0; // poniendo a cero el tiempo acumulado de vehiculos residentes
            $vehiculo->update(); 
        }
        return $this->sendResponse("Mes iniciado", ["estancias de vehiculos oficiales borrados y  estancias de vehiculos residenciales puestos en cero exitosamente"]);
    
    }

    public function informePagos()
    {
        $vehiculos = Vehiculo::Where('tipo_vehiculo_id',2)->get(); // Obteniendo vehiculos residentes de la BD 
        if(!blank($vehiculos)){ // si hay vehiculos residentes
            $data = null;

            foreach($vehiculos as $vehiculo){
                $data[]= ['placa' =>$vehiculo->placa,
                        'tiempo_parqueado' =>$vehiculo->tiempo_parqueado,
                        'pago' =>round(($vehiculo->tiempo_parqueado*0.05),3)]; // calculo del pago para residentes

            }
            return $this->sendResponse($data, ["Informe de pagos de Residentes"]);
     
            }
        return $this->sendError('Validation Error.', ["No hay vehiculos residentes registrados"]);       
    
        }
    }
    



