function(value){
                    var datePart = value.substring(0,value.indexOf('T'));
                    // console.debug("datePart:" + datePart);
                    var timePart = value.substring(value.indexOf('T'),value.length);
                    // console.debug("timePart:" + timePart + " " + timePart.length);
                    if(timePart.length == 7) {
                        timePart = timePart.substring(0,6)+":00.000Z";
                    }
                    var result = datePart + timePart;
                    // console.debug("result:" + result);
                    return result;
                }