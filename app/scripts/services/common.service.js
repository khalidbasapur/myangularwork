(function () {
    'use strict';

    angular.module('shoppingcartApp').service('CommonService', CommonService);

    CommonService.$inject = ['$http'];

    function CommonService($http) {
        var selectedCategory = {};
        var cartItems = [];
        return {
            setSelectedCategory:setSelectedCategory,
            getSelectedCategory:getSelectedCategory,
            setCartItems:setCartItems,
            getCartItems:getCartItems
        }

        function setSelectedCategory(category) {
            this.selectedCategory = category;   
        }
        
        function getSelectedCategory() {
            return this.selectedCategory;  
        }

        function setCartItems(cartItem) {
            cartItems.push(cartItem);
        }
        
        function getCartItems() {
            return cartItems;
        }

    }
})();