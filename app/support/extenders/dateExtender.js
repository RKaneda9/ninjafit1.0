(function () {

    Date.fromDateKey = function (dateKey, timeKey, defaultVal) {

        if (!dateKey) { return defaultVal || new Date(); }

        dateKey = dateKey.toString();

        if (dateKey.length < 8) { return defaultVal || new Date(); }

        var year  = parseInt(dateKey.substring(0, 4));
        var month = parseInt(dateKey.substring(4, 6));
        var day   = parseInt(dateKey.substring(6, 8));

        var date = new Date();
        date.setFullYear(year);
        date.setMonth   (month - 1);
        date.setDate    (day);

        if (timeKey && timeKey.length > 3) { 

            var hour = parseInt(timeKey.substring(0, 2));
            var min  = parseInt(timeKey.substring(2, 4));

            date.setHours  (hour);
            date.setMinutes(min);

            if (timeKey.length > 5) {

                var sec = parseInt(timeKey.substring(4, 6));
                date.setSeconds(sec);
            }
        }

        return date;
    };

    Date.fromUTCDateKey = function (dateKey, timeKey, defaultVal) {

        if (!dateKey) { return defaultVal || new Date(); }

        dateKey = dateKey.toString();

        if (dateKey.length < 8) { return defaultVal || new Date(); }

        var year  = parseInt(dateKey.substring(0, 4));
        var month = parseInt(dateKey.substring(4, 6));
        var day   = parseInt(dateKey.substring(6, 8));

        var date = new Date();
        date.setUTCFullYear(year);
        date.setUTCMonth   (month - 1);
        date.setUTCDate    (day);

        if (timeKey && timeKey.length > 3) { 

            var hour = parseInt(timeKey.substring(0, 2));
            var min  = parseInt(timeKey.substring(2, 4));

            date.setUTCHours  (hour);
            date.setUTCMinutes(min);

            if (timeKey.length > 5) {

                var sec = parseInt(timeKey.substring(4, 6));
                date.setUTCSeconds(sec);
            }
        }

        return date;
    };

    Date.fromDateTimeKey = function (dateTimeKey, defaultVal) {
        var dateKey, timeKey;

        if (typeof(dateTimeKey) == 'number') { 

            dateKey = dateTimeKey;
        }

        if (typeof(dateTimeKey) == 'string') {

            dateKey = dateTimeKey.slice(0, 8);
            timeKey = dateTimeKey.slice(8);            
        }

        return Date.fromDateKey(dateKey, timeKey, defaultVal);
    };

    Date.fromUTCDateTimeKey = function (dateTimeKey, defaultVal) {
        var dateKey, timeKey;

        if (typeof(dateTimeKey) == 'number') { 

            dateKey = dateTimeKey;
        }

        if (typeof(dateTimeKey) == 'string') {

            dateKey = dateTimeKey.slice(0, 8);
            timeKey = dateTimeKey.slice(8);            
        }

        return Date.fromUTCDateKey(dateKey, timeKey, defaultVal);
    };

    Date.toTimeKey = function (hour24) {
        return pad(hour24) + ':00';
    };

    // hour24 can be passed in as an integer from 0 - 23 or a timeKey ('0000' - '2359')
    Date.toHour12 = function (hour24, includeAmPm) {

        var hour12, min, ampm = 'am';

        if (typeof(hour24) === 'string') {

            hour12 = Math.floor(parseInt(hour24) / 100);
            min    = pad(hour24 % 100);
        }
        else {

            hour12 = hour24;
            min    = '00';
        }

        if (hour12 >  12) { hour12 -= 12; ampm = 'pm'; }
        if (hour12 == 12) {               ampm = 'pm'; }
        if (hour12 === 0) { hour12  = 12; }

        return hour12 + ':' + min + (includeAmPm ? (' ' + ampm) : '');
    };

    Date.startOfWeek = function () { return (new Date()).toStartOfWeek(); };
    Date  .endOfWeek = function () { return (new Date())  .toEndOfWeek(); };

    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + days);
        return this;
    };

    Date.prototype.clone = function () { return new Date(this); };

    Date.prototype.yesterday = function () {

        var date = this.clone();
        date.setDate(this.getDate() - 1);
        return date;
    };

    Date.prototype.toStartOfWeek = function () {
        this.setDate(this.getDate() - this.getDay());
        return this;
    };

    Date.prototype.toEndOfWeek = function () {
        this.setDate(this.getDate() + (6 - this.getDay()));
        return this;
    };

    Date.prototype.getDateKey = function () {

        var year  = this.getFullYear().toString();
        var month = this.getMonth() + 1;
        var day   = this.getDate();

        return parseInt(year + ("0" + month).slice(-2) + ("0" + day).slice(-2));
    };

    Date.prototype.getTimeKey = function () {

        var hour = this.getHours()  .toString();
        var min  = this.getMinutes().toString();

        if (hour < 10) { hour = '0' + hour; }
        if (min  < 10) { min  = '0' + min;  }

        return hour + ':' + min;
    };

    Date.prototype.getHour12 = function () {

        var hour = this.getHours();

             if (hour >  12) { hour = hour - 12; } // 13 - 23 -> 1pm - 11pm
        else if (hour === 0) { hour = 12;        } // 0 -> 12am

        return hour;
    };

    Date.prototype.getAmPm = function () {

        return this.getHours() < 11 ? 'am' : 'pm';
    };

    Date.prototype.getDayOfWeekText = function () {
        switch (this.getDay()) {
            case  0: return 'Sunday';
            case  1: return 'Monday';
            case  2: return 'Tuesday';
            case  3: return 'Wednesday';
            case  4: return 'Thursday';
            case  5: return 'Friday';
            case  6: return 'Saturday';
        }
    };

    Date.prototype.getDayOfMonthText = function () {

        switch (this.getDate()) {

            case  1: return  '1st';
            case  2: return  '2nd';
            case  3: return  '3rd';
            case  4: return  '4th';
            case  5: return  '5th';
            case  6: return  '6th';
            case  7: return  '7th';
            case  8: return  '8th';
            case  9: return  '9th';
            case 10: return '10th';
            case 11: return '11th';
            case 12: return '12th';
            case 13: return '13th';
            case 14: return '14th';
            case 15: return '15th';
            case 16: return '16th';
            case 17: return '17th';
            case 18: return '18th';
            case 19: return '19th';
            case 20: return '20th';
            case 21: return '21st';
            case 22: return '22nd';
            case 23: return '23rd';
            case 24: return '24th';
            case 25: return '25th';
            case 26: return '26th';
            case 27: return '27th';
            case 28: return '28th';
            case 29: return '29th';
            case 30: return '30th';
            case 31: return '31st';
        }
    };

    Date.prototype.getMonthText = function () {

        switch (this.getMonth()) {
            case  0: return 'January';
            case  1: return 'February';
            case  2: return 'March';
            case  3: return 'April';
            case  4: return 'May';
            case  5: return 'June';
            case  6: return 'July';
            case  7: return 'August';
            case  8: return 'September';
            case  9: return 'October';
            case 10: return 'November';
            case 11: return 'December';
        }
    };

    Date.prototype.format = function (_format) {

        // TODO: default format
        var format = _format ? _format : 'mm/dd/yyyy';
        var pieces = [{ text: format, original: true }];

        // day of week
        if (format.includes('d')) {
            if (format.includes('d*')) { format = replacePieces(pieces, format, 'd*', this.getDayOfWeekText());                 }
            if (format.includes('d3')) { format = replacePieces(pieces, format, 'd3', this.getDayOfWeekText().substring(0, 3)); }
            if (format.includes('dd')) { format = replacePieces(pieces, format, 'dd', this.getDayOfWeekText().substring(0, 2)); }
            if (format.includes('d' )) { format = replacePieces(pieces, format, 'd' , this.getDayOfWeekText().substring(0, 1)); }
        }

        // month
        if (format.includes('M')) {
            if (format.includes('M*')) { format = replacePieces(pieces, format, 'M*', this.getMonthText());                 }
            if (format.includes('M3')) { format = replacePieces(pieces, format, 'M3', this.getMonthText().substring(0, 3)); }
            if (format.includes('MM')) { format = replacePieces(pieces, format, 'MM', pad(this.getMonth() + 1));            }
            if (format.includes('M' )) { format = replacePieces(pieces, format, 'M' ,     this.getMonth() + 1);             }
        }

        // day
        if (format.includes('D')) {
            if (format.includes('D*')) { format = replacePieces(pieces, format, 'D*',     this.getDayOfMonthText()); }
            if (format.includes('DD')) { format = replacePieces(pieces, format, 'DD', pad(this.getDate()));          }
            if (format.includes('D' )) { format = replacePieces(pieces, format, 'D' ,     this.getDate());           }
        }

        // year
        if (format.includes('YY')) {
            if (format.includes('YYYY')) { format = replacePieces(pieces, format, 'YYYY', this.getFullYear());                            }
            if (format.includes('YY'  )) { format = replacePieces(pieces, format, 'YY'  , this.getFullYear().toString().substring(2, 4)); }
        }

        // hour 12
        if (format.includes('h')) {
            if (format.includes('hh')) { format = replacePieces(pieces, format, 'hh', pad(this.getHour12())); }
            if (format.includes('h' )) { format = replacePieces(pieces, format, 'h' ,     this.getHour12());  }
        }

        // hour 24
        if (format.includes('H')) {
            if (format.includes('HH')) { format = replacePieces(pieces, format, 'HH', pad(this.getHours())); }
            if (format.includes('H' )) { format = replacePieces(pieces, format, 'H' ,     this.getHours());  }
        }

        // minute
        if (format.includes('m')) {
            if (format.includes('mm')) { format = replacePieces(pieces, format, 'mm', pad(this.getMinutes())); }
            if (format.includes('m' )) { format = replacePieces(pieces, format, 'm' ,     this.getMinutes());  }
        }
        
        // second
        if (format.includes('s')) {
            if (format.includes('ss')) { format = replacePieces(pieces, format, 'ss', pad(this.getSeconds())); }
            if (format.includes('s' )) { format = replacePieces(pieces, format, 's' ,     this.getSeconds());  }
        }

        // ampm lowercase
        if (format.includes('t')) {
            if (format.includes('tt')) { format = replacePieces(pieces, format, 'tt', this.getAmPm());                 }
            if (format.includes('t' )) { format = replacePieces(pieces, format, 't' , this.getAmPm().substring(0, 1)); }
        }

        // ampm uppercase
        if (format.includes('T')) {
            if (format.includes('tt')) { format = replacePieces(pieces, format, 'TT', this.getAmPm()                .toUpperCase()); }
            if (format.includes('t' )) { format = replacePieces(pieces, format, 'T' , this.getAmPm().substring(0, 1).toUpperCase()); }
        }

        return map(pieces, function (piece) { return piece.text; }).join('');
    };

    function replacePieces (pieces, format, find, replace) {
    
        for (var i = 0; i < pieces.length; i++) {
            
            if (pieces[i].original && pieces[i].text.includes(find)) {
                
                var piece    = pieces[i];
                var subTexts = piece.text.split(find);
                var params   = [i, 1];
                
                for (var j = 0; j < subTexts.length; j++) {

                    // if the text is empty, don't add an empty text back
                    if (subTexts[j])
                    params.push({ original: true,  text: subTexts[j] });

                    // don't add the replacement text if we're on the last sub text
                    if (j < subTexts.length - 1) 
                    params.push({ original: false, text: replace     }); 
                }
                
                pieces.splice.apply(pieces, params);

                i += params.length - 2;
            }
        }
        
        return map(pieces, function (piece) { 

            if (piece.original) { return piece.text; }

        }).join('');
    }

    function pad (val, length) { 
        return ("00000" + val).slice(-1 * (length || 2));
    }

    function map (array, func) {
        var mapped = [], keys;

        if (!array) { return mapped; }

        keys = Object.keys(array);

        for (var i = 0; i < keys.length; i++) {
            var obj = func(array[keys[i]], i);
            if (obj) { mapped.push(obj); }
        }

        return mapped;
    }
}());