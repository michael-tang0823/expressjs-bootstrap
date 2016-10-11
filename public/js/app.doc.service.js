angular.module('app').factory('docDisplay', ['$http', 'utils', function($http, utils) {


    function displayDoc(doc) {

        var excelData = doc.excelData;


    }

    return {
        displayDoc: displayDoc
    }
}]);