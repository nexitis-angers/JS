app.controller('cellarCtrl', ['$scope', 'openFoodFactsSvc', 'cellarSvc', function($scope, openFoodFactsSvc, cellarSvc){

    $scope.searchResult = undefined;
    $scope.cellar = undefined;

    /**
     * Initialise le cellier
     */
    $scope.init = function() {
        $scope.cellar = cellarSvc.loadProducts();
    }

    /**
     * Lance une recherche sur OpenFoodFacts
     * @param searchInput {string} Saisie de l'utilisateur
     */
    $scope.searchProduct = function(searchInput){
        let searchPromise = openFoodFactsSvc.search(searchInput);

        searchPromise.then(function(result){
            // Succès
            $scope.searchResult = [];

            // On parcours l'ensemble des produits retournés par l'api
            for(let i = 0; i < result.data.products.length; i++){
                let product = result.data.products[i];
                $scope.searchResult.push({
                    name:product.product_name_fr,
                    allergens:product.allergens.split(','),
                    img:product.selected_images.front.display.fr
                });
            }

        }, function(result){
            // Error
        });           
    }

    /**
     * Ajoute un produit au cellier
     */
    $scope.add = function(product){
        $scope.cellar.push(product);
        cellarSvc.saveProducts($scope.cellar);
    }

    /**
     * Retire un produit du celler
     */
    $scope.remove = function(product)
    {
        let index = $scope.cellar.indexOf(product);
        $scope.cellar.splice(index, 1);
        cellarSvc.saveProducts($scope.cellar);
    }

    /**
     * Ajoute un produit inconnu au cellier
     */
    $scope.addUnknownProduct = function(name)
    {
        $scope.add(
            {
                name:name,
                allergens:[],
                img:'http://localhost/cookbook/src/assets/img/no-image.png'
            }
        );
    }

}]);