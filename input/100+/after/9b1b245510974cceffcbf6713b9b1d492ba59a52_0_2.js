function() {
                /** Do something before we upload */

                // if onSubmit returns true, don't send to server (for debugging)
		var exit = this.onSubmit();
                if (exit)
                   return;

		$(".ocupload-" + id,form).remove(); // clear the previous used attributes in case loading multiple files

                /** add additional paramters before sending */
                $.each(options.params, function(key, value) {
                    form.append($("<input>",{
                       type  : "hidden",
		       name  : key,
		       value : value,
		       class : "ocupload-" + id  // including the upload id
                    }));

                });

                /** Submit the actual form */
                form.submit();

                /** Do something after we are finished uploading */
                iframe.unbind().load(function() {
                    /** Get a response from the server in plain text */
                    var myFrame = document.getElementById(iframe.attr('name'));
                    var response = $(myFrame.contentWindow.document.body).html();

                    /** Do something on complete */
                    self.onComplete(response);
                });
            }