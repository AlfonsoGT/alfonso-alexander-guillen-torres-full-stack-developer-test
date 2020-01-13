<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});



//Auth
//JWT
Route::group (['middleware' => ['jwt.auth'], 'prefix'  => 'v1'], function(){
	
	Route::resource('tipoVehiculos', 'TipoVehiculoController');
	Route::resource('vehiculos', 'VehiculoController');
	Route::post('/vehiculo-oficial', 'VehiculoController@altaOficial');
	Route::post('/vehiculo-residente', 'VehiculoController@altaResidente');
	Route::post('entrada', 'EstanciaVehiculoController@registrarEntrada');
	Route::post('salida', 'EstanciaVehiculoController@registrarSalida');
	Route::get('comenzar', 'EstanciaVehiculoController@comenzarMes');
	Route::get('informe-pagos', 'EstanciaVehiculoController@informePagos');
});

Route::group (['middleware' => [], 'prefix'  => 'v1'], function(){
	Route::post('/auth/login', 'TokensController@login');
	Route::post('/auth/refresh', 'TokensController@refreshToken');
	Route::post('/auth/logout', 'TokensController@logout');
});
