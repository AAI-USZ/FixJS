function () {

	this.data = [

		'Browse',

		'Downloads',

		'Player',

		'Settings',

	];

	

	var listdata = [];

	for (var i = 0; i < this.data.length; i++) {

		listdata.push(this.data[i]);

	}

	

	$('#scene_list').sfList({

		data: listdata,

		index: 0,

		itemsPerPage: this.items_per_page

	});

	

	$('#label').sfLabel({

		text: 'Swift P2P TV'

	});

	$('#label_video').sfLabel({text: ""});

	

	$('#label').sfLabel('hide');

	$('#label_video').sfLabel('hide');

	

	$('#background_image').sfImage({src:'images/logobg22.png'});

	

	$('#app_layout').sfBackground({

		light: false,

		column: null,

		columnShadow: true,

		columnSize: 350

	});

	

	this.defaultOpts = {

		light: false,

		column: null,

		columnShadow: true,

		columnSize: 350 / 720 * curWidget.height

	}

	

	this.methods = [{

			title: 'getAvailableNetworks',

			func: function(){

				try {

					var err = deviceapis.network.getAvailableNetworks(function(pReturn){

						var retValue = pReturn;

						

						if(retValue[getActiveIndex(retValue)]) {					

							tv_url = "http://" + retValue[getActiveIndex(retValue)].ip + ":1337";

						}

					}, function(code){alert("getAvailableNetworks returns " + code);});

				}

				catch (err) {

					alert("getAvailableNetworks returns " + err);

				}

			}

		}

	];

	

	function getActiveIndex( pNetList ) {

		for( var i = 0; i < pNetList.length; i++ ) {

			if( pNetList[i].isActive() ) {

				return i;

			}

		}

	}

	

	var method = this.methods[0];

	if(method && method.func) {

			method.func();

	}

}