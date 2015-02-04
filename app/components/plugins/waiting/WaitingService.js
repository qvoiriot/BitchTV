angular.module('BitchTV.plugins').factory('WaitingService',
    function (blockUI) {
        return {
            start : function(callback) {
                blockUI.start();
                if(callback) {
                    setTimeout(function () {
                        callback();
                    }, 500);
                }
            },
            stop : function() {
                blockUI.stop();
            }
        }
    }
);