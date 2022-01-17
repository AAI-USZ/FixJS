function() {
            $inserterbarMoreWidgets.click(showHideMoreWidgets);

            $('#inserterbar_action_close_revision_history').live('click', function() {
                $(window).trigger("close.versions.sakai");
            });


            $('#inserterbar_action_revision_history').live('click', setInserterForRevisionHistoryMode);
            $('#inserterbar_action_close_revision_history').live('click', setInserterForViewMode);
            $(window).bind('edit.contentauthoring.sakai', setInserterForEditMode);
            $(window).bind('render.contentauthoring.sakai', setInserterForViewMode);

            $(window).bind('scroll', function(ev, ui) {
                var top = $inserterbarWidgetContainer.position().top;
                var scroll = $.browser.msie ? $('html').scrollTop() : $(window).scrollTop();
                if (scroll > $inserterbarWidgetContainer.position().top) {
                    if (scroll >= ($contentauthoringWidget.height() + $contentauthoringWidget.position().top - ($inserterbarWidget.height() / 2))) {
                        $('.sakaiSkin[role="listbox"]').css('position', 'absolute');
                        $inserterbarWidget.css('position', 'absolute');
                    } else {
                        $('.sakaiSkin[role="listbox"]').css('position', 'fixed');
                        $inserterbarWidget.css('position', 'fixed');
                        $inserterbarWidget.css('top', '0px');
                    }
                } else {
                    $('.sakaiSkin[role="listbox"]').css('position', 'absolute');
                    $inserterbarWidget.css('position', 'absolute');
                    $inserterbarWidget.css('top', $inserterbarWidgetContainer.position().top + 'px');
                }
            });
            $(window).resize(resetPosition);
        }