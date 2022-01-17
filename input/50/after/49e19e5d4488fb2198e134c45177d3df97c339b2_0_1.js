function getjQueryObjectBeforeErrorMessage(inputjQueryObject)
        {
            if (options['append_to_control_group']) {
            	return inputjQueryObject.closest('div.control-group');
            }
             // check see if the twitter bootstrap appended text span tag is used
            if(inputjQueryObject.next().hasClass("add-on"))
            {
              return inputjQueryObject.next();
            }
            
            return inputjQueryObject;
        }