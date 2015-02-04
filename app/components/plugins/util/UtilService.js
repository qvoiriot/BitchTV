angular.module('BitchTV.plugins').factory('UtilService', function () {
    return {
        isInt: function (value) {
            return !isNaN(value) &&
                parseInt(Number(value)) == value &&
                !isNaN(parseInt(value, 10));
        }
    };
});