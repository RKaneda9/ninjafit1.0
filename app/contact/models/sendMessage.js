app.factory('sendMessageModel', function (validationModel) {

    function SendMessageModel () {
        
        this.props.firstName = { value: '', invalid: false, minLength: 2  };
        this.props. lastName = { value: '', invalid: false, minLength: 4  };
        this.props.    email = { value: '', invalid: false                };
        this.props.  content = { value: '', invalid: false, minLength: 20 };

        this.isValid = function () {

            var msg = this.trim();

            if (!msg.firstName.length)                                  { return this.setInvalid(this.props.firstName, 'Please enter your first name.');  }
            if ( msg.firstName.length < this.props.firstName.minLength) { return this.setInvalid(this.props.firstName, 'First name must be at least ' + this.props.firstName.minLength + ' characteres.'); }
            if (!msg.lastName .length)                                  { return this.setInvalid(this.props.lastName,  'Please enter your last name.');   }
            if ( msg.lastName .length < this.props.lastName.minLength)  { return this.setInvalid(this.props.lastName,  'Last name must be at least ' + this.props.lastName.minLength + ' characters.'); }
            if (!msg.email    .length)                                  { return this.setInvalid(this.props.email,     'Please enter your email.');       }
            if (!msg.email    .includes('@'))                           { return this.setInvalid(this.props.email,     'Please enter a valid email address.'); }
            if (!msg.content  .length)                                  { return this.setInvalid(this.props.content,   'Please enter message contents.'); }
            if ( msg.content  .length < this.props.content.minLength)   { return this.setInvalid(this.props.content,   'Message content must be at least ' + this.props.content.minLength + ' characters.'); }

            return this.clearValidation();

        }.bind(this);
    }

    SendMessageModel.prototype = validationModel.prototype;

    return SendMessageModel;
});