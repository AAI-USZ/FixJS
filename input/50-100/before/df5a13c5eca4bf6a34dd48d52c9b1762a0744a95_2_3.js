function() {
        var template = horizon.templates.compiled_templates["#spinner-modal"];
        horizon.modals.spinner = $(template.render());

        horizon.modals.spinner.appendTo("div.modal_wrapper");
        horizon.modals.spinner.modal({backdrop: 'static'});
        horizon.modals.spinner.spin(horizon.conf.spinner_options.modal);
      }