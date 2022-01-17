function (){
        if(Meteor.user()) {
            var hostId = Hosts.findOne({email:Meteor.user().emails[0]});
            Meteor.logout(function (){
                Hosts.remove({_id:hostId._id});
            });
        } else {
            Meteor.loginWithGoogle(function(){
                var host = Hosts.findOne({email:Meteor.user().emails[0]});
                if(host === undefined) {
                    Hosts.insert({host:Meteor.user().name,email:Meteor.user().emails[0]});
                }
            });
        }
    }