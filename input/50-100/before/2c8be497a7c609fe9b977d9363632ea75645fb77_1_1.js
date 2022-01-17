function updateVolumeIcon() {
  var level = Math.floor(TT.getVolume()/25);
  level = Math.min(level, 3);
  level = Math.max(level, 0);
  $("#volume_icon").removeClass().addClass("mute_toggle left level_" + level);
}