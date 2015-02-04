angular.module('BitchTV').directive('bitchTvFooter', function (DateUtilService, $interval) {
    return {
        restrict: 'E',
        templateUrl: 'components/bitchTV/footer/footer.html',
        link: function(scope, element, attrs) {
            scope.todayDate = DateUtilService.currentDate();
            scope.time = DateUtilService.currentTime();
            
            $interval(function() {
                scope.todayDate = DateUtilService.currentDate();
                scope.time = DateUtilService.currentTime();
            }, 1000);
        }
    };
});