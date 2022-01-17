function addDefaultBubble(bubbles) {
		var user = getDefaultBubbleName(); 
		var torrents = [
			{
				uri: 'magnet:?xt=urn:btih:a92308e3d21698b7efbd6f0c1024bbfc1ab69c0e&dn=80 Proof Bit Edition&tr=http://bt.rghost.net/announce&tr=http://exodus.desync.com/announce&tr=http://tracker.ccc.de/announce&tr=http://tracker.publichd.eu/announce&tr=http://tracker.torrentbay.to:6969/announce&tr=http://tracker.yify-torrents.com/announce&tr=udp://ipv4.tracker.harry.lu:80/announce&tr=udp://tracker.ccc.de/announce&tr=udp://tracker.ccc.de:80/announce&tr=udp://tracker.djhsearch.co.cc:80/announce&tr=udp://tracker.publicbt.com:80/announce',
				hash: 'a92308e3d21698b7efbd6f0c1024bbfc1ab69c0e',
				name: '80 Proof - BitTorrent Edition',
				size: 300145610
			},
			{
				uri: 'magnet:?xt=urn:btih:2110C7B4FA045F62D33DD0E01DD6F5BC15902179&dn=CountingCrows-BitTorrent&tr=http://bt.rghost.net/announce&tr=http://exodus.desync.com/announce&tr=http://tracker.ccc.de/announce&tr=http://tracker.publichd.eu/announce&tr=http://tracker.torrentbay.to:6969/announce&tr=http://tracker.yify-torrents.com/announce&tr=udp://ipv4.tracker.harry.lu:80/announce&tr=udp://tracker.ccc.de/announce&tr=udp://tracker.ccc.de:80/announce&tr=udp://tracker.djhsearch.co.cc:80/announce&tr=udp://tracker.publicbt.com:80/announce',
				hash: '2110C7B4FA045F62D33DD0E01DD6F5BC15902179',
				name: 'CountingCrows-BitTorrent', 
				size: 29661352
			},
			{
				uri: 'magnet:?xt=urn:btih:F094C7473B68ED9777C7331B785586CCDD5301C7&dn=DeathGrips-BitTorrent&tr=http://bt.rghost.net/announce&tr=http://exodus.desync.com/announce&tr=http://tracker.ccc.de/announce&tr=http://tracker.publichd.eu/announce&tr=http://tracker.torrentbay.to:6969/announce&tr=http://tracker.yify-torrents.com/announce&tr=udp://ipv4.tracker.harry.lu:80/announce&tr=udp://tracker.ccc.de/announce&tr=udp://tracker.ccc.de:80/announce&tr=udp://tracker.djhsearch.co.cc:80/announce&tr=udp://tracker.publicbt.com:80/announce',
				hash: 'F094C7473B68ED9777C7331B785586CCDD5301C7',
				name: 'DeathGrips-BitTorrent', 
				size: 633972503
			},
			{
				uri: 'magnet:?xt=urn:btih:EE3EB1ACEC1DC7ADC73EDA16D05A495BEA1DD4BE&dn=PrettyLights-Bittorrent&tr=http://bt.rghost.net/announce&tr=http://exodus.desync.com/announce&tr=http://tracker.ccc.de/announce&tr=http://tracker.publichd.eu/announce&tr=http://tracker.torrentbay.to:6969/announce&tr=http://tracker.yify-torrents.com/announce&tr=udp://ipv4.tracker.harry.lu:80/announce&tr=udp://tracker.ccc.de/announce&tr=udp://tracker.ccc.de:80/announce&tr=udp://tracker.djhsearch.co.cc:80/announce&tr=udp://tracker.publicbt.com:80/announce',
				hash: 'EE3EB1ACEC1DC7ADC73EDA16D05A495BEA1DD4BE',
				name: 'PrettyLights-BT', 
				size: 383133030
			}
		];
		var bubble = new Bubble({
			id: 'default',
			title: getDefaultBubbleName() + ' is here to get you started. He tends to really enjoy BitTorrent Featured Artists. Unlike your other PaddleOver friends, you won\'t be able to delete ' + getDefaultBubbleName() + '\'s content.',
			btapp: new Backbone.Model({
				torrent: new Backbone.Collection()
			}),
			label: user,
			position: bubbles.length,
			draggable: true
		});
		_.defer(_.bind(bubble.btapp.trigger, bubble.btapp, 'client:connected'));
		_.each(torrents, function(torrent) {
			var name = torrent.name;
			var uri = torrent.uri;
			var size = torrent.size;
			var hash = torrent.hash;
			bubble.btapp.get('torrent').add(
				new Backbone.Model({
					id: hash,
					properties: new Backbone.Model({
						uri: uri,
						added_on: (new Date()).getTime() / 1000,
						name: name,
						size: size,
						progress: 1000
					})
				})
			);
		});
		bubbles.add(bubble);
		bubble.trigger('hide');
	}