function updateThreshold() {
  // calculate optimal threshold
  kiji.threshold = 6.0 / kiji.zoom;
//  if (kiji.threshold < 4)
//    kiji.threshold = 4;
  console.log('zoom='+kiji.zoom+' threshold='+kiji.threshold);
  document.getElementById('thr').innerHTML = 'Z:'+kiji.zoom.toFixed(2)+' T:'+kiji.threshold.toFixed(2);
}