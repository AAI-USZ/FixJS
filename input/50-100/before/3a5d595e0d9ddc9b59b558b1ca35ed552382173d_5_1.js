function(DHT, dgram){
	console.log("dgram", dgram)
	
	var dht = new DHT.DHT(51414);
	console.log("dht", dht);
	chrome.experimental.dns.resolve('router.bittorrent.com', function(){
		console.log(arguments)
	})	
}