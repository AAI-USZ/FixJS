function (data) {
        var uid = this.callback.slice(6);

        if (uid == PTL.editor.activeUid && data.length > 0) {
          var filtered = PTL.editor.filterTMResults(data),
              name = gettext("amaGama server"),
              tm = PTL.editor.tmpl.tm($, {data: {meta: PTL.editor.meta,
                                                 suggs: filtered,
                                                 name: name}}).join("");

          // Append results
          $("div#suggestion-container").append(tm);
          $("div#amagama_results").animate({height: 'show'}, 1000,
                                           'easeOutQuad');
        }
      }