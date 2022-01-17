function(attr) {
        var matches;
        matches = attr.key.indexOf('admin/') === 0 && attr.key.indexOf('admin/templates') !== 0;
        if (matches) console.log(attr.key, 'matches');
        return matches;
      }