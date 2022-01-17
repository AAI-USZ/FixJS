function() {
        if (this.selectedLocal != null && this.services.getByCid(this.selectedLocal).hasReference()) {
            var fromId = this.services.getByCid(this.selectedLocal).get('id');
            var app = this;
            $.ajax({
                url: '/nuxeo/dashboard/service/' + fromId + '/linkto/null',
                type: 'POST',
                success: function(data, textStatus, jqXHR) {
                    // XXX: Page is sometimes reloaded before the update is done ; why?
                    setTimeout(location.reload, 300);  
                },
                error: function(data) {
                    app.showError("Failed to unlink services");
                }
            });
        }
        else {
            alert("You must a service that has a reference.");
        }
    }