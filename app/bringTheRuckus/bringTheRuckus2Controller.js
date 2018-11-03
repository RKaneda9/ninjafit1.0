app.controller('bringTheRuckus2.0', function ($scope, $sce) {
  var now = new Date();
  var earlyBird = {
    date: new Date('11/15/2018 22:00:00 EST'),
    dateFormatted: '10pm on 11/15/2018',
    team: 120,
    individual: 40
  };

  var regular = {
    team: 150,
    individual: 50
  };

  var current = now <= earlyBird.date ? earlyBird : regular;
  var eventDateFormatted = 'Saturday, January 12th 2019';

  $scope.earlyBird = earlyBird;
  $scope.regular = regular;
  $scope.current = current;
  $scope.eventDateFormatted = eventDateFormatted;

  function size() {
    var frames = document.querySelectorAll('.video iframe, .centered-video iframe');
    for (var i = 0; i < frames.length; i++) {
      var frame = frames[i];
      frame.height = frame.clientWidth * 0.56;
    }
  }

  setTimeout(size, 1);
  window.addEventListener('resize', size);
});
