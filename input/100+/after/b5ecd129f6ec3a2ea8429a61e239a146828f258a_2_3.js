function() {
  // Bind handler for initializing new modals.
  $('#modal_wrapper').on('new_modal', function (evt, modal) {
    horizon.modals.initModal(modal);
  });

  // Bind "cancel" button handler.
  $(document).on('click', '.modal .cancel', function (evt) {
    $(this).closest('.modal').modal('hide');
    evt.preventDefault();
  });

  // AJAX form submissions from modals. Makes validation happen in-modal.
  $(document).on('submit', '.modal form', function (evt) {
    var $form = $(this),
        $button = $form.find(".modal-footer .btn-primary"),
        update_field_id = $form.attr("data-add-to-field"),
        headers = {};
    if ($form.attr("enctype") === "multipart/form-data") {
      // AJAX-upload for files is not currently supported.
      return;
    }
    evt.preventDefault();

    // Prevent duplicate form POSTs
    $button.prop("disabled", true);

    if (update_field_id) {
      headers["X-Horizon-Add-To-Field"] = update_field_id;
    }

    $.ajax({
      type: "POST",
      url: $form.attr('action'),
      headers: headers,
      data: $form.serialize(),
      beforeSend: function () {
        $("#modal_wrapper .modal").last().modal("hide");
        horizon.modals.modal_spinner("Working");
      },
      complete: function () {
        horizon.modals.spinner.modal('hide');
        $("#modal_wrapper .modal").last().modal("show");
        $button.prop("disabled", false);
      },
      success: function (data, textStatus, jqXHR) {
        var redirect_header = jqXHR.getResponseHeader("X-Horizon-Location"),
            add_to_field_header = jqXHR.getResponseHeader("X-Horizon-Add-To-Field"),
            json_data, field_to_update;
        $form.closest(".modal").modal("hide");
        if (redirect_header) {
          location.href = redirect_header;
        }
        else if (add_to_field_header) {
          json_data = $.parseJSON(data);
          field_to_update = $("#" + add_to_field_header);
          field_to_update.append("<option value='" + json_data[0] + "'>" + json_data[1] + "</option>");
          field_to_update.val(json_data[0]);
        } else {
          horizon.modals.success(data, textStatus, jqXHR);
        }
      },
      error: function (jqXHR, status, errorThrown) {
        $form.closest(".modal").modal("hide");
        horizon.alert("error", "There was an error submitting the form. Please try again.");
      }
    });
  });

  // Position modal so it's in-view even when scrolled down.
  $(document).on('show', '.modal', function (evt) {
    // Filter out indirect triggers of "show" from (for example) tabs.
    if ($(evt.target).hasClass("modal")) {
      var scrollShift = $('body').scrollTop(),
          $this = $(this),
          topVal = $this.css('top');
      $this.css('top', scrollShift + parseInt(topVal, 10));
    }
  });

  // Focus the first usable form field in the modal for accessibility.
  horizon.modals.addModalInitFunction(function (modal) {
    $(modal).find(":text, select, textarea").filter(":visible:first").focus();
  });

  horizon.modals.addModalInitFunction(horizon.datatables.validate_button);

  // Load modals for ajax-modal links.
  $(document).on('click', '.ajax-modal', function (evt) {
    var $this = $(this);

    // If there's an existing modal request open, cancel it out.
    if (horizon.modals._request && typeof(horizon.modals._request.abort) !== undefined) {
      horizon.modals._request.abort();
    }

    horizon.modals._request = $.ajax($this.attr('href'), {
      beforeSend: function () {
        horizon.modals.modal_spinner("Loading");
      },
      complete: function () {
        // Clear the global storage;
        horizon.modals._request = null;
        horizon.modals.spinner.modal('hide');
      },
      error: function(jqXHR, status, errorThrown) {
        if (jqXHR.status === 401){
          var redir_url = jqXHR.getResponseHeader("X-Horizon-Location");
          if (redir_url){
            location.href = redir_url;
          } else {
            location.reload(true);
          }
        }
        else {
          if (!horizon.ajax.get_messages(jqXHR)) {
            // Generic error handler. Really generic.
            horizon.alert("error", "An error occurred. Please try again.");
          }
        }
      },
      success: function (data, textStatus, jqXHR) {
        var update_field_id = $this.attr('data-add-to-field'),
            modal, form;
        modal = horizon.modals.success(data, textStatus, jqXHR);
        if (update_field_id) {
          form = modal.find("form");
          if (form.length) {
            form.attr("data-add-to-field", update_field_id);
          }
        }
      }
    });
    evt.preventDefault();
  });


  /* Manage the modal "stack" */

  // When a new modal is opened, hide any that are already in the stack.
  $(document).on("show", ".modal", function () {
    var container = $("#modal_wrapper"),
        modal_stack = container.find(".modal"),
        $this = $(this);
      modal_stack.splice(modal_stack.length - 1, 1);
      modal_stack.modal("hide");
  });

  // After a modal has been fully hidden, remove it to avoid confusion.
  // Note: the modal should only be removed if it is the "top" of the stack of
  // modals, e.g. it's the one currently being interacted with and isn't just
  // temporarily being hidden.
  $(document).on('hidden', '.modal', function () {
    var $this = $(this),
        modal_stack = $("#modal_wrapper .modal");
    if ($this[0] == modal_stack.last()[0] || $this.hasClass("loading")) {
      $this.remove();
      if (!$this.hasClass("loading")) {
        $("#modal_wrapper .modal").last().modal("show");
      }
    }
  });
}