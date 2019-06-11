app.service('cellarSvc',['$window', function($window){

    /**
     * Charge la liste des produits depuis le localstorage
     * @returns {array} liste des produits
     */
    this.loadProducts = function(){
        let productString = $window.localStorage.getItem('products');

        if(productString === null || productString === undefined){
            return [];
        }else{
            // Converti la chaine de caractère en objet
            return JSON.parse(productString);
        }
    }

    /**
     * Sauvegarde le tableau des produits
     * @param recipestoSave {array} liste des produits
     */
    this.saveProducts = function(productsToSave){
        $window.localStorage.setItem('products',
            JSON.stringify(productsToSave));
    }

}]);