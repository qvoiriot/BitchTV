angular.module('BitchTV').directive('bitchTvMenu', function ($location, $timeout) {
    return {
        restrict: 'E',
        templateUrl: 'components/bitchTV/menu/menu.html',
        link: function(scope, element, attrs) {
            scope.isCollapsed = true;
            scope.search = function(keyword) {
                $location.path('/search/' + keyword);
            };

            //sale
            $(".navbar-nav li a").click(function(event) {
                $(".navbar-collapse").collapse('hide');
            });
        }
    };
});
