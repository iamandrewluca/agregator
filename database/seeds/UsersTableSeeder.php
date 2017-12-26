<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        (new \App\User([
            'name' => 'Administrator',
            'email' => 'admin@agregator.md',
            'password' => Hash::make(env('ADMIN_PASS')),
        ]))->save();
    }
}
