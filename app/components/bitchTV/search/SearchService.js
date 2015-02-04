angular.module('BitchTV').factory('SearchService', function (ProgramService, BasicSearchService) {
    return {
        search: function(keywords, callback) {
            ProgramService.getPrograms(function (programs) {
                var results = BasicSearchService.searchFor(keywords, programs);
                callback(results);
            });
        }
    };
});