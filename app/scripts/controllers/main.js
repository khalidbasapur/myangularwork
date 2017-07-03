'use strict';

/**
 * @ngdoc function
 * @name shoppingcartApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shoppingcartApp
 */
angular.module('app.home', [])
  .controller('MainCtrl', function ($scope, $state) {
  	console.log("Main controller");
});


angular.module('app.product', [])
  .controller('ProductCtrl', function ($scope, $state, $uibModal, $timeout, CategoryService, CommonService) {
  	var vm = this;
  	console.log("Product Controller");
  	vm.showSelected = showSelected;
  	vm.products = [];
  	vm.property = "";
    vm.treeOptions = {
    nodeChildren: "children",
    dirSelectable: true,
	    injectClasses: {
	        ul: "a1",
	        li: "a2",
	        liSelected: "a7",
	        iExpanded: "a3",
	        iCollapsed: "a4",
	        iLeaf: "a5",
	        label: "a6",
	        labelSelected: "a8"
	    }
	}
	vm.goToCart = goToCart;

  	function goToCart() {
  		var modalInstance = $uibModal.open({
  			size : "lg",
  			templateUrl : 'views/cart.html',
  			controller : 'CartModalController',
  			controllerAs : "vm"
  		});
  	}

	activate();

	function activate() {
		$timeout(function(){
			var categoriesData = CategoryService.getCategories().then(function(response){
				vm.dataForTheTree = response;
			});

			CategoryService.getProducts().then(function(response){
				vm.products = response;
			});
			
		}, 10);
		
	}
	
	function showSelected(argument) {
		vm.selectedCategory = argument;
		CommonService.setSelectedCategory(argument);

	}
  }).controller('CartModalController', ['$scope','$uibModal', '$uibModalInstance', function($scope, $uibModal, $uibModalInstance){
  	var vm = this;
  	vm.close = close;
  	function close() {
  		$uibModalInstance.close();
  	}
  }]).controller('ProductViewController', ['$scope','$timeout','CategoryService', 'CommonService', function($scope,$timeout,CategoryService,CommonService){
  		var vm = this;
  		vm.products = [];
  		console.log("ProductViewController");
  		activate();

  		function activate() {
	  		$timeout(function(){
				CategoryService.getProducts().then(function(response){
					vm.products = response;
				});
				
			}, 10);
  		}
  }]);	


