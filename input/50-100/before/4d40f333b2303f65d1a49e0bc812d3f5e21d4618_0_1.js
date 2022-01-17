function(event) {
      var widget = new models.Widget({ dashboard_id: this.model.id, kind: 'number' });
      var dialog = new views.WidgetEditor.Number({ model: widget, dashboard: this.model, widgetCollection: this.collection });
      this.$("#widget-dialog").html(dialog.render().el);
      return false;
    }