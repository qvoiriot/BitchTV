angular.module('BitchTV', [
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'blockUI',
    'BitchTV.plugins',
    'BitchTV.filters'
])
    .config(function($routeProvider) {
        $routeProvider.when('/channels', {templateUrl: 'views/channels.html'});
        $routeProvider.when('/programs/:dateCode', {templateUrl: 'views/programs.html', controller: 'DefaultController'});
        $routeProvider.when('/channel/:channelId', {templateUrl: 'views/channel.html', controller: 'DefaultController'});
        $routeProvider.when('/search/:keywords', {templateUrl: 'views/search.html', controller: 'DefaultController'});
        $routeProvider.otherwise({redirectTo: '/channels'});
    })
    .constant('Constants', {
        logosPath: "assets/img/logos/"
    });

angular.module('BitchTV.plugins', []);
angular.module('BitchTV.filters', []);

angular.module('BitchTV').controller('DefaultController',
    function ($scope, $routeParams) {
        $scope.$routeParams = $routeParams;
    }

);
