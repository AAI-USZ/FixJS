function (data) {  
            if ((index < 6 && data.clientRequestID == 1234) || index < 3)
                result.push(possibleResults[index++]);
            return $.extend(true, [], result);
        }