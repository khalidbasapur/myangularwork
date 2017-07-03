(function () {
    'use strict';

    angular.module('shoppingcartApp').service('CommonService', CommonService);

    CommonService.$inject = ['$http'];

    function CommonService($http) {
        var selectedCategory = {};
        return {
            setSelectedCategory:setSelectedCategory,
            getSelectedCategory:getSelectedCategory
        }

        function setSelectedCategory(category) {
            this.selectedCategory = category;   
        }
        
        function getSelectedCategory() {
            return this.selectedCategory;  
        }
        

    }
})();