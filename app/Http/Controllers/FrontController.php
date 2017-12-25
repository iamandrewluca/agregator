<?php

namespace App\Http\Controllers;


class FrontController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        //
    }

    public function index()
    {
        return ['front'];
    }
}
