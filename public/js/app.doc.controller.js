angular.module('app')
    .controller("ViewUploadController",["$scope", "$location", "$state", '$stateParams', 'apiDoc', 'docDisplay', 'cache', 'usSpinnerService',
        function($scope, $location, $state, $stateParams, apiDoc, docDisplay, cache, usSpinnerService){

        $scope.publish = function() {

            apiDoc.publishDoc($scope.docId, $scope.published).then(function(result) {
                $state.reload();

            }, function(err) {
                alert('please contact administrator, reason(' + err.statusText + ')');
            });

        };

        var docId = $stateParams.id ? $stateParams.id : 'latest';

        usSpinnerService.spin('spinner');

        apiDoc.getDoc(docId).then(function(result) {

            $scope.title = result.data.title;
            $scope.published = result.data.published;
            $scope.publishTitle = result.data.published ? 'Unpublish' : 'Publish';
            $scope.docId = result.data._id;

            cache.setDoc(result.data);

            docDisplay.displayDoc(result.data);

            usSpinnerService.stop('spinner');

        }, function(err) {
            usSpinnerService.stop('spinner');

            if (err.status == 404) {
                $scope.title = 'No Data Found';
            } else {
                // alert('please contact administrator, reason(' + err.statusText + ')');
            }

        });

        $("#tabs").tabs();

    }])
    .controller("FileUploadController",["$scope", "$location", "$state", "apiDoc", function($scope, $location, $state, apiDoc){

        $scope.upload = function(){
            var fileName = $('#excel_data_file').val();
            if (!fileName) {
                alert('Please select a file');
                return;
            }


            var formData = new FormData($("#fileUpload")[0]);

            apiDoc.uploadDoc(formData)
                .then(function (returndata) {
                    $state.go("home");

                }, function(err) {
                    alert('please contact administrator, reason(' + err.statusText + ')');
                });
        }
    }])
    .controller("UploadHistoryController",["$scope", "$state", '$stateParams', "$location", "apiDoc", "usSpinnerService",
        function($scope, $state, $stateParams, $location, apiDoc, usSpinnerService){

        $scope.show = function(id) {
            $state.go("view-upload", {id: id});
        };

        $scope.delete = function(id, title) {

            if (!confirm('Are you sure you want to delete this upload? \n' + title)) {
                return;
            }

            apiDoc.deleteDoc(id).then(function(result) {
                $state.reload();
            }, function (err) {
                alert('please contact administrator, reason(' + err.statusText + ')');
            });

        };

        usSpinnerService.spin('spinner');

        apiDoc.getDocHistory().then(function(result) {
            usSpinnerService.stop('spinner');

            $scope.rows = result.data.rows;

        }, function(err) {
            usSpinnerService.stop('spinner');

            alert('please contact administrator, reason(' + err.statusText + ')');
        });

    }]);
