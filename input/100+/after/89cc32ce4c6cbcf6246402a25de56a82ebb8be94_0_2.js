function setColor($this) {
  var temp, pallete, bColor, val;

  val = $this.val();
  if (val.length > 0) {
    bColor = borderColor(val);
    pallete = $this.closest('.row').find('.prefix');
    pallete.css('background-color', '#' + val);
    temp = pallete.colorcontrast('calculateYIQ', '#' + val);
    if (temp === 'light') {
      pallete.css({'border-color': bColor, 'color': '#555'});
    } else {
      pallete.css({'border-color': bColor, 'color': '#eee'});
    }
  }
}