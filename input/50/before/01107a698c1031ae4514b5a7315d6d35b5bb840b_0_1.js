function(){
                    namespace.app.userState.loggedIn = false;

                    context.insertView("#loginanchor", context.loginForm);
                    context.navBarView.render();
                }