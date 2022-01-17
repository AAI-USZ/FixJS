function(e) {
            Utils.debug("Corpus fetched successfully" + e);
            //show pretty views after loading everything.
            window.appView.renderReadonlyCorpusViews();
          }