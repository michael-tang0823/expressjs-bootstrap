angular.module('app')

  .factory('utils', [function() {

    function formatAsPercent(value) {
      if (typeof value == 'number') {
          return Math.round(value * 100) + '%';
      } else {
          return value;
      }
    }

    function round(value) {
      if (typeof value == 'number') {
          return Math.round(value);
      } else {
          return value;
      }
    }

    function toFixed(value, decimalCount) {
      if (decimalCount == undefined) decimalCount = 1;

      if (typeof value == 'number') {
        return value.toFixed(decimalCount);
      } else {
        return value;
      }
    }

    return {
      formatAsPercent: formatAsPercent,
      round: round,
      toFixed: toFixed
    }
  }]);
