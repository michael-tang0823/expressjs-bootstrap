angular.module('app').factory('apiAuth', ['$http', function($http) {

    function login(email, password) {
        var url = window.location.pathname + 'api/auth/login';

        return $http.post(url, {'email': email, 'password': password});
    }

    return {
        login: login
    }
}]);