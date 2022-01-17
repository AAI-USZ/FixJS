function(task) {
        return app.vent.trigger('task:clicked', task.id);
      }