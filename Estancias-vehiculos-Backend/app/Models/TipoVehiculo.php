<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as MongoModel;

class TipoVehiculo extends MongoModel
{
    protected $fillable = [
        'nombre'
    ];

    public function vehiculos()
	{
		return $this->hasMany(\App\Models\Vehiculo::class);
	}
}
