function(newalt, updateslider) {
  if (updateslider) {
    mmap.altSlider.value = newalt;
  }
  mmap._alt = newalt;
    $('#v_altwaypt').html(newalt.toString());
}