app.directive('pricing', function (constants, utils) {

    function toQueryString(obj) {
      var keys = Object.keys(obj);
      var body = [];

      for (var i = 0; i < keys.length; i++) {
        body.push(keys[i] + '=' + encodeURIComponent(obj[keys[i]]));
      }

      return '?' + body.join('&');
    }

    return {
        restrict   : 'E',
        replace    : true,
        templateUrl: 'app/pricing/pricingDirective.html',

        link: function (scope, elem, attrs) {

          var data = constants.contact || {};

          scope.adultDropInEmail = data.email + toQueryString({
            subject: "Question about your Adult Single Drop-In",
            body: "Hello NinjaFit!\n\nI have a question about your Adult Single Drop-In."
          });

          scope.kidsDropInEmail = data.email + toQueryString({
            subject: "Question about your Kids Class",
            body: "Hello NinjaFit!\n\nI have a question about your Kids Class."
          });

          scope.birthdayPartyEmail = data.email + toQueryString({
            subject: "Question about your Kids Birthday Parties",
            body: "Hello NinjaFit!\n\nI have a question about your Kids Birthday Parties."
          });
        }
    };
});
