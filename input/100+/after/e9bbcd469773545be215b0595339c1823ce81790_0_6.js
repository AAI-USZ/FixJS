function() {
            var i;
            if (recalc_items) {
              items_list = [];
              for (i in items) {
                if (typeof i === "string" && items[i] === true) items_list.push(i);
              }
            }
            return items_list;
          }