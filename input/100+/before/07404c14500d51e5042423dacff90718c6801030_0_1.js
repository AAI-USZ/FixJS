function(){
            var type = self.type();
            var date = self.date();
            var hours = self.hours();
            var description = self.description();
            var jobOrder = self.jobOrder();
            var activity = self.activity();
            var data = { type: type, date:date, hours:hours, description: description, jobOrder: jobOrder, activity: activity };
            console.log('ready to post', self.date());
            $.post('user_activities', data, function (data){  
                var result = $.parseJSON(data);
                newActivity = new ActivityVM(result.id, result.type, result.date, result.hours, result.description, result.jobOrder, result.activity);
                self.activities.push(newActivity);
               
                self.hours('');
                self.description('');    
                $('#newActivity').addClass('hide');
            });
        }