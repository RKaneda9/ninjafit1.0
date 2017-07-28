app.factory('validationModel', function (utils) {
    function ValidationModel() { }

    ValidationModel.prototype = {

        props: {},
        errMsg: '',

        get: function () {
            return utils.mapObject(this.props, function (obj, prop, key) {
                obj[key] = prop.value;
            });
        },

        trim: function () {
            utils.foreach(this.props, function (prop) {
                prop.value = prop.value.trim();
            });

            return this.get();
        },

        clear: function () {
            utils.foreach(this.props, function (prop) { prop.value = ''; });
            return this.clearValidation();
        },

        clearValidation: function () {
            utils.foreach(this.props, function (prop) { prop.invalid = false; });
            this.errMsg = '';
            return true;
        },

        setInvalid: function (target, msg) {

            this  .clearValidation();
            this  .errMsg  = msg;
            target.invalid = true; 
            return false;
        }
    };

    return ValidationModel;
});