function(e) {
    $('#taxon_browser .loading:first').show();
    // don't make the extra params an object literal.  That will force a POST 
    // request, which will screw up the pagination links
    var params = {partial: 'browse', js_link: true, authenticity_token: $('meta[name=csrf-token]').attr('content')}
    $('#taxon_browser').load($(this).attr('href'), params, function() {
      TaxonBrowser.ajaxify()
    })
    return false
  }