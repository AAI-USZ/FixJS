function callHome() {
    var data = {getBlocks: {}};
    var counter = 0;
    var elems = placeholderElems();

    elems.each(function(el) {
      el = isJQ ? jQuery(this) : $(el);
      var id = isJQ ? el.attr('id') : el.readAttribute('id');
      if (!id) {
        // create dynamic id
        id = 'ph_' + counter;
        if (isJQ) {
          el.attr('id', id)
        } else {
          el.writeAttribute('id', id);
        }
      }
      var rel = isJQ ? el.attr('rel') : el.readAttribute('rel');
      if (rel) {
        data.getBlocks[id] = rel;
        counter++;
      }
    });

    // add current product
    if (typeof CURRENTPRODUCTID !== 'undefined' && CURRENTPRODUCTID) {
      data.currentProductId = CURRENTPRODUCTID;
    }

    if (typeof data.currentProductId !== 'undefined' || counter > 0) {
      if (isJQ) {
        jQuery.get(AJAXHOME_URL, data, updateBlocks, 'json');
      } else {
        $H(data.getBlocks).each(function(block) {
          data['getBlocks[' + block[0] + ']'] = block[1];
        });
        new Ajax.Request(AJAXHOME_URL, {
          method: 'get',
          parameters: data,
          onSuccess: updateBlocks 
        });
      }
    }
  }