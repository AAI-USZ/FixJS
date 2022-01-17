function (data) {
        // Fill in metadata information if we don't have it yet
        if (Object.size(PTL.editor.meta) == 0 && data.meta) {
          PTL.editor.meta = data.meta;
        }

        // Receive pager in case we have asked for it
        if (opts.pager) {
          if (data.pager) {
            PTL.editor.hasResults = true;

            // Clear old data and add new results
            PTL.editor.pagesGot = {};
            PTL.editor.units = {};
            PTL.editor.updatePager(data.pager);
            // PTL.editor.fetchPages(false);
            if (data.uid) {
              PTL.editor.activeUid = data.uid;
            }
          }
        }

        // Store view units in the client
        if (data.units.length) {
          // Determine in which page we want to save units, as we may not
          // have specified it in the GET parameters — in that case, the
          // page number is specified within the response pager
          if (opts.withUid && data.pager) {
            var page = data.pager.number;
          } else {
            var page = opts.page;
          }

          PTL.editor.pagesGot[page] = [];

          // Copy retrieved units to the client
          $.each(data.units, function () {
            PTL.editor.units[this.id] = this;
            PTL.editor.pagesGot[page].push(this.id);
          });

          PTL.editor.hasResults = true;
        } else {
          PTL.editor.hasResults = false;
          PTL.editor.displayError(gettext("No results."));
          // Clear the results table
          PTL.editor.reDraw(null);
        }
      }