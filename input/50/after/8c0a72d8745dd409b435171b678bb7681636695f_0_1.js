function(e) {
              Utils.debug("Session fetched successfully" +e);
              //show pretty views after loading everything.
              window.appView.renderReadonlySessionViews();
            }