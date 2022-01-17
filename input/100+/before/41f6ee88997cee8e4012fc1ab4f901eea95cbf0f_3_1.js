function RegisterPanel() {
    var self = this;

    this.FirstName = ko.observable("").extend({
        validation: {
            required: true,
            message: "Please enter your first name"
        }
    });
    this.LastName = ko.observable("").extend({
        validation: {
            required: true,
            message: "Please enter your last name"
        }
    });
    this.Email = ko.observable("").extend({
        validation: {
            required: true,
            regex: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: "Please input a valid email",
            func: function (value) {
                if (value == "")
                    return true;

                // Verify that the email is available
                amplify.request({
                    resourceId: "checkEmail",
                    data: {
                        email: value
                    },
                    success: function (data) {
                        if (!data.available) {
                            self.Email.invalidate("This email is already in use");
                        }
                    }
                });
            }
        }
    });
    this.Password = ko.observable("").extend({
        validation: {
            required: true,
            message: "Please enter a password"
        }
    });
    this.repeatPassword = ko.observable("").extend({
        validation: {
            func: function (value) {
                return value == self.Password();
            },
            message: "The two password fields do not match"
        }
    });

    this.isFormValid = ko.computed(function () {
        return this.FirstName.isValid() && this.LastName.isValid() && this.Email.isValid() && this.Password.isValid() && this.repeatPassword.isValid();
    }, this);

    this.error = ko.observable();

    self.register = function () {

        amplify.request({
            resourceId: "register",
            data: {
                FirstName: self.FirstName(),
                LastName: self.LastName(),
                Email: self.Email(),
                Password: self.Password()
            },
            success: function (data) {
                self.error(null);

                $('#register').modal('hide');
                Application.alerts.push({ type: "success", title: "Great job!", text: "Your registration was successful" });
            },
            error: function (data) {
            	self.error("Something went completely wrong. Did you just divide by zero?");
            }
        });

        return false;
    }
}