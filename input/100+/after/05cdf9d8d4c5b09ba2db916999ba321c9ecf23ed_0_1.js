function(context) {
  var fields = {};

  // This is a hack to get around the old 1.2.6 jquery limitations in the ajax
  // post method.
  var rawJSONdata = Drupal.settings.tingReferenceAjax;
  var data = {};
  for (var i = 0; i < rawJSONdata.length; i++) {
    data['rows['+i+']'] = rawJSONdata[i];

    // Build array used to place spinner(s) on the page.
    var rawData = eval( "(" + rawJSONdata[i] + ")" );
    for(var key in rawData) {
      fields[rawData[key].nid] = rawData[key].field;
    }
  }

  for (var nid in fields) {
    // Insert spinner(s) to show users that data is being loaded.
    $('.ting-reference-ajax-node-' + nid + '-' + fields[nid]).append('<div class="ting-reference-ajax-spinner"><h4>' + Drupal.t('Loading…') + '</h4><div></div></div>');
  }

  // Inserts the HTML return by the Ajax call below.
  function success(data, textStatus, jqXHR) {
    // Fill in data based on field name and node id.
    for (var nid in data) {
      for (var field_name in data[nid]) {
        // Find the element to place the result into.
        var field = $('.ting-reference-ajax-node-' + nid + '-' + field_name);

        // Hide the list.
        field.hide();

        // Remove spinner.
        $('.ting-reference-ajax-spinner', field).remove();

        // Insert the generated HTML.
        field.html(data[nid][field_name]);
        field.fadeIn(500);
      }
    }
  };

  // Call the backend to get referenced ting objects as rendered HTML.
  $.ajax({
    type: 'POST',
    url: '/ting_reference/view/js',
    data: data,
    success: success,
    dataType: 'json'
  });
}