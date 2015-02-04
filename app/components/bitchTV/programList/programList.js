angular.module('BitchTV').directive('bitchTvProgramList', function (ChannelService, ProgramService, WaitingService) {
    return {
        restrict: 'E',
        templateUrl: 'components/bitchTV/programList/programList.html',
        link: function(scope, element, attrs) {
            WaitingService.start();
            ProgramService.getForDate(attrs.dateCode, function(programs) {
                scope.programs = programs;
                WaitingService.stop();
            });
            scope.getChannelLogoSrc = ChannelService.getChannelLogoSrc;
            scope.title = getTitle(attrs.dateCode);
        }
    };

    function getTitle(dateCode) {
        switch (dateCode) {
            case 'now':
                return 'Now on TV';
                break;
            case 'morning':
                return 'This morning on TV';
                break;
            case 'afternoon':
                return 'This afternoon on TV';
                break;
            case 'tonight':
                return 'Tonight on TV';
                break;
        }
    }
});