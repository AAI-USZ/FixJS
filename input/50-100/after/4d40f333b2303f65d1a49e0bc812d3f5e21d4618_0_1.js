function(event) {
      var model = new models.Widget({ dashboard_id: this.model.id, kind: 'number' });
      var editor = new views.WidgetEditor.Number({ model: model });
      var dialog = new views.WidgetEditor({ editor: editor, model: model, dashboard: this.model, widgetCollection: this.collection });
      this.$("#widget-dialog").html(dialog.render().el);
      return false;
    }