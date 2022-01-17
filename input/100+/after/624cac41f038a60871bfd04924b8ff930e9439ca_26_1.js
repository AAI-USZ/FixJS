function(){

            // Get the name of the current document
            doc_name = getDocName();

            // Display debug info if set in config
            if (sakai.config.displayDebugInfo === true) {

                // Add binding to the image
                $footer_logo.toggle(function(){

                    // Render the debug info
                    renderDebugInfo($footer_debug_info);

                    // Show the debug info
                    $footer_debug_info.show();

                    // Update button title
                    $footer_logo.attr('title', sakai.api.i18n.getValueForKey('HIDE_DEBUG_INFO', 'footer'));

                },function(){

                    // Hide the debug info
                    $footer_debug_info.hide();

                    // Update button title
                    $footer_logo.attr('title', sakai.api.i18n.getValueForKey('SHOW_DEBUG_INFO', 'footer'));

                }).addClass("footer_clickable");

            } else {
                // Disable and remove button title
                $footer_logo.removeAttr('title');
                $footer_logo.attr('disabled', 'disabled');
            }

            if (!sakai.data.me.user.anon && (sakai.config.displayTimezone || sakai.config.displayLanguage)) {
                if (sakai.config.displayTimezone) {
                    $("#footer_langdoc_loc").show();
                }
                if (sakai.config.displayLanguage) {
                    $("#footer_langdoc_lang").show();
                }
            }

            // Set the end year of the copyright notice
            var d = new Date();
            $footer_date_end.text(d.getFullYear());

            var leftLinksHTML = sakai.api.Util.TemplateRenderer($footer_links_left_template, {links:sakai.config.Footer.leftLinks});
            leftLinksHTML = sakai.api.i18n.General.process(leftLinksHTML, "footer");
            $footer_links_left.html(leftLinksHTML);

            var rightLinksHTML = sakai.api.Util.TemplateRenderer($footer_links_right_template, {links:sakai.config.Footer.rightLinks});
            rightLinksHTML = sakai.api.i18n.General.process(rightLinksHTML, "footer");
            $footer_links_right.html(rightLinksHTML);

            updateLocationLanguage();
        }