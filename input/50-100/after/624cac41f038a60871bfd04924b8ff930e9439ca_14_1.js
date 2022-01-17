function() {
            selectedTitles = $('.addpeoplegroups_trigger:visible').data('entityname');
            selectedIDs = $('.addpeoplegroups_trigger:visible').data('entityid');
            if (!$addpeoplegroupsWidget.is(':visible')) {
                addBinding();
                doInit(this);
            } else {
                toggleVisibility();
            }
        }