function (e) {
        // Process children radio button and remove "selected" class from other table rows
        // Assuming there's only one child radio button item
        var radioChild = jQuery(this).find("input[type=radio]")
        if (radioChild) {
            radioChild.attr("checked", "checked");

            // remove "selected" class from all other table rows
            jQuery(this).parents('table').find('tr.selected').removeClass('selected');
        }
        
        // Process children checkboxed
        var checkboxChildren = jQuery(this).find("input[type=checkbox]")
        if (checkboxChildren) {
            checkboxChildren.attr("checked", "checked");
        }
        
        // add "selected" class to current table row to highlight the selected row
        jQuery(this).addClass("selected");

        if (e.data && e.data.callback) {
            e.data.callback(this);
        }
    }