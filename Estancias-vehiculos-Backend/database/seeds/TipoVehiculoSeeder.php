<?php

use Illuminate\Database\Seeder;
use App\Models\TipoVehiculo;
class TipoVehiculoSeeder extends Seeder
{

    public function run()
    {
        TipoVehiculo::create( [
            'id'=>1,
            'nombre'=>'Oficial'
            ] );
    
            
        TipoVehiculo::create( [
            'id'=>2,
            'nombre'=>'Residente'
            ] );

        TipoVehiculo::create( [
            'id'=>3,
            'nombre'=>'No Residente'
            ] );
    }
}
