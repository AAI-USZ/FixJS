function (resource, options) {
        // First ask the user
        var context, doRequest, msg;

        msg = gettext('Do you really want to remove the "%(name)s" (vendor: "%(vendor)s", version: "%(version)s") gadget?');
        context = {
            name: resource.getName(),
            vendor: resource.getVendor(),
            version: resource.getVersion().text
        };

        options.onSuccess = this.refresh_search_results.bind(this);
        options.onComplete = this.home.bind(this);

        doRequest = function () {
            this.fiWareCatalogue.deleteResource(options);
        };

        msg = interpolate(msg, context, true);

        return function () {
            LayoutManagerFactory.getInstance().showYesNoDialog(msg, doRequest.bind(this));
        }.bind(this);
    }