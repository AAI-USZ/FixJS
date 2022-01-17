function() {

		var errorCode = 6029;

		var view = h5.core.view;

		h5.core.view = null;

		var controller = {

			__name: 'TestController',

			__templates: ['./template/test2.ejs']

		};

		try {

			h5.core.controller('#controllerTest', controller);

			ok(false, 'エラーが起きていません');

		} catch (e) {

			deepEqual(e.code, errorCode, e.message);

		}

		h5.core.view = view;

	}