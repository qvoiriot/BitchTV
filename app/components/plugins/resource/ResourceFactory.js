angular.module('BitchTV.plugins').factory('ResourceFactory',
    function($resource) {
        return {
            createResource : function(resourceInfo) {
                var idField = resourceInfo.idField;
                var apiUrl = resourceInfo.apiUrl + resourceInfo.route + "/:" + idField;

                var paramFieldInfo = {};
                paramFieldInfo[idField] = '@' + idField;

                var resource = $resource(apiUrl, {}, {
                    update: {method:'PUT', params:paramFieldInfo}
                });

                resource.getFromAvailable = function(availableResources, resourceId) {
                    if(availableResources == null)
                        return null;

                    for(var i=0; i<availableResources.length; i++) {
                        if(availableResources[i] != null && availableResources[i][idField] == resourceId)
                            return availableResources[i];
                    }
                };

                return resource;
            }
        }
    });