function(form_id, html, remove_script, cb) {
  var wufoo_config = require('wufoo_config.js');
  inline({
    "html": html,
    "baseUrl": "https://" + wufoo_config.wufoo_config.api_domain,
    "removeScripts": remove_script,
    "id": form_id
  }, function(err, processed_html) {
    if (err != null) {
      console.error('error inlining html:' + err);
    }
    return cb(processed_html);
  });
}