function(direction, value){
            console.log(value);
            if (!value){
                return value;
            }
           if (direction == Backbone.ModelBinder.Constants.ModelToView){
                return value.getMonth() + "-" + value.getDay() + "-" + value.getFullYear();
           }
           else {
                return new Date(value);
           }
        }