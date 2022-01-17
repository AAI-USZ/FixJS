function() {
  var lucene_design_name = '_design/lucene';
  var q = phila.tools.get_parameter_by_name('q');
  var key = q.split(':')[0];
  var key_stripped = key.replace(/[^a-zA-Z0-9]+/g,'_');
  var q_stripped = key_stripped + ':' + q.split(':')[1];
  $('#keyname').html(key);
  $.ajax('/_fti/local/' + phila.settings.db_name + '/' + lucene_design_name + '/field?include_docs=true&q=' + q_stripped, {
    dataType: 'json',
    success: function(data) {
      //console.log(data);
      for (row in data.rows) {
        var report_id = data.rows[row].doc.report_id;
        var block_name = data.rows[row].doc.name;
        var short_id = report_id.substring(report_id.length-8, report_id.length);
        var html = '<tr>';
        html += '<td><a href="view.html?id=' + report_id + '">' + short_id + '</a></td>';
        html += '<td style="white-space:nowrap;">' + block_name + '</td>';
        html += '<td>' + data.rows[row].fields[key_stripped] + '</td>';
        html += '</tr>';
        $('#results-table').append(html);
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      $('.container-fluid').append('<h2>An error occured: ' + errorThrown + '</h2>');
    }
  });
}