function(){
                    namespace.app.userState.loggedIn = false;

                    context.navBarView.insertView("#loginanchor", context.loginForm);
                    context.navBarView.render();
                }