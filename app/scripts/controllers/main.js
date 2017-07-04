'use strict';

/**
 * @ngdoc function
 * @name shoppingcartApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shoppingcartApp
 */
angular.module('app.home', [])
  .controller('MainCtrl', function ($rootScope, $scope, $state, CommonService) {
  	$rootScope.cartItems = [];
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

  	function goToCart(product) {
  		var modalInstance = $uibModal.open({
  			size : "lg",
  			templateUrl : 'views/cart.html',
  			controller : 'CartModalController',
  			controllerAs : "vm",
  			resolve : {
  				productData : function () {
  					return product;
  				}
  			}
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
  }).controller('CartModalController', ['$rootScope', '$scope','$uibModal', '$uibModalInstance', 'productData', 'CommonService', function($rootScope, $scope, $uibModal, $uibModalInstance, productData, CommonService){
  	var vm = this;
  	vm.close = close;
  	vm.onAddToCart = onAddToCart;
  	vm.selectedProduct = angular.copy(productData);
  	function close() {
  		$uibModalInstance.close();
  	}
  	function onAddToCart() {
  		//CommonService.setCartItems(vm.selectedProduct);
  		//console.log(CommonService.getCartItems());
  		$rootScope.cartItems.push(vm.selectedProduct);
  		if(typeof(Sorage) !== undefined) {
  			localStorage.setItem("cartItems", CommonService.getCartItems());
  		}
  		$uibModalInstance.close();
  	}
  }]).controller('ProductViewController', ['$scope','$timeout','CategoryService', 'CommonService', function($scope,$timeout,CategoryService,CommonService){
  		var vm = this;
  		
  }]).controller('NavController', ['$rootScope','$scope', '$uibModal', 'CommonService', function($rootScope, $scope, $uibModal, CommonService) {
  		var vm = this;
		vm.showCartDetails = showCartDetails;

		function showCartDetails() {
			console.log($rootScope.cartItems);
			var modalInstance = $uibModal.open({
	  			size : "lg",
	  			templateUrl : 'views/cartdetails.html',
	  			controller : 'CartDetailsModalController',
	  			controllerAs : "vm"
  			});
		}  		
  }]).controller('CartDetailsModalController', ['$rootScope', '$scope','$uibModal', '$uibModalInstance', 'CommonService', function($rootScope, $scope, $uibModal, $uibModalInstance, CommonService){
  		var vm = this;
  		vm.Total = 0;
  		vm.close = close;
  		vm.getCartTotal = getCartTotal;
  		vm.cartItems = angular.copy($rootScope.cartItems);
  		angular.forEach(vm.cartItems, function(value, key){
  			value.quantity = 1;
  		});
  		function close() {
  			$uibModalInstance.close();
  		}
  		function getCartTotal() {
  			var total = 0;
  			angular.forEach(vm.cartItems, function(value, key){
  				total += value.price * value.quantity;
  			});
  			return total;
  		}
  }]);	


