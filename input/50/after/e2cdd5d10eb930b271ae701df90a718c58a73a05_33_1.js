function() {
            $(document).off('click', '#inserterbar_action_add_page', addNewPage);
            if (contextData.addArea) {
                addSubPage();
            } else {
                addTopPage();
            }
        }