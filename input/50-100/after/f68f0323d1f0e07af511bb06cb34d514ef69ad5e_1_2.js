function(direction, value){
            console.log("Running date converter");
            if (!value){
                return value;
            }
           if (direction == Backbone.ModelBinder.Constants.ModelToView){
                return value.toString("MM-dd-yyyy");
           }
           else {
                var res = Date.parseExact(value, "M-d-yyyy");
                return res;
           }
        }