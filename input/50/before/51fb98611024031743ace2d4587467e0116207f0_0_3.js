function(res){
    fn(null, res);
  }).on('error', function(error) { console.error('calling del file cb'); fn(error); }