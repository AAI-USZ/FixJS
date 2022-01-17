function(toolboxState) {
    PM.load_templates();
    PM.add_address_listener();
    $('head').append('<link rel="stylesheet" href="' + toolboxState.pmt.path +
                     + '/toolbox/css/policymodelling/style.css" type="text/css" />');

    // Forces update.
    $.address.update();
}