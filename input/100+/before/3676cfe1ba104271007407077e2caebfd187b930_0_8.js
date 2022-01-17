function(resourceData) {
    my.$dialog.html('<h4>Loading ... <img src="http://assets.okfn.org/images/icons/ajaxload-circle.gif" class="loading-spinner" /></h4>');

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

    // 4 situations
    // a) have a webstore_url
    // b) csv or xls (but not webstore)
    // c) can be treated as plain text
    // d) none of the above but worth iframing (assumption is
    // that if we got here (i.e. preview shown) worth doing
    // something ...)
    resourceData.formatNormalized = my.normalizeFormat(resourceData.format);

    resourceData.url  = my.normalizeUrl(resourceData.url);
    if (resourceData.formatNormalized === '') {
      var tmp = resourceData.url.split('/');
      tmp = tmp[tmp.length - 1];
      tmp = tmp.split('?'); // query strings
      tmp = tmp[0];
      var ext = tmp.split('.');
      if (ext.length > 1) {
        resourceData.formatNormalized = ext[ext.length-1];
      }
    }

    if (resourceData.webstore_url) {
      resourceData.elasticsearch_url = '/api/data/' + resourceData.id;
      var dataset = new recline.Model.Dataset(resourceData, 'elasticsearch');
      initializeDataExplorer(dataset);
    }
    else if (resourceData.formatNormalized in {'csv': '', 'xls': ''}) {
      // set format as this is used by Recline in setting format for DataProxy
      resourceData.format = resourceData.formatNormalized;
      var dataset = new recline.Model.Dataset(resourceData, 'dataproxy');
      initializeDataExplorer(dataset);
      $('.recline-query-editor .text-query').hide();
    }
    else if (resourceData.formatNormalized in {
        'rdf+xml': '',
        'owl+xml': '',
        'xml': '',
        'n3': '',
        'n-triples': '',
        'turtle': '',
        'plain': '',
        'atom': '',
        'tsv': '',
        'rss': '',
        'txt': ''
        }) {
      // HACK: treat as plain text / csv
      // pass url to jsonpdataproxy so we can load remote data (and tell dataproxy to treat as csv!)
      var _url = my.jsonpdataproxyUrl + '?type=csv&url=' + resourceData.url;
      my.getResourceDataDirect(_url, function(data) {
        my.showPlainTextData(data);
      });
    }
    else if (resourceData.formatNormalized in {'html':'', 'htm':''}
        ||  resourceData.url.substring(0,23)=='http://docs.google.com/') {
      // we displays a fullscreen dialog with the url in an iframe.
      my.$dialog.empty();
      var el = $('<iframe></iframe>');
      el.attr('src', resourceData.url);
      el.attr('width', '100%');
      el.attr('height', '100%');
      my.$dialog.append(el);
    }
    // images
    else if (resourceData.formatNormalized in {'png':'', 'jpg':'', 'gif':''}
        ||  resourceData.resource_type=='image') {
      // we displays a fullscreen dialog with the url in an iframe.
      my.$dialog.empty();
      var el = $('<img />');
      el.attr('src', resourceData.url);
      el.css('max-width', '100%');
      el.css('border', 'solid 4px black');
      my.$dialog.append(el);
    }
    else {
      // Cannot reliably preview this item - with no mimetype/format information,
      // can't guarantee it's not a remote binary file such as an executable.
      my.showError({
        title: CKAN.Strings.previewNotAvailableForDataType + resourceData.formatNormalized,
        message: ''
      });
    }
  }