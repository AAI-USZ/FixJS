function(form_id, html, remove_script, cb) {
  inline({
    "html": html,
    "baseUrl": "https://wufoo.com",
    "removeScripts": remove_script,
    "id": form_id
  }, function(err, processed_html) {
    if (err != null) {
      console.error('error inlining html:' + err);
    }
    return cb(processed_html);
  });
}