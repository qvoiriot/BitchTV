angular.module('BitchTV').factory('ProgramsResource',
    function(ResourceFactory, Config) {
        var resourcesInfo = {
            route : "/programs.json",
            idField : 'id',
            apiUrl : 'api'
        };
        return ResourceFactory.createResource(resourcesInfo);
    });