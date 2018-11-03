app.controller('bringTheRuckus', function ($scope, $sce) {
    var linkUrl = "https://beambitious.clickfunnels.com/sales-page20748799";
    var iframe;
    $scope.linkUrl = $sce.trustAsResourceUrl(linkUrl);

    function size() {
      if (!iframe) iframe = document.getElementById('bring-the-ruckus');
      if (!iframe) return;
      iframe.style.height = window.innerHeight - iframe.offsetTop + 'px';
    }

    setTimeout(size, 1);
    window.addEventListener('resize', size);
});
