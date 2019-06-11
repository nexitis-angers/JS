app.controller('recipeDetailCtrl', ['$scope', 'recipeSvc', 'cellarSvc', function($scope, recipeSvc, cellarSvc){
    
    $scope.recipe = undefined;
    $scope.products = undefined;
    $scope.searchResponse = undefined;
    $scope.units = ['u', 'cl', 'ml', 'g', 'kg'];
    $scope.allergens = undefined;
    
    $scope.init = function(){
        $scope.products = cellarSvc.loadProducts();
    }

    /**
     * Abonnement au message de sélection d'une nouvelle recette
     * par l'utilisateur
     */
    $scope.$on('recipeWasSelected', function(event, args){
        $scope.recipe = args.data;
        evalAllergens();
    });

    /**
     * Génère un tableau de valeurs comprises entre la valeur min et max
     */
    $scope.populatePartNumbers = function(min, max)
    {
        let result = [];
        for(var i = Number(min); i <= Number(max); i++){
            if(i%2 == 0){
                result.push(i);
            }
        }

        return result;
    }

    /**
     * Ajoute une nouvelle étape à la liste des étapes de la recette
     */
    $scope.addNewStep = function(newStepDescription)
    {
        if($scope.recipe.steps === undefined 
            || $scope.recipe.steps === null){
            $scope.recipe.steps = [];
        }

        $scope.recipe.steps.push({
            position:$scope.recipe.steps.length + 1,
            description:newStepDescription
        });
    }


    /**
     * Sauvegarde la recette
     */
    $scope.save = function(){
        recipeSvc.updateRecipe($scope.recipe);
    }

    /**
     * Recherche d'une recette
     * @param inputName {string} Nom de la recette recherchée
     */
    $scope.search = function(inputName){
        $scope.searchResult ="Recherche en cours";
        let promise =recipeSvc.searchByName(inputName);
        
        promise.then(function(response){
                // Fonction de callback (rappel) en cas de succès de la recherche
                console.log('succès');
                $scope.searchResult = response;
            },
            function(response){
                // Fonction de callback (rappel) en cas d'erreur de la recherche
                console.log('erreur');
                $scope.searchResult = response;
            }
        )
    }

    /**
     * Ajoute un produit en tant qu'ingrédient
     */
    $scope.addIngredient = function(product)
    {
        if($scope.recipe.ingredients === undefined || $scope.recipe.ingredients === null){
            $scope.recipe.ingredients = [];
        }

        $scope.recipe.ingredients.push({
            product:product,
            qt:1,
            unit:$scope.units[0]
        });
        evalAllergens();
    }

    /**
     * Ajoute un produit en tant qu'ingrédient
     */
    $scope.removeIngredient = function(ingredient)
    {
        let index = $scope.recipe.ingredients.indexOf(ingredient);
        if(index >= 0){
            $scope.recipe.ingredients.splice(index, 1);
            evalAllergens();
        }
    }

    /**
     * Evalue la présence ou non d'allergènes
     */
    let evalAllergens = function(){
        let tempAllergens = [];
        for(let i = 0; i < $scope.recipe.ingredients.length; i++){
            let product = $scope.recipe.ingredients[i].product;
            if(product.allergens.length){
                for(let j = 0; j<product.allergens.length;j++){
                    let allergen = product.allergens[j].trim();
                    if(tempAllergens.indexOf(allergen)== -1){
                        tempAllergens.push(allergen);
                    }
                }
            }
        }

        $scope.allergens = tempAllergens.join(', ');
    }

}]);