function(event) {
      var model = new models.Widget({ dashboard_id: this.model.id, kind: 'graph', source: $.Sources.getDefaultTarget() });
      var editor = new views.WidgetEditor.Graph({ model: model });
      var dialog = new views.WidgetEditor({ editor: editor, model: model, dashboard: this.model, widgetCollection: this.collection });
      this.$("#widget-dialog").html(dialog.render().el);
      return false;
    }