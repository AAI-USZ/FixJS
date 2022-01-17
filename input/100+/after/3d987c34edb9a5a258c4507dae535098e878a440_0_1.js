function (_, Backbone, root, undef) {
    'use strict';
    var oldRender;

    oldRender = Backbone.Marionette.Renderer.render;
    Backbone.Marionette.Renderer.render = function (template, data) {
        if (_.isObject(template) && template.type === 'handlebars') {
            return template.template(data, template.options);
        }

        return oldRender(template, data);
    };

    return Backbone.Marionette;
}