function (key, inp) {
      var ret = '';
      ret+= '<div class="control-group' + (errs[key]?' error':'') + '">';
      ret+= '<label class="control-label" for=' + id(key) + '>';
      ret+= utile.inflect.titleize(key) + '</label><div class="controls">';
      ret+= inp + (errs[key]?'<span class="help-inline">' + errs[key] + '</span>':'');
      ret+= '</div></div>';
      return ret;
    }