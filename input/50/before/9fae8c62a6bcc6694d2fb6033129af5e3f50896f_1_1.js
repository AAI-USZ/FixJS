function(index, element){
            if (index === 0){
                tags_str = $(element).html();
            }
            else {
                tags_str += ' ' + $(element).html();
            }
        }