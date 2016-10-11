angular.module('app')

  .factory('cache', [ function() {

    var doc;

    function getDoc() {

      return doc;
    }

    function setDoc(latestDoc) {
      doc = latestDoc;
    }

    return {
      getDoc: getDoc,
      setDoc: setDoc
    }
  }]);
