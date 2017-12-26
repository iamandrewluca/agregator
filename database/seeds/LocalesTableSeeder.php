<?php

use Illuminate\Database\Seeder;

class LocalesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        (new \App\Locale([
            'name' => 'English',
            'code' => 'en',
        ]))->save();

        (new \App\Locale([
            'name' => 'Română',
            'code' => 'ro',
        ]))->save();


        (new \App\Locale([
            'name' => 'Русский',
            'code' => 'ru',
        ]))->save();
    }
}
