function(options) {
        var modalBgElement = ("." + options.modalBgClass),
            modalElement = ("." + options.modalClass);

        var constructModal = function() {
            var $modal = $("<div />"),
                modalInner = "",
                socialMediaSites = ["facebook", "twitter", "linkedin"],
                socialMediaAccounts = [options.facebook, options.twitter, options.linkedin];

            // begin constructing the contents of the modal window
            modalInner += "<span>Contact Me</span>"
                        + "<a href=\"#\" id=\"closeMailtwoModal\"></a>"
                        + "<ul>"
                        + "<li>"
                        + "<span>Send me an email:</span>"
                        + "<input type=\"text\" id=\"mailtwoInput\" placeholder=\"Subject\" />"
                        + "<textarea id=\"mailtwoTextarea\" placeholder=\"Message\"></textarea>"
                        + "<a href=\"" + options.emailFull + "&subject=&body=\" id=\"sendMailtwoEmail\" target=\"_blank\">Send</a>"
                        + "</li>";

            // for each of the 3 social media sites, determine if the user entered a
            //  username via plugin option or data- attr, and if so, add it to the modal
            for (var i = 0; i < socialMediaSites.length; i++) {
                if (socialMediaAccounts[i]) {
                    modalInner += "<li>"
                            + "<a href=\"http://" + socialMediaSites[i] + ".com/"
                            + socialMediaAccounts[i] + "\" target=\"_blank\" class=\"mailtwo"
                            + socialMediaSites[i] + "\"></a>"
                            + "</li>";
                }
            }

            modalInner += "</ul>";

            $modal
                .addClass(options.modalClass)
                .html(modalInner);

            return $modal;
        }

        // if the modal doesn't exist as a direct child of the body, add it to the DOM
        if ($("body").children(modalBgElement).length === 0) {
            $("<div />")
                .addClass(options.modalBgClass)
                .html(constructModal())
                .appendTo("body");
        }
        // if the modal DOES exist, merely reconstruct its inner contents
        else {
            $(modalBgElement)
                .html(constructModal());
        }

        // position the modal in the center of the browser viewport
        $(modalElement).css({
            top: "50%",
            left: "50%",
            "margin-left": (-($(modalElement).outerWidth() / 2)),
            "margin-top": (-($(modalElement).outerHeight() / 2))
        });

    }