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

$router->group(['prefix' => 'auth'], function () use ($router) {
    $router->post('/signin', 'AuthenticationController@signIn');
    $router->post('/signout', 'AuthenticationController@signOut');
    $router->post('/signup', 'AuthenticationController@signUp');
});


$router->group(['prefix' => 'api'], function () use ($router) {

    $router->get('/channels', 'ChannelController@index');
    $router->post('/channels', 'ChannelController@store');
    $router->put('/channels/{id}', 'ChannelController@update');
    $router->delete('/channels/{id}', 'ChannelController@desotry');

    // Catch all routes
    $router->get('/{url:.*}', function () { return ["Aggregator API"]; });
    $router->get('/', function () use ($router) { return $router->getRoutes(); });
});


// Catch all routes
$router->get('/admin/{url:.*}', function () {
    return file_get_contents('../public/admin/index.html');
});
$router->get('/{url:.*}', function () {
    return file_get_contents('../public/main/index.html');
});
