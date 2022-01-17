function loadFromHash () {
    var hash = window.location.hash;
    if ( hash.length > 1 ) {
      hash = hash.substr(1);
      var selections = hash.split('-');
      // Unselect everything
      $('input[type="checkbox"]').removeAttr('checked');
      for(var i in selections) {
        if ( selections[i].match( /cssclassprefix/ ) ) {
          var cssclassprefix = selections[i].substr(15).replace(/\!/g,'-');
          $('#cssprefix').val(cssclassprefix);
        }
        else if (selections[i] == 'dontmin'){
          $('#dontmin').attr('checked', 'checked');
        }
        else {
          $('input[value="'+selections[i]+'"]').attr('checked', 'checked');
        }
      }
      var checked = $('#cssclasses input:checkbox').is(':checked');
      $('#cssprefixcontainer').toggle(checked);

      $('#generate').click();
    }
  }