function(event) {
      var widget = new models.Widget({ dashboard_id: this.model.id, kind: 'boolean' });
      var dialog = new views.WidgetEditor.Boolean({ model: widget, dashboard: this.model, widgetCollection: this.collection });
      this.$("#widget-dialog").html(dialog.render().el);
      return false;
    }