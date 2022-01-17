function(spec) {

    spec = spec || {};
    spec.input_type = 'password';

    var that = IPA.text_widget(spec);
    return that;
}