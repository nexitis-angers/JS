/**
 * Ici, on configurera le routage
 */

 app.config(['$routeProvider',
    function($routeProvider){

        // configuration des routes
        $routeProvider
            .when('/recipes', {
                templateUrl:'partials/recipes.html'
            })
            .when('/cellar', {
                templateUrl:'partials/cellar.html'
            })
            .otherwise({
                redirectTo:'/recipes'
            })

    }]);