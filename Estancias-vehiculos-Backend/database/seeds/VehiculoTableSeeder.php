<?php

use Illuminate\Database\Seeder;
use Faker\Factory;

class VehiculoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();

        for($i=1;$i<16;$i++){
            switch ($i) {

            case ($i <= 5): 
                DB::table('vehiculos')->insert([
                'id' => $i,
                'tipo_vehiculo_id'=>1,
                'placa' => $faker->numerify('P'.$i.$i.$i),
                'tiempo_parqueado' => $i*8,
                'created_at' => date('Y-m-d  H:i:s'),
                'updated_at' => date('Y-m-d  H:i:s')
                ]);
            break;
            case ($i > 5 && $i <= 10): 
                DB::table('vehiculos')->insert([
                'id' => $i,
                'tipo_vehiculo_id'=>2,
                'placa' => $faker->numerify('P'.$i.$i.$i),
                'tiempo_parqueado' => $i*8,
                'created_at' => date('Y-m-d  H:i:s'),
                'updated_at' => date('Y-m-d  H:i:s')
                ]);
            break;


            case ($i >= 11): 


                DB::table('vehiculos')->insert([
                'id' => $i,
                'tipo_vehiculo_id'=>3,
                'placa' => $faker->numerify('P'.$i.$i.$i),
                'tiempo_parqueado' => $i*8,
                'created_at' => date('Y-m-d  H:i:s'),
                'updated_at' => date('Y-m-d  H:i:s')
                ]);
            break;
                
            }
        }
    }
}
