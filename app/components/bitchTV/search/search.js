angular.module('BitchTV').directive('bitchTvSearch', function (SearchService, ChannelService, WaitingService) {
    return {
        restrict: 'E',
        templateUrl: 'components/bitchTV/search/search.html',
        scope: {'keywords': '@'},
        link: function(scope, element, attrs) {
            WaitingService.start(function() {
                SearchService.search(scope.keywords, function (programs) {
                    scope.programs = programs;
                    WaitingService.stop();
                });
            });

            scope.getChannelLogoSrc = ChannelService.getChannelLogoSrc;
        }
    };
});