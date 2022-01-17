function(){
      if (bw.opera) {
        $(this).removeClass('decorated');
        return;
      }

      var title = $('option', this).first().text();
      if ($('option:selected', this).val() != '')
        title = $('option:selected', this).text();

      var select = $(this)
        .change(function(){
          var val = $('option:selected', this).text();
          $(this).next().children().html(val);
        });

      $('<a class="menuselector dropdownselector"><span class="handle">' + title + '</span></a>')
        .css('position', 'absolute')
        .offset(select.position())
        .insertAfter(select)
        .children().width(select.outerWidth() - 40);

      select.parent().css('position', 'relative');
    }