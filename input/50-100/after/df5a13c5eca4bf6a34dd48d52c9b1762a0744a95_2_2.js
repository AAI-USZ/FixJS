function (text) {
  // Adds a spinner with the desired text in a modal window.
  var template = horizon.templates.compiled_templates["#spinner-modal"];
  horizon.modals.spinner = $(template.render({text: text}));
  horizon.modals.spinner.appendTo("#modal_wrapper");
  horizon.modals.spinner.modal({backdrop: 'static'});
  horizon.modals.spinner.spin(horizon.conf.spinner_options.modal);
}