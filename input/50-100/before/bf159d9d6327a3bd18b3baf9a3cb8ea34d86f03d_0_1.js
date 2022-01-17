function (data, textstatus, request) {
                    var obj = $.parseJSON(request.responseText)
                    console.log(obj.object);
                    var data = obj.object;
                    buildGraph(data);
                    firstTime = false;
                }