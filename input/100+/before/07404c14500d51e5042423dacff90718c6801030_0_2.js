function (result){
        console.log(result);
        var current = [];
        $.each(result, function(index, item){
            current.push(new ActivityVM(item.id, item.type, item.date, item.hours, item.description, item.jobOrder, item.activity));
        });
        activityList.activities(current);
    }