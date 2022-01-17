function wt(tsize, bsize, done) {
  var start = Date.now();
  s = writetest(tsize, bsize);
  s.addListener('close', function() {
    var end = Date.now();
    var diff = end - start;
    console.log('Wrote '+ tsize +' bytes in '+  diff/1000 +'s using '+ bsize +' byte buffers: '+  ((tsize/(diff/1000)) / 1048576) +' mB/s');
    done();
  });
}