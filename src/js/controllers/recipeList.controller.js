app.controller('recipeListCtrl', ['$scope', 'recipeSvc', '$rootScope', function($scope, recipeSvc, $rootScope){

    $scope.recipes = undefined;

    /**
     * Initialisation
     */
    $scope.init = function()
    {
        // Appel au service qui gère le chargement des recettes
        $scope.recipes = recipeSvc.loadRecipes();
    }

    /**
     * Ajoute une recette
     * @param recipeName {string} Nom de la recette à créer
     */
    $scope.addRecipe = function(recipeName){
        
        if(recipeName !== undefined 
            && recipeName !== null 
            && recipeName !== ''){

        // Création d'un objet 'Recette', ajout dans le tableau
        let newRecipe = { name:recipeName };
        $scope.recipes.push(newRecipe);

        // Sauvegarder le tableau dans le localstorage
                recipeSvc.saveRecipes($scope.recipes);
        }
    }

    /**
     * Sélection de la recette
     * @param item {object} Recette sélectionnée par l'utilisateur 
     */
    $scope.selectRecipe = function(item) {
        /* On utilise le root scope (scope commun à tous les contrôleurs)
           pour broadcaster un message (message à destination des enfants du rootscope) 
        */
        $rootScope.$broadcast('recipeWasSelected', { data:item });
    }

    /**
     * Suppression d'une recette
     * @param item {object} Recette à supprimer
     */
    $scope.removeRecipe = function(item){
        // Recherche de la recette à supprimer
        let index = $scope.recipes.indexOf(item);
        if(index >= 0){
            // On retire 1 élement à l'index trouvé
            $scope.recipes.splice(index, 1);

            // Sauvegarder le tableau de recettes
            recipeSvc.saveRecipes($scope.recipes);
        }
    }

}]);