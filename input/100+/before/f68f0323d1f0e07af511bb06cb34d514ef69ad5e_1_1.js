function() {
        //alert($.cookies.test());
        var userCookie = $.cookies.get('mt_sess') == null ? false : true;
        var userHash = $.cookies.get('mt_sess') == null ? {} : $.cookies.get('mt_sess');
        console.log("Need cookies: " + JSON.stringify(userHash));
//        console.log("Need cookies");
        namespace.app.user = new User.Model(userHash);
        namespace.app.userState = {};

        namespace.app.intConverter = function(direction, value){
            if (!value){
                return value;
            }
           if (direction == Backbone.ModelBinder.Constants.ModelToView){
                return value.toString();
           }
           else {
                return parseInt(value);
           }
        }

        namespace.app.dateConverter = function(direction, value){
            console.log(value);
            if (!value){
                return value;
            }
           if (direction == Backbone.ModelBinder.Constants.ModelToView){
                return value.getMonth() + "-" + value.getDay() + "-" + value.getFullYear();
           }
           else {
                return new Date(value);
           }
        }

        context.loginForm = new Navbar.Views.LoginForm({
            context: context,
            model: namespace.app.user
        });

        context.navBarView = new Navbar.Views.Navbar({
            context: context,
            userState: namespace.app.userState
        });
        if (!userCookie) {
            context.navBarView.insertView("#loginanchor", context.loginForm);
        }

        context.main = new Backbone.LayoutManager({
            template: "base"
          });

      context.nav = new Backbone.LayoutManager({
              template: "nav",
              views: {
                  "#navContentAnchor": context.navBarView
              }
      });

        context.on('project:save', function(eventName){
            console.log('Refreshing project view');
            context.get('selectedProjectView').render();
          });

          context.on('project:new', function(eventName){
            console.log('Should display new project');
          });

          context.on('auth:required', function(eventName){
            console.log('Login necessary!');
          });

          namespace.app.on('login:submit', function(eventName){
            namespace.app.user.fetch({
                success: function(){
                    var expiration = new Date();
                    expiration.setDate(expiration.getDate() + 7);
                    $.cookies.set('mt_sess', namespace.app.user.toJSON(), {path : '/'});
                    namespace.app.userState.loggedIn = true;

                    context.loginForm.removeView();
                    context.navBarView.render();
                },
                error: function(){
                    namespace.app.userState.loggedIn = false;

                    context.insertView("#loginanchor", context.loginForm);
                    context.navBarView.render();
                }
            });

        });

        namespace.app.on('project:selected', function(eventName){

            var selectedProject = context.get('selectedProject');
            var selectedProjectCulture = new Culture.Model({});
            selectedProjectCulture.id = selectedProject.get('cultureUrl');

            var selectedProjectView = new Mycotrack.Views.SelectedProjectView({context: context});
            selectedProjectView.options.project = selectedProject;
            selectedProjectView.options.culture = selectedProjectCulture;
    //        console.log(selectedProject );
    //        console.log(selectedProjectCulture );
            selectedProjectCulture.fetch({success: function(){
                context.main.setView("#detail", selectedProjectView);
//                console.log('Should refresh with: ' + JSON.stringify(selectedProjectView.model));
                selectedProjectView.render();
            }});
          });

        namespace.app.on('user:logOut', function(eventName){
            console.log("Logging out");
            $.cookies.del('mt_sess', {path : '/'});
            namespace.app.userState.loggedIn = false;
            context.navBarView.insertView("#loginanchor", context.loginForm);
            context.navBarView.render();
        });
        if (userCookie){
            namespace.app.trigger("login:submit");
        }

        context.nav.render(function(el) {
            console.log('Rendering nav');
            $("#mtnav").html(el);
            ModelBinding.bind(context.loginForm);
        });
        $("#main").html(context.main.el);

        console.log("Finished init");
    }