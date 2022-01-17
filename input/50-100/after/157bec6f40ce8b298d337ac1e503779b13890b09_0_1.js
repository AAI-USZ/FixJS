function(e) {
    $('#taxon_browser .loading:first').show();
    var params = $(this).serialize() + 
      '&partial=browse' +
      '&authenticity_token=' + $('meta[name=csrf-token]').attr('content')
    $.get($(this).attr('action'), params, function(data, status) {
      $('#taxon_browser').html(data)
      TaxonBrowser.ajaxify()
    });
    return false;
  }