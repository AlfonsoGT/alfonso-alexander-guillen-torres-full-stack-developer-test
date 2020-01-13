<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as MongoModel;

class EstanciaVehiculo extends MongoModel
{
    protected $fillable = [
        'vehiculo_id',
        'user_id',
        'entrada',
        'salida',
        'importe'
	];

	public function vehiculos()
	{
		return $this->belongsTo(\App\Models\Vehiculo::class, 'vehiculo_id');
    }
    
    public function usuario()
	{
		return $this->belongsTo(\App\Models\User::class, 'user_id');
	}
}
