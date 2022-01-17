function (evt) {
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
  }