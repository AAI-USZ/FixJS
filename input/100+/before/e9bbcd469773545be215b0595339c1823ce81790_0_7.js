function(ids) {
              if (!$.isArray(ids)) return [that.getItem(ids)];
              return $.map(ids, function(id, idx) {
                return that.getItem(id);
              });
            }