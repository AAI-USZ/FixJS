function Form (opts, $form) {
    var form = opts;

    form.$ = $form;
    form.handler = nw.forms.create(form.fields, form.validate);

    form.data = function (data) {
        if (data === undefined) {
            var values = {};
            $.each(form.$.serializeArray(), function (i, field) {
                values[field.name] = field.value;
            });
            return values;
        } else {
            $.each(data, function (name, value) {
                form.$.find('[name="'+name+'"]').val(value);
            });
        }
    };

    form.setErrors = function (report) {
        form.$.find('.error-help').remove();
        form.$.find('.control-group').removeClass('error');

        $.each(report.fieldErrors, function (i, fieldName) {
            var fieldErrors = report.fieldErrors[fieldName];
            var msg = nw.utils.capitalize(fieldErrors.join(', ')) + '.';
            var $control = form.$.find('[name="'+fieldName+'"]');
            var $controlGroup = $control.parents('.control-group');
            var $controls = $controlGroup.find('.controls');
            $controlGroup.addClass('error');
            $controls.append($('<p class="help-block error-help">'+msg+'</p>'));
        });

        // TODO: non field errors
    };

    return form;
}