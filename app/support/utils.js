app.constant('utils', {

    generateId: function () { return Math.random().toString(36).substring(2); },

    pad: function (val, length) {
        return ("00000" + val).slice(-1 * length);
    },

    max: function (array, func, defaultVal) {
        var max = defaultVal || -Infinity;

        if (!array) { return max; }

        if (!func || typeof(func) !== 'function') {
            func = function (item) { return item; };
        }

        var keys = Object.keys(array);

        for (var i = 0; i < keys.length; i++) {
            var result = func(array[keys[i]], i);

            if (result > max) { max = result; }
        }

        return max;
    },

    min: function (array, func, defaultVal) {
        var min = defaultVal || Infinity;

        if (!array) { return min; }

        if (!func || typeof(func) !== 'function') {
            func = function (item) { return item; };
        }

        var keys = Object.keys(array);

        for (var i = 0; i < keys.length; i++) {
            var result = func(array[keys[i]], i);

            if (result < min) { min = result; }
        }

        return min;
    },

    first: function (array, func, defVal) {

        if (!(array instanceof Array)) { return defVal; }

        var keys = Object.keys(array);

        for (var i = 0; i < keys.length; i++) {
            if (func(array[keys[i]], i)) {
                return array[keys[i]];
            }
        }

        return defVal;
    },

    map: function (array, func) {

        var mapped = [];

        if (!(array instanceof Array)) { return mapped; }

        var keys = Object.keys(array);

        for (var i = 0; i < keys.length; i++) {
            var obj = func(array[keys[i]], i);
            if (obj) { mapped.push(obj); }
        }

        return mapped;
    },

    mapObject: function (obj, func) {

        var mapped = {};

        if (!(obj instanceof Object)) { return mapped; }

        var keys = Object.keys(obj);

        for (var i = 0; i < keys.length; i++) {
            if (func(mapped, obj[keys[i]], keys[i], i) === false) {
                break;
            }
        }

        return mapped;
    },

    foreach: function (array, callback) {

        if (!array) { return; }

        var keys = Object.keys(array);

        for (var i = 0; i < keys.length; i++) {
            if (callback(array[keys[i]], i) === false) {
                return i;
            }
        }
    },

    getStylesStr: function (styles) {

        var str = '';

        if (!styles) { return str; }

        for (var i in styles) {
            str += i + ':' + styles[i] + ';';
        }
    },

    getQueryObj: function () {

        var index  = window.location.hash.indexOf("?");
        var search = window.location.hash.substring(index+1);

        var pieces = search.split('&');
        var obj    = {};

        for (var i = 0; i < pieces.length; i++) {

            var sub = pieces[i].split('=');

            var key =  sub[0]        .toLowerCase();
            var val = (sub[1] || ' ').toLowerCase();

            obj[key] = val;
        }

        return obj;
    },

    clearCookie: function (cookieName) {
        this.setCookie(cookieName, "", new Date());
    },

    setCookie: function (cookieName, cookieValue, expires, path) {

        if (!cookieValue) {
            cookieValue = "";
        }

        if (!expires) {
            expires = new Date();
            expires.setDate(expires.getDate() + 1);
        }

        if (!path) {
            path = "/";
        }

        document.cookie = cookieName + "=" + cookieValue + ";expires=" + (new Date(expires)).toGMTString()+ "; path=" + path;
    },

    getCookie: function (name) {

        var cookie = document.cookie.toString();

        if (cookie.indexOf(name) == -1) { return false; }

        var s = cookie.indexOf(name + "=");
        var e = cookie.indexOf(";", s);

        s += name.length + 1;

        if (e == -1) { e = cookie.length; }

        return cookie.substring(s, e);
    }
});
