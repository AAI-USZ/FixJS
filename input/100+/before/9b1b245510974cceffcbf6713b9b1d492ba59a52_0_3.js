function(element, options) {
        /** Fix scope problems */
        var self = this;

        /** A unique id so we can find our elements later */
        var id = new Date().getTime().toString().substr(8);

        /** Upload iframe */
        var iframe = $("<iframe></iframe>", {
            id: "iframe" + id,
            name: "iframe" + id
        }).css({
            display: "none"
        });

        /** Form */
        var form = $("<form></form>", {
            method: "post",
            enctype: options.enctype,
            action: options.action,
            target: "iframe" + id
        }).css({
            margin: 0,
            padding: 0
        });

        /** Get cursor type from the object ocupload was assigned to */
        /** TODO: Add parameter to init? cursor: auto, cursor: pointer etc */
        var element_cursor = element.css('cursor');

        /** File Input */
        var input = $("<input>", {
            name: options.name,
            "type": "file"
        }).css({
            position: 'absolute',
            display: 'block',
            cursor: element_cursor,
            opacity: 0
        });

        /** Put everything together */

        element.wrap("<div></div>");
        form.append(input);
        element.after(form);
        element.after(iframe);

        /** Find the container and make it nice and snug */
        var container = element.parent().css({
            position: 'relative',
            height: element.outerHeight() + 'px',
            width: element.outerWidth() + 'px',
            overflow: 'hidden',
            cursor: element_cursor,
            margin: 0,
            padding: 0
        });

        /** Get input dimensions so we can put it in the right place */
        var input_height = input.outerHeight(1);
        var input_width = input.outerWidth(1);

        /** Move the input with the mouse to make sure it get clicked! */
        container.mousemove(function(e) {
            input.css({
                top: e.pageY-container.offset().top-(input_height/2)+'px',
                left: e.pageX-container.offset().left-input_width+30+'px'
            });
        });

        /** Watch for file selection */
        input.change(function() {
            /** Do something when a file is selected. */
            self.onSelect();

            /** Submit the form automaticly after selecting the file */
            if (self.autoSubmit) {
                self.submit();
            }
        });

        /** Methods */
        $.extend(this, {
            autoSubmit: true,
            onSubmit: options.onSubmit,
            onComplete: options.onComplete,
            onSelect: options.onSelect,

            /** get filename */
            filename: function() {
                return input.attr('value');
            },

            /** get/set params */
            params: function(params) {
                params = params ? params: false;
                if (params) {
                    options.params = $.extend(options.params, params);
                }
                else {
                    return options.params;
                }
            },

            /** get/set name */
            name: function(name) {
                name = name ? name: false;
                if (name) {
                    input.attr('name', value);
                }
                else {
                    return input.attr('name');
                }
            },

            /** get/set action */
            action: function(action) {
                action = action ? action: false;
                if (action) {
                    form.attr('action', action);
                }
                else {
                    return form.attr('action');
                }
            },

            /** get/set enctype */
            enctype: function(enctype) {
                enctype = enctype ? enctype: false;
                if (enctype) {
                    form.attr('enctype', enctype);
                }
                else {
                    return form.attr('enctype');
                }
            },

            /** set options */
            set: function(obj, value) {
                value = value ? value: false;
                function option(action, value) {
                    switch (action) {
                    case 'name':
                        self.name(value);
                        break;
                    case 'action':
                        self.action(value);
                        break;
                    case 'enctype':
                        self.enctype(value);
                        break;
                    case 'params':
                        self.params(value);
                        break;
                    case 'autoSubmit':
                        self.autoSubmit = value;
                        break;
                    case 'onSubmit':
                        self.onSubmit = value;
                        break;
                    case 'onComplete':
                        self.onComplete = value;
                        break;
                    case 'onSelect':
                        self.onSelect = value;
                        break;
                    default:
                        throw new Error('[jQuery.ocupload.set] \'' + action + '\' is an invalid option.');
                    }
                }

                if (value) {
                    option(obj, value);
                }
                else {
                    $.each(obj,
                    function(key, value) {
                        option(key, value);
                    });
                }
            },

            /** Submit the form */
            submit: function() {
                /** Do something before we upload */
                this.onSubmit();

                /** add additional paramters before sending */
                $.each(options.params,
                function(key, value) {
                    form.append($(
                    '<input ' +
                    'type="hidden" ' +
                    'name="' + key + '" ' +
                    'value="' + value + '" ' +
                    '/>'
                    ));
                });

                /** Submit the actual form */
                form.submit();

                /** Do something after we are finished uploading */
                iframe.unbind().load(function() {
                    /** Get a response from the server in plain text */
                    var myFrame = document.getElementById(iframe.attr('name'));
                    var response = $(myFrame.contentWindow.document.body).text();

                    /** Do something on complete */
                    self.onComplete(response);
                    //done :D
                });
            }
        });
    }