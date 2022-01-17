function(data){
        var user = new Parse.User();
        user.set("username", data.username);
        user.set("password", data.id);

        // other fields can be set just like with Parse.Object
        user.set("actions", 0);

        user.signUp(null, {
            success:function (user) {
                console.log(user);
                gop.data.user = user;
            },
            error:function (user, error) {
                // Show the error message somewhere and let the user try again.
                console.warn("Error: " + error.code + " " + error.message);
            }
        });
    }