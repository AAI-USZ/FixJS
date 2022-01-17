function(Settings) {



	var Core = null;

	module("Settings Tests",{

		setup : function(){

			Core = testr('_core');

		}

	});

	



	

	test('basic settings usage', function(){

		var settings = new Core.Settings();

		settings.load({

			key1 : "value1",

			key2 : {key2_1 : "value2.1",},

		});

		

		equal(settings.items()['key1'], "value1");

		equal(settings.items().key1, "value1");

		

		equal(settings.items().key2.key2_1, "value2.1");

		equal(settings.items()['key2']['key2_1'], "value2.1");

	});

	

	

	test('chained settings usage', function(){

		var baseSettings = new Core.Settings();

		baseSettings.load({

			key1 : "value1",

			key2 : {key2_1 : "value2.1",},

		});

		

		var settings = new Core.Settings(baseSettings);

		settings.load({

			key1 : "valueOverwriten",

			key3 : "value3",

		});

		

		equal(settings.items()['key1'], "valueOverwriten");

		equal(settings.items().key2.key2_1, "value2.1");

		equal(settings.items().key3, "value3");

		

		settings.chainSettings(false);

		equal(settings.items()['key2'], undefined);

	});

	

}