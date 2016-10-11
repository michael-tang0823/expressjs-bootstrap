(function() {

    var app = angular.module('app', ['ui.router', 'ngSanitize', 'angularSpinner']);

    app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/login");
        //
        // Now set up the states
        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: "template/login.html",
                controller: 'LoginController'
            })
            .state('home', {
                url: "/home",
                templateUrl: "template/view-upload.html",
                controller: 'ViewUploadController'
            })
            .state('upload', {
                url: "/upload",
                templateUrl: "template/upload.html",
                controller: 'FileUploadController'
            })
            .state('upload-history', {
                url: "/upload-history",
                templateUrl: "template/upload-history.html",
                controller: 'UploadHistoryController'
            })
            .state('view-upload', {
                url: "/view-upload/:id",
                templateUrl: "template/view-upload.html",
                controller: 'ViewUploadController'
            })
            .state('mobile-account', {
                url: "/mobile-account",
                templateUrl: "template/mobile-account.html",
                controller: 'MobileAccountController'
            });

        $httpProvider.interceptors.push(['$q', '$location', '$rootScope', function($q, $location, $rootScope) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($rootScope.token) {
                        config.headers.Authorization = 'Bearer ' + $rootScope.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);

    })
    .run( ['$rootScope', '$state', '$stateParams', function ($rootScope,   $state,   $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
    }]);

})();
