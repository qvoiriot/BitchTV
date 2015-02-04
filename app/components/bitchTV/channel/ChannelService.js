angular.module('BitchTV').factory('ChannelService', function (ProgramService, ChannelsResource, UtilService, Constants) {
    var channels = ChannelsResource.query();

    return {
        getChannelLogoSrc: function(channel) {
            //if int => channelId
            if(UtilService.isInt(channel)) {
                channel = getSync(channel);
            }
            if(channel && channel.icon) {
                var split = channel.icon.src.split('/');
                var logoImageName = split[split.length - 1];
                return Constants.logosPath + logoImageName;
            }
        },

        get: function(channelId, callback) {
            ChannelsResource.get({id: channelId}, function (channel) {
                ProgramService.getForChannel(channelId, function (programs) {
                    channel.programs = programs;
                    callback(channel);
                });
            });
        },
        getSync: getSync
    };

    function getSync(channelId) {
        for(var i=0; i<channels.length; i++) {
            if(channels[i].id == channelId) {
                return channels[i];
            }
        }
    }
});