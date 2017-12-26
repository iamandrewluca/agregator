<?php

namespace App\Http\Controllers;


use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthenticationController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth',
            ['only' => ['signOut']]
        );

        $this->middleware('guest',
            ['only' => ['signUp', 'signIn']]
        );
    }

    public function signIn(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        $user = User::where([
            'email' => $request->input('email')
        ])->first();

        if ($user && Hash::check($request->input('password'), $user->password)) {
            $user->api_token = str_random(60);
            $user->save();

            return [
                'status' => 'SUCCESS',
                'api_token' => $user->api_token,
            ];
        } else {
            return [
                'status' => 'FAILURE',
                'message' => 'Username or password wrong.',
            ];
        }

    }

    public function signOut()
    {
        $user = User::find(Auth::guard('api')->id());
        $user->api_token = null;
        $user->save();

        return [
            'status' => 'SUCCESS',
            'message' => 'User signed out.',
        ];
    }

    public function signUp(Request $request)
    {
//        if (User::all()->count()) {
//            return [
//                'status' => 'FAILURE',
//                'message' => 'Only one user allowed to register in system',
//            ];
//        }
//
//        $this->validate($request, [
//            'name' => 'required',
//            'email' => 'required|email|unique:users',
//            'password' => 'required|min:8',
//        ]);
//
//        $user = new User($request->only(['name', 'email']));
//        $user->password = Hash::make($request->input('password'));
//        $user->api_token = str_random(60);
//
//        $user->save();
//
//        return $user;
    }
}
