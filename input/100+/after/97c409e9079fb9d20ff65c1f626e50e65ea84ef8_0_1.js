function(i) {
            var span = $(this);
            if(span.attr("data-comment")==="0") {
                return;
            }
            var users = that.options.roster.getUsersState();
            if (_.isObject(users)!==true){
                return;
            }
            var usersuid = span.data("users");
            if(usersuid===undefined){
                return;
            }
            if(_.include(usersuid, that.options.uceclient.uid)===true) {
                span.attr("class", "");
                span.addClass(that.options.class_self);
                return;
            }
            // producteur OR personality
            if ((_.intersection(that.options.speakers, usersuid)).length > 0){
                span.attr("class", "");
                span.addClass(that.options.class_personality);
                return;
            }
        }