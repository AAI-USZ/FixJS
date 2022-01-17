function(index, action, data) {
        $("#details_showbutton_" + index.toString()).hide();
        $("#details_hidebutton_" + index.toString()).show();
        var id = "#details_pane_" + index.toString();
        $(id).toggle();

        if(!this.initialized[index]) {
            this.initialized[index] = true;
            var detailsPane = $(id + " .details");
            detailsPane.css('width', '100%');
            if(action == 'map') {
                detailsPane.css('height', '300px');
                MapHelper.show(detailsPane, eval('(' + data + ')'));
            } else if(action == 'info') {
                detailsPane.html(data);
            }
        }
    }