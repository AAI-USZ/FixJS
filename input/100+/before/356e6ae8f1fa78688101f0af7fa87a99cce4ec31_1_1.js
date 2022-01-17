function(array) {
                var i = 0;
                while (i < array.length) {
                    cbObj = array[i];
                    if (cbObj.callback == callback) array.splice(i, 1);
                    else i++;
                }
            }