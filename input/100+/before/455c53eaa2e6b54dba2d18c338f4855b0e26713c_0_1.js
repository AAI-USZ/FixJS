function(form, vals) {
            if (!(form instanceof HTMLElement) || typeof(form) === "string") {
                form = document.querySelector(form);
                console.log('found via selector')
            }
            if (!form) {
                console.log('form not found or invalid');
                return;
            }
            console.log('form is ' + (typeof(form)))
            for (var name in vals) {
                if (!vals.hasOwnProperty(name)) {
                    continue;
                }
                var field = form.querySelector('[name="' + name + '"]')
                ,   value = vals[name];
                if (!field) {
                    console.log('no field named "' + name + '" in form');
                    continue;
                }
                this.setField(field, value);
            }
        }