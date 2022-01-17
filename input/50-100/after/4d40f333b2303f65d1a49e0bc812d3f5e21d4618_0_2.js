function(event) {
      var model = new models.Widget({ dashboard_id: this.model.id, kind: 'boolean' });
      var editor = new views.WidgetEditor.Boolean({ model: model });
      var dialog = new views.WidgetEditor({ editor: editor, model: model, dashboard: this.model, widgetCollection: this.collection });
      this.$("#widget-dialog").html(dialog.render().el);
      return false;
    }