function(e) {
    $('#taxon_browser .loading:first').show();
    var params = $(this).serialize()+'&partial=browse';
    $.get($(this).attr('action'), params, function(data, status) {
      $('#taxon_browser').html(data);
      TaxonBrowser.ajaxify();
    });
    return false;
  }