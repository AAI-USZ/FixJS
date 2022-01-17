function(res){
    fn(null, res);
  }).on('error', function(error) { console.log('calling del file cb'); fn(error); }