function (data, textStatus, jqXHR) {
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
      }