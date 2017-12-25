<?php

namespace App\Http\Controllers;

use App\Channel;

class ChannelController extends Controller
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
        return Channel::all();
    }

    public function store()
    {
        return Channel::all();
    }

    public function show()
    {
        return Channel::all();
    }

    public function update()
    {
        return Channel::all();
    }

    public function destroy()
    {
        return Channel::all();
    }
}
