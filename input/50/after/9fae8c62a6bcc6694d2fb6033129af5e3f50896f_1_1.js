function(index, element){
            if (index === 0){
                //this is pretty bad - we should use Tag.getName()
                tags_str = $(element).attr('data-tag-name');
            }
            else {
                tags_str += ' ' + $(element).attr('data-tag-name');
            }
        }