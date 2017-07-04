(function () {
    'use strict';

/**
 * @ngdoc overview
 * @name shoppingcartApp
 * @description
 * # shoppingcartApp
 *
 * Main module of the application.
 */
angular
  .module('shoppingcartApp', [
    'ngAria',
    'ngRoute',
    'ui.router',
    'treeControl',
    'ui.bootstrap',
    'app.home',
    'app.product'
  ]).config(configBlock)
  .run(runBlock);

  runBlock.$inject = [];

  function runBlock() {
  	console.log("RUN BLOCK");
  }

  configBlock.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function configBlock($stateProvider, $urlRouterProvider, $locationProvider) {
            $locationProvider.hashPrefix('');
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('main', {
                	url: "/",
                    abstract: false,
                    views : {
                    	"nav@main" : {
                    		templateUrl : "views/nav.html",
                    		controller : "NavController",
                    		controllerAs: "vm"
                    	},
                    	"content@main": {
                    		templateUrl : "views/content.html"
                    	},
                    	"footer@main": {
                    		templateUrl : "views/footer.html"
                    	},
                    	"main" : {
                    		templateUrl : "views/main.html",
                    		controller : "MainCtrl"
                    	}

                    }
                })
                .state('main.product', {
                	url: "product",
                	abstract: false,
                    views : {
                    	"content@main" : {
                    		templateUrl : "views/productview.html",
                    		controller : "ProductCtrl",
                    		controllerAs : "vm"
                    	},
                    	"treeview@main.product" : {
                    		templateUrl : "views/treeview.html"
                    	},
                    	"productselectionview@main.product" : {
                    		templateUrl : 'views/productselectionview.html',
                    		contoller : "ProductViewController",
                    		controllerAs : "vm"
                    	}
                    }
                });
     }

})();
