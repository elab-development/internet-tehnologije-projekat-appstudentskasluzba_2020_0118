<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Post;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->createMany([
            [
                'name' => 'Pera Perić',
                'email' => 'a@a',
                'password' => bcrypt('qwe'),
                'role' => 'admin',
            ],
            [
                'name' => 'Nikola Nikolić',
                'email' => 'p@p',
                'password' => bcrypt('qwe'),
                'role' => 'profesor',
            ],
            [
                'name' => 'Aleksa Aleksić',
                'email' => 's@s',
                'password' => bcrypt('qwe'),
                'role' => 'student',
            ],
        ]);

        Post::factory()->createMany(
            [
                [
                    'title' => 'Upis na master studije',
                    'content' => 'Obaveštavamo studente da je konkurs za upis na master studije otvoren do 30. septembra. Sve informacije o potrebnoj dokumentaciji i uslovima možete naći na sajtu fakulteta.',
                ],
                [
                    'title' => 'Novi kursevi u programu',
                    'content' => 'Fakultet organizacionih nauka uvodi nove kurseve u oblasti digitalnog marketinga i analize podataka koji će studentima pružiti aktuelna znanja iz ovih brzo rastućih oblasti.',
                ],
                [
                    'title' => 'Poziv na letnju praksu',
                    'content' => 'Pozivamo zainteresovane studente da se prijave za letnju praksu u vodećim IT kompanijama. Praksa je prilika za sticanje praktičnih iskustava i uspostavljanje kontakata sa potencijalnim poslodavcima.',
                ],
                [
                    'title' => 'Otvorene prijave za Case Study Competition',
                    'content' => 'Studenti su pozvani da učestvuju u godišnjem takmičenju u rešavanju studije slučaja. Očekuju vas vredne nagrade i prilika za pokazivanje veština rešavanja problema.',
                ],
                [
                    'title' => 'Novi softver u računarskim laboratorijama',
                    'content' => 'Informišemo studente da su računarske laboratorije opremljene najnovijim softverom za programiranje, dizajn i analizu podataka, što će doprineti kvalitetnijem obrazovanju.',
                ],
                [
                    'title' => 'Konferencija o trendovima u organizacionim naukama',
                    'content' => 'Fakultet organizacionih nauka domaćin je međunarodne konferencije koja će okupiti stručnjake iz industrije i akademije da diskutuju o najnovijim trendovima u organizacionim naukama.',
                ],
                [
                    'title' => 'Radionica o liderstvu i menadžmentu',
                    'content' => 'Pozivamo studente da se prijave za interaktivnu radionicu o liderstvu i menadžmentu koju vodi priznati ekspert iz ove oblasti. Radionica je besplatna za sve studente fakulteta.',
                ],
                [
                    'title' => 'Alumni susret diplomaca',
                    'content' => 'Dragi alumni, pozivamo vas na godišnji susret diplomaca Fakulteta organizacionih nauka. Ovo će biti odlična prilika za umrežavanje i deljenje iskustava sa sadašnjim studentima.',
                ]
            ]
        );
    }
}
