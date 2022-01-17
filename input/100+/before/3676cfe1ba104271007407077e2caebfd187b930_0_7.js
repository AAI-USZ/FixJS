function initializeDataExplorer(dataset) {
      var views = [
        {
          id: 'grid',
          label: 'Grid',
          view: new recline.View.Grid({
            model: dataset
          })
        },
        {
          id: 'graph',
          label: 'Graph',
          view: new recline.View.Graph({
            model: dataset
          })
        },
        {
          id: 'map',
          label: 'Map',
          view: new recline.View.Map({
            model: dataset
          })
        }
      ];
      var dataExplorer = new recline.View.DataExplorer({
        el: my.$dialog,
        model: dataset,
        views: views,
        config: {
          readOnly: true
        }
      });

      // -----------------------------
      // Setup the Embed modal dialog.
      // -----------------------------

      // embedLink holds the url to the embeddable view of the current DataExplorer state.
      var embedLink = $('.embedLink');

      // embedIframeText contains the '<iframe>' construction, which sources
      // the above link.
      var embedIframeText = $('.embedIframeText');

      // iframeWidth and iframeHeight control the width and height parameters
      // used to construct the iframe, and are also used in the link.
      var iframeWidth = $('.iframe-width');
      var iframeHeight = $('.iframe-height');

      // Update the embedLink and embedIframeText to contain the updated link
      // and update width and height parameters.
      function updateLink() {
        var link = my.makeEmbedLink(dataExplorer.state);
        var width = iframeWidth.val();
        var height = iframeHeight.val();
        link += '&width='+width+'&height='+height;

        // Escape '"' characters in {{link}} in order not to prematurely close
        // the src attribute value.
        embedIframeText.val($.mustache('<iframe frameBorder="0" width="{{width}}" height="{{height}}" src="{{link}}"></iframe>',
                                       {
                                         link: link.replace(/"/g, '&quot;'),
                                         width: width,
                                         height: height
                                       }));
        embedLink.attr('href', link);
      }

      // Bind changes to the DataExplorer, or the two width and height inputs
      // to re-calculate the url.
      dataExplorer.state.bind('change', updateLink);
      for (var i=0; i<dataExplorer.pageViews.length; i++) {
        dataExplorer.pageViews[i].view.state.bind('change', updateLink);
      }

      iframeWidth.change(updateLink);
      iframeHeight.change(updateLink);

      // Initial population of embedLink and embedIframeText
      updateLink();

      // Finally, since we have a DataExplorer, we can show the embed button.
      $('.preview-header .btn').show();

      // will have to refactor if this can get called multiple times
      Backbone.history.start();
    }