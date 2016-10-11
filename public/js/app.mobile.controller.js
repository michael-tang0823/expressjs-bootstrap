angular.module('app')
    .controller("MobileAccountController",["$scope", "$state", '$stateParams', "$location", "apiMobile", function($scope, $state, $stateParams, $location, apiMobile){

        $scope.addAccount = function(emails) {
            if (!emails) {
                alert('Please add Email Id');
                return;
            }

            var emails = emails.split('\n');
            var requestData = {emails: emails};

            apiMobile.addAccount(requestData).then(function(result) {
                $state.reload();

            }, function(err) {
                if (err.status == 409) {
                    alert('Email Id already exists (' + $scope.email + ')');
                } else {
                    alert('please contact administrator, reason(' + err.statusText + ')');
                }
            });
        };

        $scope.deleteAccount = function(id) {
            var requestData = {email: $scope.email};

            apiMobile.deleteAccount(id).then(function(result) {
                $state.reload();

            }, function(err) {
                alert('please contact administrator, reason(' + err.statusText + ')');
            });
        };

        apiMobile.getAccounts().then(function(result) {
            $scope.accounts = result.data.rows;
        }, function(err) {
            alert('please contact administrator, reason(' + err.statusText + ')');

        });

    }]);