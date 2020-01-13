<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEstanciaVehiculosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('estancia_vehiculos', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('vehiculo_id')->nullable();
            $table->unsignedInteger('user_id')->nullable();
            $table->datetime('entrada')->nullable()->default(null);
            $table->datetime('salida')->nullable()->default(null);
            $table->float('importe')->nullable()->default(null);


            $table->foreign('vehiculo_id')->references('id')->on('vehiculos')
                ->onDelete('restrict')
                ->onUpdate('restrict');
            
            $table->foreign('user_id')->references('id')->on('users');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('estancia_vehiculos');
    }
}
