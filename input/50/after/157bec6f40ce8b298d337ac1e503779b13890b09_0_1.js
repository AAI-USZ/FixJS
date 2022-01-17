function(data, status) {
      $('#taxon_browser').html(data)
      TaxonBrowser.ajaxify()
    }