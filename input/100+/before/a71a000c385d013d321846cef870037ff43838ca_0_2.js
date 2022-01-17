function($) {

Drupal.behaviors.prepareVolunteerUI = {
  attach: function(context) {
    $('input[type="text"]', context).on('focus click', function() {
      $(this).select()
    });
  }
};

// Toggle fields
Drupal.behaviors.toggleFields = {
  attach: function(context) {
    $('.field-name-field-session-user input', context).each(function() {
      var form = $(this).parents('form');
      if (!this.value) {
        $('input[name!="field_session_user[und][0][target_id]"], select, textarea', form)
          .not(':submit')
          .attr('readonly', true);
        
        $('input:checkbox, input:submit, button, a', form)
          .attr('disabled', true);
      }
      $(this).change(function() {
        $('input, select, textarea', form)
        .not('name="field_session_user[und][0][target_id]"')
        .not('name="field_session_duration[und][0][value]"')
        .not(':submit')
        .removeAttr('readonly');

        $('input:checkbox, input:submit, button', form)
          .removeAttr('disabled');
      });
    });
    $('.form-item-field-session-override-duration-und input').not(':disabled').each(function() {
      var form = $(this).parents('form');
      var duration = $('input[name="field_session_duration[und][0][value]"]', form);
      var hours = $('.form-item-field-session-hours-und-0-value input, .form-item-field-session-hours-und-0-value2 input', form);
      if ($(this).is(':checked')) {
        duration.removeAttr('readonly');
        hours.attr('readonly', true);
      }
      else {
        duration.attr('readonly', true);
        hours.removeAttr('readonly');
      }
    });
  }
};

/* Drupal AJAX overrides */

/**
 * Prepare the Ajax request before it is sent.
 */
Drupal.ajax.prototype.beforeSend = function (xmlhttprequest, options) {
  // For forms without file inputs, the jQuery Form plugin serializes the form
  // values, and then calls jQuery's $.ajax() function, which invokes this
  // handler. In this circumstance, options.extraData is never used. For forms
  // with file inputs, the jQuery Form plugin uses the browser's normal form
  // submission mechanism, but captures the response in a hidden IFRAME. In this
  // circumstance, it calls this handler first, and then appends hidden fields
  // to the form to submit the values in options.extraData. There is no simple
  // way to know which submission mechanism will be used, so we add to extraData
  // regardless, and allow it to be ignored in the former case.
  if (this.form) {
    options.extraData = options.extraData || {};

    // Let the server know when the IFRAME submission mechanism is used. The
    // server can use this information to wrap the JSON response in a TEXTAREA,
    // as per http://jquery.malsup.com/form/#file-upload.
    options.extraData.ajax_iframe_upload = '1';

    // The triggering element is about to be disabled (see below), but if it
    // contains a value (e.g., a checkbox, textfield, select, etc.), ensure that
    // value is included in the submission. As per above, submissions that use
    // $.ajax() are already serialized prior to the element being disabled, so
    // this is only needed for IFRAME submissions.
    var v = $.fieldValue(this.element);
    if (v !== null) {
      options.extraData[this.element.name] = v;
    }
  }

  // Disable the element that received the change to prevent user interface
  // interaction while the Ajax request is in progress. ajax.ajaxing prevents
  // the element from triggering a new request, but does not prevent the user
  // from changing its value.
  $(this.element).addClass('progress-disabled').attr('readonly', true);
  $(this.wrapper).find('input, select, textarea').addClass('progress-disabled').attr('readonly', true);
};

/**
 * Handler for the form redirection completion.
 */
Drupal.ajax.prototype.success = function (response, status) {
  // Remove the progress element.
  if (this.progress.element) {
    $(this.progress.element).remove();
  }
  if (this.progress.object) {
    this.progress.object.stopMonitoring();
  }
  $(this.element).removeClass('progress-disabled').removeAttr('readonly');
  $(this.wrapper).find('input, select, textarea').removeClass('progress-disabled').removeAttr('readonly');

  Drupal.freezeHeight();

  for (var i in response) {
    if (response[i]['command'] && this.commands[response[i]['command']]) {
      this.commands[response[i]['command']](this, response[i], status);
    }
  }

  // Reattach behaviors, if they were detached in beforeSerialize(). The
  // attachBehaviors() called on the new content from processing the response
  // commands is not sufficient, because behaviors from the entire form need
  // to be reattached.
  if (this.form) {
    var settings = this.settings || Drupal.settings;
    Drupal.attachBehaviors(this.form, settings);
  }

  Drupal.unfreezeHeight();

  // Remove any response-specific settings so they don't get used on the next
  // call by mistake.
  this.settings = null;
};


}