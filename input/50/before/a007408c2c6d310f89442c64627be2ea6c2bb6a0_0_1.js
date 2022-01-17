function onDeviceReady() {

                // Initializing Parse API's
                Parse.initialize("DeE1IIk6SSWxDVAiywycW78jUBA4ZXXT1nZrFfoV", "QsKQMMV9tQLMiO9GfSh305qP6cy3gqfqCTSQyFEP");

                // Pushing LoginView as a first view of the app
                $.mobile.jqmNavigator.pushView(new LoginView());

            }