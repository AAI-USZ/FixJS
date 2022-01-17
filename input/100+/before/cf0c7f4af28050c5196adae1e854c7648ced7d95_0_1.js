function (v, k) {
          if (!_.isEqual(v, old_obj[k]))
            set[k] = v;
        }