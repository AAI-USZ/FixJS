function() {
      that.adminPath = utils.stripTrailingIndexHtmlAndSlash(
        window.location.pathname);
      stub.setErrorHandler(that.errorHandler);
      that.buildCallbacksChain([that.getLocations,
                                that.getUsers,
                                that.getAdminUser,
                                ui.refresh])();
    }