function(){
            $.getJSON('/user_activities/'+ 1 + '/' + self.year() + '/' + self.month(), function (result){
                self.activities.removeAll();
                $.each(result, function(index, item){
                    self.activities.push(new ActivityVM(item.id, item.type, item.date, item.hours, item.description, item.jobOrder, item.activity));
                });
            });
        }