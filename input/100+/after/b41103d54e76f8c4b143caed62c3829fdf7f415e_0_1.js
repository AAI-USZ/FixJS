function() {
    var serialized_form = jQuery('form').serialize();
    var previous_button = jQuery('#previousPageButton');
    if (previous_button.length > 0) {
      // Append previousButton value to serialized form, since submit
      // buttons aren't serialized by default
      serialized_form += "&previousPageButton=";
    }

    var self = this;
    $fh.act({
      "act": "submitForm",
      "req": {
        "form_data": jQuery('form').serialize(),
        "form_submission_url": jQuery('form').attr('action')
      }
    }, function(res) {
      self.renderFormHtml(res.html);
      self.initWufoo();
    }, function(msg, err) {
      console.log('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
    });
  }