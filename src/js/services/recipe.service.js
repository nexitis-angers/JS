app.service('recipeSvc',['$window', '$q', function($window, $q){

    /**
     * Charge la liste des recettes depuis le localstorage
     * @returns {array} liste des recettes
     */
    this.loadRecipes = function(){
        let recipesString = $window.localStorage.getItem('recipes');

        if(recipesString === null || recipesString === undefined){
            return [];
        }else{
            // Converti la chaine de caractère en objet
            return JSON.parse(recipesString);
        }
    }

    /**
     * Sauvegarde le tableau de recettes
     * @param recipestoSave {array} liste des recettes
     */
    this.saveRecipes = function(recipestoSave){
        $window.localStorage.setItem('recipes',
            JSON.stringify(recipestoSave));
    }

    /**
     * Met à jour une recette dans le tableau de recettes
     */
    this.updateRecipe = function(recipeToUpdate){

        let recipes = this.loadRecipes();
        
        // Recherche de la recette
        for(let i = 0; i < recipes.length; i++){
            if(recipes[i].name === recipeToUpdate.name){
                // Remplacement de la recette dans le tableau à la même position
                recipes.splice(i, 1, recipeToUpdate);
                this.saveRecipes(recipes);
                break;
            }
        }
    }

    /**
     * Recherche une recette de par son nom
     * @param recipeName {string} Nom de la recette
     * @return {any} Promesse
     */
    this.searchByName = function(recipeName){
        let deferred = $q.defer(); // Instanciation de la promesse
        let foundRecipe = undefined; 
        let recipes = this.loadRecipes(); // Chargement de recettes

        // Le setTimeout, permet de bloquer le thread courant pendant x ms
        // ici, on simule un traitement long
        setTimeout(function(){            
            // Recherche de la recette
            for(let i = 0; i < recipes.length; i++){
                if(recipes[i].name === recipeName){
                    foundRecipe = recipes[i];
                    break;
                }
            }

            // Traitement du résultat de la recherche
            if(foundRecipe !== undefined){
                // On déclenche ici le succès de la promesse
                deferred.resolve({data: foundRecipe, msg:'OK'});
            }
            else{
                // on déclenche le message d'erreur de la promesse
                deferred.reject({data: null, msg:'KO'});
            }

        },5000);
        

        return deferred.promise;
    }

}]);