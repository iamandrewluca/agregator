<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

/** @var \Laravel\Lumen\Routing\Router $router */

$router->group(['prefix' => 'api'], function () use ($router) {

    // Admin routes
    $router->group(['prefix' => 'admin'], function () use ($router) {
        // Auth routes
        $router->post('/signin', 'AuthenticationController@signIn');
        $router->post('/signout', 'AuthenticationController@signOut');
//        $router->post('/signup', 'AuthenticationController@signUp');

        // Resources routes
        $router->get('/channels', 'ChannelController@index');
        $router->post('/channels', 'ChannelController@store');
        $router->put('/channels/{id}', 'ChannelController@update');
        $router->delete('/channels/{id}', 'ChannelController@desotry');
    });

    // Front routes
    $router->group(['prefix' => 'front'], function () use ($router) {
        $router->get('/', 'FrontController@index');
    });

    // Catch all routes
    $router->get('/{url:.*}', function () { return ["Aggregator API"]; });
    $router->get('/', function () use ($router) { return ["Aggregator API"]; });
});


// Catch all routes
$router->get('/admin{url:.*}', function () {
    return file_get_contents('../public/a/index.html');
});
$router->get('/{url:.*}', function () {
    return file_get_contents('../public/m/index.html');
});
