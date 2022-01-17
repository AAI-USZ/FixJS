function defineRoutes(app) {

    

    app.get("/", loadUser, function (req, res, next) {

      res.send("project");

    });



    app.post("/login", function (req, res) {



      User.findOne({ email: req.body.e }, function(err, user) {

        if (user && user.authenticate(req.body.p)) {

          req.session.user_id = user.id;

          res.json({

            "status": "ok"

          });

        } else {

          // TODO: need to save this information

          if(user) {

            user.failed_login_attempts = user.failed_login_attempts++;



            if(user.failed_login_attempts == 3) {

              res.json({

                "status": "error",

                "err": "Too many failed logins, please contact support."

              });

            }

          }

          else {

            res.json({

              "status": "error",

              "err": "Incorrect login details."

            });

          }

        }

      }); 

    });





    app.get("/logout", loadUser, function (req, res, next) {

      req.session.user_id = null;

      req.currentUser = null;

      res.redirect("/");

    });





    app.post("/register", function (req, res) {

      var user = new User({

        email: req.body.e,

        password: req.body.p

      });

      user.save(function(err, user) {

        if(!!err) {

          if(err.code == "11000") {

            res.json({'status': 'error','err':'Email address is already registered.'});

          }

          else {

            res.json({'status':'error', 'err':'An error has occured'});

          }

        }

        else {

          req.session.user_id = user.id;

          res.json({

            status: "ok"

          });

        }

      }); 

    });



    app.post("/servlet/new_story", loadUser, function(req, res, next){

      var newStory = new Story(req.body);



      newStory.save(function (storyErr, story) {

        console.log("story err", storyErr);

        console.log("req.currentUser", req.currentUser);

        User.findOne({id: req.currentUser.id}, function (userFindErr, user) {

          console.log("user err", userFindErr);

          user.current_story = story.id;

          user.save(function(userErr, user) {

            console.log("user err", userErr);

            res.json({

              "status": "ok"

            })

          });

        });

      });

    });



    

    app.get("/db-test", function(req, res) {

        console.log("Hello World.");

        

        var printUser = function(err, user) {

            console.log("err:", err);

            console.log("user:", user);

            res.redirect("/");

        };

        

        console.log("db", db);

        console.log("User", User);

        

        var testUser = new User({

            name: "test",

            email: "test@test.com",

            password: "test"

        });

        

        testUser.save(printUser);

    });

}