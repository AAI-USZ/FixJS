function (data, textStatus, jqXHR) {
        // TODO(gabriel): This isn't a long-term solution for AJAX redirects.
        // https://blueprints.launchpad.net/horizon/+spec/global-ajax-communication
        var header = jqXHR.getResponseHeader("X-Horizon-Location");
        if (header) {
          location.href = header;
        }
        $form.closest(".modal").modal("hide");
        horizon.modals.success(data, textStatus, jqXHR);
      }