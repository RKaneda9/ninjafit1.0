app.directive('contentLoader', function () {

    return {
        restrict   : 'E',
        replace    : true,
        scope      : { visible: '=visible' },
        templateUrl: 'app/shared/loaders/content.html'
    };
});

app.directive('loader', function () {

    return {
        restrict   : 'E',
        replace    : true,
        scope      : { visible: '=visible' },
        templateUrl: 'app/shared/loaders/default.html'
    };
});