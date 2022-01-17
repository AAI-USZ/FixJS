function() {
   stop();
   post('/view', {a:1}, function(data) {
       equal(data, '<div>1</div>', 'template rendered correctly');
       start();
   });
}