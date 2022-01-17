function load_table_data(table_name){

  var opts = {
    lines: 12, // The number of lines to draw
    length: 7, // The length of each line
    width: 4, // The line thickness
    radius: 10, // The radius of the inner circle
    color: '#8ebf37', // #rbg or #rrggbb
    speed: 0.5, // Rounds per second
    trail: 40, // Afterglow percentage
    shadow: true // Whether to render a shadow
  };

  var spinner = new Spinner(opts).spin(document.getElementById('spinner'));

  $.get('/setup/features_table_data', {'table_name': table_name}, function(html){
    $('#table_data').html(html);
    spinner.stop();
    $('#features_table').val(table_name);
    $('#use_this_table').attr('disabled', 'disabled');
    if (table_name && table_name != '') {
      $('#use_this_table').removeAttr('disabled');
    };
  });
}