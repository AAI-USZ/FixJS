function checkServerScript() {
  // FIXME: make this work
  return;
  if (Auth.email && DOC) {
    $.ajax({
      url: scriptURL(),
      type: "GET",
      dataType: 'text',
      success: function (resp, status, req) {
        if ($('#script').val() == DEFAULT_SCRIPT
            || $('#script').val() == renderDefaultScript()) {
          $('#script').val(resp);
          saveStatus.setSaved();
        } else if (resp != $('#script').val()) {
          $('#load-domain').text(DOC.domain);
          $('#load-data').text(resp);
          $('#load-question').modal();
        }
      },
      error: function (req, status, error) {
        if (status != 404) {
          console.log('Error fetching URL; status:', status);
        }
      }
    });
  }
}