/**
 * Service qui va interroger l'API d'OpenFoodFacts
 * $http : service qui gère les appels http
 */
app.service('openFoodFactsSvc', ['$http', function($http){

    /**
     * Fonction de recherche sur l'API d'OpenFoodFacts
     * @param input {string} Saisie de l'utilisateur
     * @returns {any} La promesse http
     */
    this.search = function(input){
        return $http({
            method:'GET',
            url:'https://fr.openfoodfacts.org/cgi/search.pl?search_terms='+input+'&search_simple=1&action=process&json=1'
        });
    }

}]);