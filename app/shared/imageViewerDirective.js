app.directive('imageViewer', function () {

    return {
        restrict   : 'E',
        replace    : true,
        templateUrl: 'app/shared/imageViewerDirective.html',
        scope      : { images: '=images', show: '=show', index: '=index' },
        link       : function (scope, elem, attrs) {

            scope.close = function () { scope.show = false; };
            scope.prev  = function () { if (--scope.index <  0) { scope.index = scope.images.length - 1; } };
            scope.next  = function () { if (++scope.index >= scope.images.length) { scope.index = 0;     } };
        }
    };
});