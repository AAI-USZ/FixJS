function (evt) {
        evt.preventDefault();
        var img = (evt.target.nodeName.toLowerCase() === 'img') ?
          $(evt.target) :
          $(evt.target).find('img');
        var value = img.attr('src');
        var elt = node.formElement || {};
        var prefix = elt.imagePrefix || '';
        var suffix = elt.imageSuffix || '';
        var width = elt.imageWidth || 32;
        var height = elt.imageHeight || 32;
        if (value) {
          if (value.indexOf(prefix) === 0) {
            value = value.substring(prefix.length);
          }
          value = value.substring(0, value.length - suffix.length);
          $(node.el).find('input').attr('value', value);
          $(node.el).find('a[data-toggle="dropdown"]')
            .addClass(elt.imageButtonClass)
            .attr('style', 'max-width:' + width + 'px;max-height:' + height + 'px')
            .html('<img src="' + (!value.match(/^https?:/) ? prefix : '') + value + suffix + '" alt="" />');
        }
        else {
          $(node.el).find('input').attr('value', '');
          $(node.el).find('a[data-toggle="dropdown"]')
            .removeClass(elt.imageButtonClass)
            .removeAttr('style')
            .html(elt.imageSelectorTitle || 'Select...');
        }
      }