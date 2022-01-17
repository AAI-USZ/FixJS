function (revalidate) {
                var name, errors, caption, err_msg;
                errors = [];
                if (revalidate === undefined) {
                    revalidate = false;
                }
                for (name in form._fields) {
                    if (form._fields.hasOwnProperty(name)) {
                        if (revalidate) {
                            form._fields[name]._validate();
                        }
                        if (form._fields[name]._value.is('.om_input_error')) {
                            if ('caption' in form._fields[name]._args) {
                                caption = name;
                            } else {
                                caption = form._fields[name]._args.caption;
                            }
                            if (form._fields[name]._error_tooltip) {
                                err_msg = form._fields[name]._error_tooltip._message;
                            } else {
                                err_msg = "Invalid value.";
                            }
                            errors.push(
                                caption + ': ' +
                                form._fields[name]._error_tooltip._message
                            );
                        }
                    }
                }
                return errors;
            }