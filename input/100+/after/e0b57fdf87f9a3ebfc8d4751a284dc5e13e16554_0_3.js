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

    var dbpost;

    if(!req.params.pid) {

      // save new post

      post.author = req.session.user._id;

      dbpost = new BlogPost(post);

      dbpost.tags = post.tags.split(',');

      dbpost.save(function(err) {

        console.log('error', err);

        res.redirect('/');

      });

    } else {

      // update existing

      BlogPost.update({_id: post._id}, {

          tags: post.tags.split(','),

          body: post.body,

          title: post.title

        },

      function(err, affected) {

        if(err) {

          console.log('error', err);

        }

        res.redirect('/');

      });

    }

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