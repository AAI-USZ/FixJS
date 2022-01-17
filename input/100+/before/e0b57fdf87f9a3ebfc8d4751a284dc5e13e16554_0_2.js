function(req, res){

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

  }