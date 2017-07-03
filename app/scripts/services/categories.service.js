(function () {
    'use strict';

    angular.module('shoppingcartApp').service('CategoryService', CategoryService);

    CategoryService.$inject = ['$http'];

    function CategoryService($http) {

        return {
            getCategories: getCategories,
            getProducts:getProducts
        }

        function getCategories() {
            return $http.get('json/category.json').then(function(data) {
                return data.data;
            });
        }

        function getProducts() {
            return $http.get('json/products.json').then(function(data) {
                return data.data;
            });
        }        
        
        

    }
})();