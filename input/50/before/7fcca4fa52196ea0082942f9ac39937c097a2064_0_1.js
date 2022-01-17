function(spec) {

    spec = spec || {};
    spec.type = 'password';

    var that = IPA.text_widget(spec);
    return that;
}