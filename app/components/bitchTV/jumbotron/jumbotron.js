angular.module('BitchTV').directive('bitchTvJumbotron', function (DateUtilService) {
    return {
        restrict: 'E',
        templateUrl: 'components/bitchTV/jumbotron/jumbotron.html',
        scope: { title: '@', image: '@'},
        link: function(scope, element, attrs) {
            scope.date = "We are the " + DateUtilService.currentDate() + ". It is " + DateUtilService.currentTime();
        }
    };
});