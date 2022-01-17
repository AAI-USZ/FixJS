function(req, res){

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

  }