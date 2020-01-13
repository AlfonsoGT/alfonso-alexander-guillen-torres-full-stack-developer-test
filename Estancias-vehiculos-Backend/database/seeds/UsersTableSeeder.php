<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        App\Models\User::create([
       'password'=> bcrypt('usuario1234'),
       'email'=>'usuario@hello.com',
       'name'=>'Jhon Doe',
     ]);
    }
}