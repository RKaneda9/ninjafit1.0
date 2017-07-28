app.directive('addressMap', function ($sce, constants) {

    var googleMapsUrl = "http://maps.google.com/maps?q={{address}}&output=embed";
    var addressExt = "{{street}} {{city}} {{state}} {{zip}}";

    return {
        restrict   : 'E',
        replace    : true,
        templateUrl: 'app/contact/addressMapDirective.html',

        link: function (scope, elem, attrs) {

            var data = constants.contact.address;

            var address = addressExt
                .replace('{{street}}', data.street)
                .replace('{{city}}', data.city)
                .replace('{{state}}', data.state)
                .replace('{{zip}}', data.zip)
                .split(' ').join('+');

            var mapUrl = googleMapsUrl.replace('{{address}}', address);

            scope.mapUrl = $sce.trustAsResourceUrl(mapUrl);
        }
    };
});