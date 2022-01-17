function () {
            // Grab the current status.
            var statusText = $("#status").val(),
                filterConfig = "",
                status = {};
            
            // Go through each filter checkbox
            $("#filters")
                .find("input:checked")
                .each(function (index, element) {
                    filterConfig += $(this).val() + ",";
                });

            if (filterConfig) {
                filterConfig = filterConfig.substring(0, filterConfig.length - 1);
            }

            // Quick and dirty: an empty status is ignored.  What this should
            // really be is a dynamic disabling of the post-this button when
            // the text area is empty.
            if (!statusText) {
                return;
            }
            
            // Otherwise, construct the status object
            status = {
                message: statusText,
                filters: filterConfig
            };

            // Put up a little feedback.
            disableButton();
            
            // Make cursor pinwheel

            // Send the status post to the server.
            $.ajax({
                type: "POST",
                url: "/status",
                data: status,
                dataType: "json",

                success: function (result) {
                    // If something went wrong, data will have an error property.
                    if (result.error) {
                        $("#error-alert").fadeIn("slow");
                        $("#error-message").text(result.error);
                    }

                    // No matter what, clear things up for the next status post.
                    $("#status").val("").change();

                    // Get the button back in gear.                
                    // Unmake pinwheel into normal cursor
                },

                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        }