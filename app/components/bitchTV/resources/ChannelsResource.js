angular.module('BitchTV').factory('ChannelsResource',
    function(ResourceFactory, Config) {
        var resourcesInfo = {
            route : "/channels.json",
            idField : 'id',
            apiUrl : 'api'
        };
        var ChannelsResource =  ResourceFactory.createResource(resourcesInfo);

        ChannelsResource.get = function(options, callback) {
            ChannelsResource.query(function (channels) {
                for(var i=0; i<channels.length; i++) {
                    if(channels[i].id == options.id) {
                        callback(channels[i]);
                    }
                }
            });
        };

        return ChannelsResource;
    });