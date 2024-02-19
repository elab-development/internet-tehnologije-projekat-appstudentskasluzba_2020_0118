<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Post;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(50)->create();

        User::factory()->create([
            'name' => 'Pera Perić',
            'email' => 'a@a',
            'password' => bcrypt('qwe'),
            'role' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'Nikola Nikolić',
            'email' => 'p@p',
            'password' => bcrypt('qwe'),
            'role' => 'profesor',
        ]);

        User::factory()->create([
            'name' => 'Aleksa Aleksić',
            'email' => 's@s',
            'password' => bcrypt('qwe'),
            'role' => 'student',
        ]);

        $this->call(PostsTableSeeder::class);
    }
}
