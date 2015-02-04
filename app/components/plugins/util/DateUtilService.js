angular.module('BitchTV.plugins').factory('DateUtilService', function () {
    return {
        currentDate: function() {
            var today   = new Date();
            var year    = today.getFullYear();
            var month   = (today.getMonth())+1;
            var day     = today.getDate();
            var current = (day<10 ? '0':'') + day + "/" + (month<10 ? '0':'') + month + "/" + year;
            return current;
        },

        currentTime: function() {
            var currentTime = new Date();
            var hours = currentTime.getHours();
            var minutes = currentTime.getMinutes();
            var current = (hours<10 ? '0':'') + hours + ':' + (minutes<10 ? '0':'') + minutes;
            return current;
        },
        getDayMonthYearByPrograms: getDayMonthYearByPrograms,
        getHoursMinutesByPrograms: getHoursMinutesByPrograms,

        getDateInfoForCode: function(dateCode) {
            var startTime;
            var stopTime;
            switch (dateCode) {
                case 'morning':
                    startTime = '08:00';
                    stopTime = '12:00';
                    break;

                case 'afternoon':
                    startTime = '12:00';
                    stopTime = '20:00';
                    break;

                case 'tonight':
                    startTime = '20:00';
                    stopTime = '08:00';
                    break;
                    
                case 'today':
                    startTime = '00:00';
                    stopTime = '23:59';
                    break;
            }
            return {
                startTime: startTime,
                stopTime: stopTime
            };
        }
    };

    function getDayMonthYearByPrograms(jsonDate)
    {
        jsonDate = jsonDate.toString();

        var dateYear = jsonDate.substring(0, 4);
        var dateMonth = jsonDate.substring(4,6);
        var dateDay = jsonDate.substring(6,8);

        var dateReturn = dateDay+'/'+dateMonth+'/'+dateYear;
        return dateReturn;
    }

    /*
     * Return a valid hour
     */

    function getHoursMinutesByPrograms(jsonDate)
    {
        jsonDate = jsonDate.toString();

        var dateHour = jsonDate.substring(8,10);
        var dateMinute = jsonDate.substring(10,12);

        var dateReturn = dateHour + ':' + dateMinute;
        return dateReturn;
    }
});