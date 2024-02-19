<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(50)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Pera Perić',
        //     'email' => 'a@a',
        //     'password' => bcrypt('qwe'),
        //     'role' => 'admin',
        // ]);

        $this->call(PostsTableSeeder::class);
    }
}
