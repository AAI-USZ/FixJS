function(direction, value){
            if (!value){
                return value;
            }
           if (direction == Backbone.ModelBinder.Constants.ModelToView){
                return value.toString();
           }
           else {
                return parseInt(value);
           }
        }