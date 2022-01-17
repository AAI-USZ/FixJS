function ($) {
  $('#toggleCss, #toggleJs, #togglePlugins').change(function() {
    var $boxes = $(this).closest('.row').find('input[type=checkbox]').not($(this));
    if ($(this).is(':checked')) {
      $boxes.attr('checked', 'checked');
    } else {
      $boxes.removeAttr('checked');
    }
  });

  $('.color-picker').each(function() {
    var temp, pallete, bColor;

    bColor = borderColor($(this).val());
    console.log(bColor);
    pallete = $(this).closest('.row').find('.prefix');
    pallete.css('background-color', '#' + $(this).val());
    temp = pallete.colorcontrast('calculateYIQ', '#' + $(this).val());
    if (temp === 'light') {
      pallete.css({'border-color': bColor, 'color': '#555'});
    } else {
      pallete.css({'border-color': bColor, 'color': '#eee'});
    }
  });

  $('.color-picker').keyup(function() {
    var temp, pallete, bColor;

    bColor = borderColor($(this).val());
    pallete = $(this).closest('.row').find('.prefix');
    pallete.css('background-color', '#' + $(this).val());
    temp = pallete.colorcontrast('calculateYIQ', '#' + $(this).val());
    if (temp === 'dark') {
      pallete.css({'border-color': bColor, 'color': '#555'});
    } else {
      pallete.css({'border-color': bColor, 'color': '#eee'});
    }
  });

  $("#columnCount, #columnGutter, #rowWidth, #maxWidth, #baseFontSize, #importantNumber, #baseButtonRadius, #baseButtonSize").keydown(function(event) {
    if(event.shiftKey)
      event.preventDefault();
    if (event.keyCode == 46 || event.keyCode == 8) {
    } else {
      if (event.keyCode < 95) {
        if (event.keyCode < 48 || event.keyCode > 57) {
          event.preventDefault();
        }
      } else {
        if (event.keyCode < 96 || event.keyCode > 105) {
          event.preventDefault();
        }
      }
    }
  });
}