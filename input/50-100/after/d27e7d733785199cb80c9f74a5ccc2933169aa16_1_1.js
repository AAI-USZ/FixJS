function() {
      var select = "<select class=\"" + this.name +  '\" title="' + _(this.name) + '">',
      optionsLength = this.options.length,
      i;

      select.className = this.name;

      for (i = 0; i < optionsLength; i += 1){
        select += "<option value=\"" + this.options[i][0] + "\">" + this.options[i][1] + "</option>";
      }
      return select + "</select>";
    }