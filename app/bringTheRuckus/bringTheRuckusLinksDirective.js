app.directive('bringTheRuckusLinks', function ($sce, constants) {
    return {
      restrict   : 'E',
      replace    : true,
      templateUrl: 'app/bringTheRuckus/bringTheRuckusLinksDirective.html',
      link: function (scope) { scope.href = constants.bringTheRuckus2Link; }
    };
});
