app.controller('home', function ($scope, $rootScope, $timeout, warehouseService, constants, utils) {
    $scope.imageList    = constants.images.main;
    $scope.initializing = true;
    $scope.facebook     = {};
    $scope.instagram    = [];
    $scope.goTo         = $rootScope.goTo;
    $scope.showPopup    = false; //constants.showPopup && !utils.getCookie('nfg-announcement');
    $scope.today        = {

        events : [],
        isOpen : false,
        wod    : null,
        loading: true
    };

    $scope.closePopup = function () {
        $scope.showPopup = false;

        var expires = new Date();
        expires.setDate(expires.getDate() + 1);

        utils.setCookie('nfg-announcement', true, expires);
    };

    if (constants.showPopup && new Date() < constants.popupEnd && !utils.getCookie('nfg-announcement')) {
        $timeout(function () {
            $scope.showPopup = true;
        }, 200);
    }

    warehouseService
        .getSocialFeeds()
        .then(function (social) {

            $scope.instagram = social.instagram;
            $scope.facebook  = {

                page: social.facebook.page,
                post: utils.first(social.facebook.posts, function (post) {
                    return post.text && post.text.trim().length;
                })
            };
        })
        .finally(function () { $scope.initializing = false; });

    var todayKey = (new Date()).getDateKey();
    var loaded   = 0;

    warehouseService
        .getSchedule(todayKey)
        .then(function (schedule) {

            var events = [];
            var today  = utils.first(schedule.days, function (day) {
                return day.date == todayKey;
            });

            if (today) {
                $scope.today.events = utils.map(today.items, function (block) {

                    //if (block.type == 'Open') { return null; }

                    var start = Date.fromDateKey(today.date, block.start);
                    var end   = Date.fromDateKey(today.date, block.end);

                    return {
                        start: start.format('h:mm tt'),
                        end  : end  .format('h:mm tt'),
                        type : block.type,
                        title: block.title
                    };
                });

                $scope.today.isOpen = !!today.items.length;
            }
        })
        .finally(function () { if (++loaded > 1) { $scope.today.loading = false; } });

    warehouseService
        .getWods()
        .then   (function (wods) { if (wods && wods.length) { $scope.today.wod = true; } })
        .finally(function ()     { if (++loaded > 1) { $scope.today.loading = false; } });
});
