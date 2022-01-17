function() {
      this.adminPath = utils.stripTrailingIndexHtmlAndSlash(
        window.location.pathname);
      stub.setErrorHandler(ui);
      that.buildCallbacksChain([that.getLocations,
                                that.getUsers,
                                that.getAdminUser,
                                ui.refresh])();
    }