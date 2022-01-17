function() {
        var agree = confirm(option_tree.activate_layout_agree);
        if (agree) {
          $('#option-tree-options-layouts-form').submit();
        } else {
          var active = $('#the_current_layout').attr('value');
          $('#option-tree-options-layouts-form select option[value="' + active + '"]').attr({'selected':'selected'});
          $('#option-tree-options-layouts-form select').prev('span').replaceWith('<span>' + active + '</span>');
        }
      }