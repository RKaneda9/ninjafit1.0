app.directive('weeklySchedule', function (warehouseService, utils, constants) {

    var hourBlockHeight = 25;

    var Hour = function (hour24) {

        var self = this;
        self.hour    = hour24;
        self.hourKey = Date.toTimeKey(hour24);
        self.text    = Date.toHour12 (hour24, true);
    };

    var Day = function (dateKey, startTimeKey, endTimeKey, blocks, isToday) {

        var self = this;
        self.dateKey = dateKey;
        self.date    = Date.fromDateKey(dateKey);
        self.title   = self.date.format('d* - M* D*'); // Sunday - May 5th
        self.blocks  = [];
        self.isToday = isToday;

        self.addBlock = function (block) {
            var parent = utils.first(self.blocks, function (dayBlock) { return dayBlock.end >= block.start; });
            if (!parent) {
                var start = self.blocks.length ? utils.max(self.blocks, function (block) { return block.end; }) : startTimeKey;
                parent = new DayBlock(start, block);
                return self.blocks.push(parent);
            }

            parent.addBlockItem(block);
        };

        if (blocks) { blocks.forEach(self.addBlock); }
    };

    var DayBlock = function (startKey, blockItem) {

        var self = this;
        self.start = startKey;
        self.end   = null;
        self.cols  = [];

        self.addBlockItem = function (blockItem) {
            var col = utils.first(self.cols, function (col) {
                return col.end <= blockItem.start;
            });

            if (col) { return col.add(blockItem); }

            self.cols.push(new BlockCol(self, blockItem));
        };

        self.addBlockItem(blockItem);
    };

    var BlockCol = function (parentBlock, blockItem) {

        var self = this;
        self.items = [];
        self.end   = null;
        self.style = {};

        self.add = function (args) {

            var item = new BlockItem(self, parentBlock, args);
            self.items.push(item);
        };

        self.add(blockItem);
    };

    var BlockItem = function (parentCol, parentBlock, blockItem) {

        var self = this;
        self.   id = utils.generateId();
        self.start = blockItem.start;
        self.  end = blockItem.  end;
        self. type = blockItem. type;
        self.title = blockItem.title;
        self.link  = blockItem.link;
        self.range = Date.toHour12(self.start, true) + ' - ' + Date.toHour12(self.end, true);
        self.style = {};

        function getIndex() {
            var i = parentCol.items.length;

            while (--i > -1 && parentCol.items[i].id !== self.id);

            return i;
        }

        function toInt(timeKey) {
            var val = parseInt(timeKey);
            return Math.floor(val / 100) + (val % 100 / 60);
        }

        self.setStyle = function () {

            var         i = getIndex(); if (i === -1 && parentCol.items.length) { i = parentCol.items.length - 1; }
            var  startKey = i > -1 ? parentCol.items[i].end : parentBlock.start;
            var   itemBtm = toInt(self.end);
            var   itemTop = toInt(self.start);
            var parentTop = toInt(startKey);

            self.style.marginTop = (hourBlockHeight * (itemTop - parentTop)) + 'px';
            self.style.height    = (hourBlockHeight * (itemBtm - itemTop))   + 'px';
        };

        if (self.end > parentCol  .end) { parentCol  .end = self.end; }
        if (self.end > parentBlock.end) { parentBlock.end = self.end; }

        self.setStyle();
    };

    return {
        restrict   : 'E',
        replace    : true,
        templateUrl: 'app/calendar/weeklyScheduleDirective.html',
        scope      : { showNav: '=showNav', header: '@' },

        link: function (scope, elem, attrs) {

            var startDate = Date.startOfWeek();
            var   endDate = Date.  endOfWeek();

            scope.hours   = [];
            scope.days    = [];
            scope.loading = false;
            scope.title   = "This Week";

            if (!scope.header) { scope.header = 'Weekly Schedule'; }

            scope.getPrevWeek = function () { changeWeek(-7); };
            scope.getNextWeek = function () { changeWeek( 7); };

            function changeWeek (dayDiff) {

                if (scope.loading) { return; }

                scope.loading = true;

                var _startDate = startDate.clone().addDays(dayDiff);

                warehouseService
                    .getSchedule(_startDate.getDateKey())
                    .then(function (schedule) { if (schedule) { load(schedule); } })
                    .finally(function () { scope.loading = false; });
            }

            function getHours (startTimeKey, endTimeKey) {
                var     hours = [];
                var startHour = parseInt(startTimeKey) / 100;
                var   endHour = parseInt(  endTimeKey) / 100;

                for (var i = startHour; i <= endHour; i++) { hours.push(new Hour(i)); }

                return hours;
            }

            function load (data) {
                var hours, days, startKey, endKey, title = 'N/A', todayKey;

                todayKey = (new Date()).getDateKey();
                startKey = data.start || constants.defaults.weeklySchedule.start;
                  endKey = data.end   || constants.defaults.weeklySchedule.end;
                   hours = getHours(startKey, endKey);
                       days = utils.map(data.days, function (day) { return new Day(day.date, startKey, endKey, day.items, todayKey === day.date); });

                if (days.length) {

                    var startDateKey = days[0]              .dateKey;
                    var   endDateKey = days[days.length - 1].dateKey;

                    startDate = days[0]              .date;
                      endDate = days[days.length - 1].date;

                    title = startDateKey <= todayKey && endDateKey >= todayKey ? 'This Week' : startDate.format('M* D*') + ' - ' + endDate.format('M* D*');
                }

                scope.hours = hours;
                scope.days  = days;
                scope.title = title;
            }

            changeWeek(0);
        }
    };
});
