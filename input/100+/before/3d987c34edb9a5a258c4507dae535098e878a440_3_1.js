function (_, Backbone, root, undef) {
    'use strict';     
    var oldGetTemplateSelector, oldTemplateCacheGet, oldRenderTemplate;

    oldGetTemplateSelector = Backbone.Marionette.View.prototype.getTemplateSelector;
    Backbone.Marionette.View.prototype.getTemplateSelector = function () {
        var template;

        // Get the template from `this.options.template` or
        // `this.template`. The `options` takes precedence.
        if (this.options && this.options.template) {
            template = this.options.template;
        } else {
            template = this.template;
        }

        // check if it's a handlebars template
        if (_.isObject(template) && template.type === 'handlebars') {
            return template;
        }

        return _.bind(oldGetTemplateSelector, this)();
    };

    oldTemplateCacheGet = Backbone.Marionette.TemplateCache.get;
    Backbone.Marionette.TemplateCache.get = function (template) {
        // check if it's a handlebars template
        if (_.isObject(template) && template.type === 'handlebars') {
            return template;
        }

        return _.bind(oldTemplateCacheGet, this)(template);
    };

    oldRenderTemplate = Backbone.Marionette.Renderer.renderTemplate;
    Backbone.Marionette.Renderer.renderTemplate = function (template, data) {
        if (template !== null) {
            return template.template(data, template.options);
        }
    };

    return Backbone.Marionette;
}