function(version) {
	this.init();
	this.version = version;

	this._url = get_url_parameters(location.search);

	this.track_stat = (function(){
		window._gaq = [];
		_gaq.sV = debounce(function(v){
			suStore('ga_store', v, true);
		},130);
		_gaq.gV = function(){
			return suStore('ga_store');
		};
		/*
		_gaq.push(['myTracker._setAccount', 'UA-XXXXX-X']);

		_gaq.push(function() {
			var pageTracker = _gat._getTrackerByName('myTracker');
			var link = document.getElementById('my-link-id');
			link.href = pageTracker._getLinkerUrl('http://example.com/');
		});
		http://code.google.com/apis/analytics/docs/tracking/asyncUsageGuide.html
		*/

		suReady(function(){
			yepnope( {
				load: 'http://seesu.me/st/ga.mod.min.js',
				complete: function(){
					_gaq.push(['_setAccount', 'UA-17915703-1']);
					_gaq.push(['_setCustomVar', 1, 'environmental', (!app_env.unknown_app ? app_env.app_type : 'unknown_app'), 1]);
					_gaq.push(['_setCustomVar', 2, 'version', version, 1]);
				}
			});
		});
		return function(data_array){
			_gaq.push(data_array);
		};
	})();

	var lu = suStore('su-usage-last');

	this.last_usage = (lu && new Date(lu)) || 0;
	this.usage_counter = parseFloat(suStore('su-usage-counter')) || 0;
	
	var _this = this;
	setInterval(function(){

		var now = new Date();

		if (_this.ui){
			if (_this.ui.isAlive() || (now - _this.ui.created_at)/(1000*60) > 40){
				if ((now - _this.last_usage)/ (1000 * 60 * 60) > 4){
					_this.checkStats();
					suStore('su-usage-last', (_this.last_usage = new Date()).toUTCString(), true);
					suStore('su-usage-counter', ++_this.usage_counter, true);
				}
			}
		}

		
	}, 1000 * 60 * 20);


	this.popular_artists = ["The Beatles", "Radiohead", "Muse", "Lady Gaga", "Eminem", "Coldplay", "Red Hot Chili Peppers", "Arcade Fire", "Metallica", "Katy Perry", "Linkin Park" ];
	this.vk = {};

	this.notf = new gMessagesStore(
		function(value) {
			return suStore('notification', value, true);
		}, 
		function() {
			return suStore('notification');
		}
	);
	this.main_level = new mainLevel();
	this.map = (new browseMap(this.main_level)).makeMainLevel();

	if (app_env.chrome_extension){
		this.main_level.getFreeView("chrome_ext");
	} else if (app_env.opera_extension && window.opera_extension_button){
		this.opera_ext_b = opera_extension_button;
		this.main_level.getFreeView("opera_ext");
	}
	

	this.map.on('map-tree-change', function(nav_tree) {
		_this.main_level.changeNavTree(nav_tree);
	});

//	this.ui = new seesu_ui(document);
	this.soundcloud_queue = new funcsQueue(1000, 5000 , 7);
	this.delayed_search = {
		vk_api:{
			queue:  new funcsQueue(1000, 8000 , 7)
		}
	};



	this.s  = new seesuServerAPI(suStore('dg_auth'), this.server_url);
	this.on('vk-api', function(vkapi, user_id) {
		var _this = this;
		vkapi.get('getProfiles', {
			uids: user_id,
			fields: 'uid, first_name, last_name, domain, sex, city, country, timezone, photo, photo_medium, photo_big'
			
		},{nocache: true})
			.done(function(info) {
				info = info.response && info.response[0];
				if (info){
					_this.s.vk_id = user_id;

					var _d = cloneObj({data_source: 'vkontakte'}, info);

					_this.s.setInfo('vk', _d);

					if (!_this.s.loggedIn()){
						_this.s.getAuth(user_id);
					} else{
						_this.s.api('user.update', _d);
					}
				} else {
					
				}
			})
			.fail(function(r) {
				
			});
	});


	this.views = new views(this.map);


	this.onRegistration('dom', function(cb) {
		if (this.ui && this.ui.can_fire_on_domreg){
			cb();
		}	
	});
	this.mp3_search = (new mp3Search({
		vk: 5,
		exfm: 0,
		soundcloud: -5,
		lastfm:-10,
		torrents: -15
	}));
	/*
		.on('new-search', function(search, name){
			var player = _this.p;
			if (player){
				if (player.c_song){
					if (player.c_song.sem){
						_this.mp3_search.searchFor(player.c_song.sem.query);
					}
					
					if (player.c_song.next_preload_song && player.c_song.next_preload_song.sem){
						_this.mp3_search.searchFor(player.c_song.next_preload_song.sem.query);
					}
				}
				//fixme
				if (player.v_song && player.v_song != player.c_song ){
					if (player.v_song.sem){
						_this.mp3_search.searchFor(player.v_song.sem.query);
					}
					
				}
			}
		});*/


}