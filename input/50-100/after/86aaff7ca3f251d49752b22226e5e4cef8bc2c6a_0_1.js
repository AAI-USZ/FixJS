function(urls) {
  mongoose.connectSet(urls.join(','), function(error) {
    if (error) {
      console.log('Error:Couldnt connect', error);
      setTimeout(function() {
        exports.connectSet(urls);

      }, 2000);
    } else {
      
    }
  });
  exports.connection = mongoose.connection;
  createModel();
}