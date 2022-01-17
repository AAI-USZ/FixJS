function() {
  gapi.client.tasks.tasklists.list().execute(function(resp) {
    $('#tasks-lists option').remove();

    var lists = resp.result.items;
    gapi.client.tasks.tasklists.get({'tasklist': '@default'}).execute(function(inner_resp) {
      trackEvent('Tasklist', 'Load');

      var default_id = inner_resp.result.id;
      var dropdown = $('#tasks-lists')
      for (var i = 0; i < lists.length; i++) {
        var list = lists[i];
        dropdown.append(
          '<option value="' + list.id + '">' + list.title + '</option>');
      }
      dropdown.val(default_id);
      dropdown.css('display', 'inline');
    });
  });
}