function(attr) {
        return attr.key.indexOf('admin/') === 0 && attr.key.indexOf('admin/templates') !== 0;
      }