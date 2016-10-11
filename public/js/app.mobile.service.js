angular.module('app').factory('apiMobile', ['$http', function($http) {

    function deleteAccount(docId) {
        var url = window.location.pathname + 'api/mobile-account/' + docId;

        return $http.delete(url);
    }

    function getAccounts() {
        var url = window.location.pathname + 'api/mobile-account/';

        return $http.get(url);
    }

    function addAccount(account) {

        var url = window.location.pathname + 'api/mobile-account';

        return $http.post(url, account);
    }

    return {
        addAccount: addAccount,
        getAccounts: getAccounts,
        deleteAccount: deleteAccount
    }

}]);