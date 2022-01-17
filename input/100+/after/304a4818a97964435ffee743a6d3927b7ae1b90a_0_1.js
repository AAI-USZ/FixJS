function(el) {
      el = isJQ ? jQuery(this) : $(el);
      var id = isJQ ? el.attr('id') : el.readAttribute('id');
      if (!id) {
        // create dynamic id
        id = 'ph_' + counter;
        if (isJQ) {
          el.attr('id', id);
        } else {
          el.writeAttribute('id', id);
        }
      }
      var rel = isJQ ? el.attr('rel') : el.readAttribute('rel');
      if (rel) {
        data.getBlocks[id] = rel;
        counter++;
      }
    }