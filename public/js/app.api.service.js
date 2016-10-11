angular.module('app').factory('apiDoc', ['$http', function($http) {

    function getDoc(docId) {
        var url = window.location.pathname + 'api/uploads/' + docId;

        return $http.get(url);
    }

    function displayDoc() {

    }

    function deleteDoc(docId) {
        var url = window.location.pathname + 'api/uploads/' + docId;

        return $http.delete(url);
    }

    function getDocHistory() {
        var url = window.location.pathname + 'api/uploads/';

        return $http.get(url);
    }

    function publishDoc(docId, published) {
        var url = window.location.pathname + 'api/uploads/' + docId;
        if (published) {
            url += '/unpublish';

        } else {
            url += '/publish';
        }

        return $http.post(url);
    }

    function uploadDoc(formData) {

        var url = window.location.pathname + 'api/uploads';

        return $http.post(url, formData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
    }

    return {
        getDoc: getDoc,
        displayDoc: displayDoc,
        publishDoc: publishDoc,
        uploadDoc: uploadDoc,
        getDocHistory: getDocHistory,
        deleteDoc: deleteDoc
    }
}]);