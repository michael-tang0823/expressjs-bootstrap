angular.module('app')
    .controller("LoginController",["$scope", "$state", '$stateParams', "$location", "apiAuth", '$rootScope',
        function($scope, $state, $stateParams, $location, apiAuth, $rootScope){

        $scope.login = function() {

            apiAuth.login($scope.email, $scope.password)
                .success(function(result) {
                    $rootScope.token = result.token;
                    $state.go('home');
                })
                .error(function(err) {
                    alert(err);
                });

        };


    }]);