function(manager, dirtyType) {
          var record = get(manager, 'record');
          if (dirtyType === 'created') {
            record.fire('didCreate', record);
          } else {
            record.fire('didUpdate', record);
          }
        }