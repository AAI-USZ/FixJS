function(manager, dirtyType) {
          var record = get(manager, 'record');
          if (dirtyType === 'created') {
            record.trigger('didCreate', record);
          } else {
            record.trigger('didUpdate', record);
          }
        }