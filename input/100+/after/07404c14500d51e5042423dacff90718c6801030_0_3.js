function ActivitiesVM(acts)
    {
        var self = this;
        this.activities = ko.observableArray(acts);

        this.month = ko.observable();
        this.year = ko.observable();


        this.type = ko.observable();
        this.date = ko.observable()
        this.hours = ko.observable()
        this.description = ko.observable();
        this.jobOrder = ko.observable();
        this.activity = ko.observable();
        this.jobOrders = ko.observableArray();
        this.jobOrderActivities = ko.observableArray();
        this.activityTypes = ko.observableArray();

        this.reload = function(){
            $.getJSON('/user_activities/'+ 1 + '/' + self.year() + '/' + self.month(), function (result){
                self.activities.removeAll();
                $.each(result, function(index, item){
                    self.activities.push(new ActivityVM(item.id, item.type, item.date, item.hours, item.description, item.jobOrder, item.activity));
                });
            });
        };

        this.addActivity = function(){
            var type = self.type();
            var date = self.date();
            var hours = self.hours();
            var description = self.description();
            var jobOrder = self.jobOrder();
            var activity = self.activity();
            var data = { type: type, date:date, hours:hours, description: description, jobOrder: jobOrder, activity: activity };
            $.post('/user_activities', data, function (data){  
                var result = $.parseJSON(data);
                newActivity = new ActivityVM(result.id, result.type, result.date, result.hours, result.description, result.jobOrder, result.activity);
                self.activities.push(newActivity);
               
                self.hours('');
                self.description('');    
                $('#newActivity').addClass('hide');
            });
        };

        this.removeActivity = function(act){
            if (window.confirm('cancellare?')){
                $.ajax({
                        type: 'DELETE',
                        url: 'user_activities/' + act.id(),
                        success: function(){
                             self.activities.remove(act);
                        }
                });
            }
        };

        this.jobOrder.subscribe(function(newJobOrder){
          self.jobOrderActivities.removeAll();
          $.getJSON('/job_orders/' + self.jobOrder(), function(data){
            self.jobOrderActivities(data.activities);
          });
        });
    }