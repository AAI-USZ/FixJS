function(e) {
            Utils.debug("Data list fetched successfully" +e);
            //show pretty views after loading everything.
            window.appView.renderReadonlyDataListViews();
          }