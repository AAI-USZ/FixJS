function() {
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