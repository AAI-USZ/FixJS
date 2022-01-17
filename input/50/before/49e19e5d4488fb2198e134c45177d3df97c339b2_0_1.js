function getjQueryObjectBeforeErrorMessage(inputjQueryObject)
        {
             // check see if the twitter bootstrap appended text span tag is used
            if(inputjQueryObject.next().hasClass("add-on"))
            {
              return inputjQueryObject.next();
            }
            
            return inputjQueryObject;
        }