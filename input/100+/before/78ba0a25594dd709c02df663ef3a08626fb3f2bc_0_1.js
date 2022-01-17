function(app, db, passport) {

	/*

	 * GET /

	 */

	app.get('/', function(req, res) {

		var data = {

			title: 'inForm',

			user: req.user

		};

		res.render('index', data);

	});



	/*

	 * GET /login

	 */

	app.get('/login',	function(req, res) {

		var data = {

			title: 'Login',

			user: req.user,

			message: req.flash('error')

		};

		res.render('login', data);

	});



	/*

	 * POST /login

	 */

	app.post('/login',

		passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),

		function(req, res) {

			res.redirect('/');

		});



	/*

	 * GET /logout

	 */

	app.get('/logout', function(req, res) {

		req.logout();

		res.redirect('/');

	});



	/*

	 * GET /feeds

	 */

	app.get('/feeds', ensureAuthenticated, function(req, res) {

		// Get all feeds

		db.collection('feeds', function(err, feeds) {

			feeds.find().limit(20).toArray(function(err, feedList) {

				console.log(feedList);

				var data = {

					title: 'Feeds',

					user: req.user,

					feeds: feedList

				};

				res.render('all_feeds', data);

			});

		});

	});



	/*

	 * GET /add-feed

	 */

	app.get('/add-feed', ensureAuthenticated, function(req, res) {

		var data = {

			title: 'Feed hinzufügen',

			user: req.user

		};

		res.render('add_feed', data);

	});



	/*

	 * GET /feeds/:id

	 */

	app.get('/feeds/:id', function(req, res) {

		var data = {

			title: 'Artikel',

			user: req.user,

			articles: [



			]

		};

		// Render the template

		res.render('all_articles', data);

	});



	/*

	 * GET /articles/:id

	 */

	app.get('/articles/:id', function(req, res) {

		var data = {

			title: 'Artikel',

			user: req.user

		};

		res.render('article', data);

	});





	/*

	 * GET /reset_db

	 */

	app.get('/reset_db', function(req, res) {

		db.dropDatabase(function(err, result) {



			db.collection('feeds', function(err, feeds) {

				db.collection('articles', function(err, articles) {

					articles.insert([{

							title: 'Test 1',

							text: 'DSLR anim dreamcatcher sint dumpster incididunt. Yr chillwave DSLR street-art letterpress gentrify liberal. Farm-to-table bronson organic narwhal ethical clothesline. Frado authentic gastropub art frado kale brooklyn. Placeat authentic gluten fin liberal 8-bit.',

							published_at: new Date(2012, 2, 31),

							image: '/images/test.jpg'

						}, {

							title: 'Test 2',

							text: 'Before 8-bit brooklyn frado trust-fund ut. Chillwave capitalism placeat vegan. Anderson moon fin totally chowder original. The sunt dumpster dumpster voluptate chowder.',

							published_at: new Date(2012, 5, 16),

							image: '/images/test.jpg'

						}, {

							title: 'Test 3',

							text: 'Clothesline esse sriracha gluten-free farm-to-table Pinterest. Carles street-art anim anime wes. Capitalism vegan gluten-free farm-to-table wayfarers gluten-free. Sint organic chowder street-art 8-bit anim of party. Narwhal of fresh twee. Viral vegan Anderson pony Anderson.',

							published_at: new Date(2012, 3, 1),

							image: '/images/test.jpg'

						}]);

					var articleList = articles.find({}, ['_id']).toArray(function(err, articleList) {

						console.log(articleList);

						feeds.save({

							name: 'Smashing Magazine',

							image_path: undefined,

							feed_url: 'http://rss1.smashingmagazine.com/feed/',

							articles: articleList

						});

					});

				});

			});

			db.collection('users', function(err, users) {

				//users.insert([]);

				users.save({

					email: 'jannes.meyer@gmail.com',

					name: 'Jannes Meyer',

					password: sha1('test'),

					feeds: []

				});

				users.save({

					email: 'fuhlig@gmail.com',

					name: 'Florian Uhlig',

					password: sha1('test'),

					feeds: []

				});

				users.save({

					email: 'magdalena.riecken@gmail.com',

					name: 'Magdalena Riecken',

					password: sha1('test'),

					feeds: []

				});

				res.end('Success');

			});

		});

	});



	/* CommonJS exports

	return {

		func : function () {}

	}

	//module.func();

	*/

}