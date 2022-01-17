function(error,result){  
                    Rooms.update({result},{$set:{active:true}});
                    var d = new Date();
                    var date = d.toDateString() + " " + d.toLocaleTimeString();  
                    Messages.insert({roomId: result ,content: 'Thank you for accessing Southern Adventist University Online Campus Support, someone will be with you shortly.  You may begin by entering any questions here and our support staff will see them when they join you.', user: 'Online Support',role:'welcome',messagetime:0,date:date});
                }