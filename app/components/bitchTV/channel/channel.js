angular.module('BitchTV').directive('bitchTvChannel', function (ChannelsResource, ChannelService, WaitingService) {
    return {
        restrict: 'E',
        templateUrl: 'components/bitchTV/channel/channel.html',
        link: function(scope, element, attrs) {
            var channelId = attrs.channelId;
            WaitingService.start(function() {
                ChannelService.get(channelId, function(channel) {
                    scope.channel = channel;
                    WaitingService.stop();
                });
            });
            scope.getChannelLogoSrc = ChannelService.getChannelLogoSrc;
        }
    };
});