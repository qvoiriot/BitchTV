angular.module('BitchTV').directive('bitchTvChannelList', function ($location, ChannelsResource, ChannelService) {
    return {
        restrict: 'E',
        templateUrl: 'components/bitchTV/channelList/channelList.html',
        link: function(scope, element, attrs) {
            scope.channels = ChannelsResource.query();
            scope.getChannelLogoSrc = ChannelService.getChannelLogoSrc;
            scope.redirectToChannel = function(channelId) {
                $location.path('/channel/' + channelId);
            };
        }
    };
});