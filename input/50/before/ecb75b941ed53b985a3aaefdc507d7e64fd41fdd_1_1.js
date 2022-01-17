function (data) {  
            if ((index < 6 && data.glimpseId == 1234) || index < 3)
                result.push(possibleResults[index++]);
            return result;
        }