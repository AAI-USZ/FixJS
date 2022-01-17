function() {
            $inserterbarMoreWidgets.on('click', showHideMoreWidgets);
            // Hide the tinyMCE toolbar when we click outside of a tinyMCE area
            sakai.api.Util.hideOnClickOut($('#inserterbar_tinymce_container'), ".mceMenu, .mce_forecolor");

            $('#inserterbar_action_close_revision_history').on('click', function(e) {
                $(window).trigger("close.versions.sakai");
                setInserterForViewMode();
                e.preventDefault();
            });

            $('#inserterbar_action_revision_history').on('click', setInserterForRevisionHistoryMode);
            $(window).bind('edit.contentauthoring.sakai', setInserterForEditMode);
            $(window).bind('render.contentauthoring.sakai', setInserterForViewMode);

            $(window).on('scroll', positionInserterBar);
            $(window).on('position.inserter.sakai', positionInserterBar);
            $(window).resize(resetPosition);
        }