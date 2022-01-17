function() {
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
  }