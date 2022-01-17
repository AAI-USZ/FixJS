function(value, element){
                return this.optional(element) || (value !== $("#curr_pass").val());
            }