<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as MongoModel;

class Vehiculo extends MongoModel
{
    protected $fillable = [
        'placa','tipo_vehiculo_id'
    ];

    public function tipo_vehiculo()
	{
		return $this->belongsTo(\App\Models\TipoVehiculo::class, 'tipo_vehiculo_id');
    }
    
    public function estancia_vehiculo()
	{
		return $this->hasMany(\App\Models\EstanciaVehiculo::class, 'estancia_vehiculo_id');
	}
}
