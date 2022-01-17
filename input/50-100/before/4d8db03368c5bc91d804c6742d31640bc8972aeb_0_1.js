function(count, path) {
  console.log(count);
  if (count <= 0) {
    newPlay.redirectToMap(path);
   }
   else {
    $('.redirect-countdown').text(count);
    setTimeout('newPlay.redirectToMapCountdown(' + count + ')', 1000);
    count--;
   }
}