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
$router->get('/api', function () use ($router) {
//    $feed = new SimplePie();
//    $feed->set_feed_url("http://agora.md/rss/news");
//    $feed->set_cache_location('../.cache');
//    $feed->init();
//    return $feed->get_items(0, 0)[0]->get_categories();
    return 'api';
});


// Catch all routes
$router->get('/admin/{url:.+}', function () use ($router) {
    return file_get_contents('../public/admin/index.html');
});

$router->get('/{url:.+}', function () use ($router) {
    return file_get_contents('../public/index.html');
});
