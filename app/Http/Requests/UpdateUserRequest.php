<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->role === 'admin';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'role' => [
                'required',
                'string',
                'max:55',
                Rule::in(['student', 'profesor', 'admin']),
            ],
            "name" => "required|string|max:55",
            "email" => "required|email|unique:users,email," . $this->id,
            "password" => [
                "confirmed",
                Password::min(3)
                    ->letters()
                // ->symbols()
                // ->numbers()
            ]
        ];
    }
}
