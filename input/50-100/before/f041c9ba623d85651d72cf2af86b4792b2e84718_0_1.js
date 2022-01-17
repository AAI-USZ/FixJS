function() {
    $.get(WEBROOT + '/xhr/headphones/artist/' + $(this).data('id') + '/add');
    $.get(WEBROOT + '/xhr/headphones/artist/' + $(this).data('id'), function(data){
      $('#headphones').replaceWith(data);
    });
  }