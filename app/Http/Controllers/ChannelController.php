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

    public function all()
    {
        return Channel::all();
    }

    public function create()
    {

    }
}
