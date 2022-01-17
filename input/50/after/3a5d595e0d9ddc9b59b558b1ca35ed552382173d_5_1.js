f		dht.start();
		//var id = DHT.util.hex2buf("640FE84C613C17F663551D218689A64E8AEBEABE");
		//console.log("torrent infohash id", id);
		 dht.bootstrap([ { 'address': dnsResolve.address, 'port': 6881 } ], function(){
		//dht.bootstrap([ { 'address': '127.0.0.1', 'port': 3007 } ], function(){
		})
	})	
