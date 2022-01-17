function (handler) {
                if (handler) {
                    //args should be an array of arguments
                    handler.func.apply(undefined, parsedArgs);
                }
            }