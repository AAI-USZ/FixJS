function(){
                var host = Hosts.findOne({email:Meteor.user().emails[0]});
                alert(Meteor.user().emails[0]);
                if(host === undefined) {
                    Hosts.insert({host:Meteor.user().name,email:Meteor.user().emails[0]});
                }
            }