function(options){

	app = options.app;



  app.get('/logout', function (req, res) {

      req.session.user = null;

      res.redirect('/');

  });

  app.get('/login', function(req, res){

      res.render('login', {source: req.query.source});

  });

	

	app.post('/login', function(req, res){

		auth.login(req.body.username, req.body.password, function(user){

			if (user){ 

				req.session.user = user;

				res.redirect(req.body.source? req.body.source : '/');

			}else{

				res.render('login', {errors: [new Error('login failed')]});

			}

		});

	});

	

	app.get('/edit/:pid?', isauth, function(req, res) {

    var pid;

    pid = req.params.pid;

    

    if (pid) {

      BlogPost.findById(pid, function(err, post) {

        console.log('error', err);

        console.log('info', post);

        console.log('info', pid);

        if (!err && post) {

          // edit existing post

          res.render('edit', {post: post, user: req.session.user});

        } else {

          console.log('warn', 'Invalid Id');

          res.redirect('/');

        }

      });

    } else {

      // new post

      res.render('edit', {post: new BlogPost(), user: req.session.user });

    }

  });



  app.put('/edit/:pid?', isauth, function(req, res){

    var post = req.body.post;

    var dbpost, pid;

    pid = post.id || req.params.pid;

    console.log('pid : ', pid);

    if(pid) {

      // try to update document by id

      BlogPost.update({_id: post.id}, {title: post.title, body: post.body, tags: post.tags.split(',')}

      , function(err, numAfect){

        if (err) {

          console.log('error', err);

        }

      });

    } else {

      // add new post

      console.log('new blogpost');

      dbpost = new BlogPost();

      dbpost.title = post.title;

      dbpost.body = post.body;

      dbpost.tags = post.tags.split(',');

      dbpost.author = req.session.user._id;

      dbpost.comments = [];

      

      dbpost.save(function(err) {

        console.log('error', err);

      });

    }

    res.redirect('/');

  });

  app.del('/edit/:pid', isauth, function(req, res){

      res.redirect('/');

  });



  app.get('/:pag?', function(req, res){

    var pag = req.params.pag || 1;

    pag = (pag < 1 ? 1 : pag);

    var ponpage = 5;

    var totalposts = 0;

    var pages;

    BlogPost.count({}, function(err, c){

      if (!err){

        totalposts = c;

      }

      pages = Math.ceil(totalposts / ponpage);

      

      BlogPost.find().desc('date').skip(ponpage * (pag - 1)).limit(ponpage).exec(function(err, posts){

        res.render('index', {posts: posts, page: pag, total: pages, user: req.session.user});

      });

    });

  });

}