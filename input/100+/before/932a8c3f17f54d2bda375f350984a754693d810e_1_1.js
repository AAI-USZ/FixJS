function() {

			module("Global Router Test", {

				setup : function() {

					var Core = testr('_core');

					this.testRouter = new Core.Router();

				}

			});

			// Testing init method

			test("Global router init",function() {

						ok(this.testRouter.getNativeRouter(),

								"crossroads.create() method called, New router instance created");



						this.testRouter.init();



						ok(hasher.isActive(),

								"hasher.init() method called, Hasher initiated");

					});

			// Testing addRoute method

			test("Global router addRoute", function() {

				var spy = sinon.spy();

				this.testRouter.addRoute('appAPath1/{id}', spy);

				ok(true, "Global router addRoute method called");

				ok(this.testRouter.getNativeRouter().getNumRoutes() === 1,

						"Single route has been added to the Router");

			});

			// Testing getNativeRouter method

			test("Global router getNativeRouter", function() {

				var spy = sinon.spy();

				if (tNativeRouter = this.testRouter.getNativeRouter()) {

					spy();

				}

				ok(spy.called, "Method called & Object returned");

			});

		}