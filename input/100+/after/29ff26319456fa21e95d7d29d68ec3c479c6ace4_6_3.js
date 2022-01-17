function(model) {
          if (last) {
            last.set('nextId', model.id);
            last.save({}, { wait: true });
          }
        }