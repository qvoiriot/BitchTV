angular.module('BitchTV').factory('ProgramService', function (ProgramsResource, DateUtilService) {
    var cachedPrograms;

    return {
        getForChannel: function(channelId, callback) {
            getPrograms(function (programs) {
                var channelPrograms = [];
                for(var i=0; i<programs.length; i++) {
                    if(channelId == programs[i].channel) {
                        channelPrograms.push(programs[i]);
                    }
                }
                callback(channelPrograms);
            });
        },

        getForDate: function(dateCode, callback) {
            var dateInfo = DateUtilService.getDateInfoForCode(dateCode);
            var currentDate = DateUtilService.currentDate();
            var currentTime = DateUtilService.currentTime();
            var programsForDate = [];

            getPrograms(function (programs) {
                for(var i=0; i<programs.length; i++) {
                    var dateNow = DateUtilService.getDayMonthYearByPrograms(programs[i].start);
                    var timeStart = DateUtilService.getHoursMinutesByPrograms(programs[i].start);
                    var timeStop = DateUtilService.getHoursMinutesByPrograms(programs[i].stop);

                    if(dateCode == 'now' && currentDate == dateNow && timeStart <= currentTime && timeStop >= currentTime) {
                        programsForDate.push(programs[i]);
                    }
                    else if(dateCode == 'tonight' && currentDate == dateNow && timeStart >= dateInfo.startTime) {
                        programsForDate.push(programs[i]);
                    }
                    else if(currentDate == dateNow && timeStart >= dateInfo.startTime && timeStop <= dateInfo.stopTime && timeStart <= dateInfo.stopTime) {
                        programsForDate.push(programs[i]);
                    }
                }
                callback(programsForDate);
            });
        },

        getProgramImgSrc: function(program, channelIcon) {
            if(program.icon)
                return program.icon.src;
            else {
                return channelIcon;
            }
        },

        hasSpecificImage: function(program) {
            return program.icon;
        },

        getPrograms: getPrograms
    };

    function getPrograms(callback) {
        if(!cachedPrograms) {
            ProgramsResource.query(function(programs) {
                cachedPrograms = filterResource(programs);
                callback(cachedPrograms);
            });
        } else
            callback(cachedPrograms);

        function filterResource(programs) {
            var currentDate = DateUtilService.currentDate();
            var currentTime = DateUtilService.currentTime();

            var programsFilteredByDate = [];
            for(var i=0; i<programs.length; i++) {
                var dateNow = DateUtilService.getDayMonthYearByPrograms(programs[i].start);
                var timeStart = DateUtilService.getHoursMinutesByPrograms(programs[i].start);

                if(dateNow >= currentDate && timeStart >= currentTime) {
                    programsFilteredByDate.push(programs[i]);
                }
            }
            return programsFilteredByDate;
        }
    }
});