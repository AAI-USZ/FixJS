function() {
                    var index = $(this).index();
                    $.ajax({
                        url : url_controlbay+"plugin/magnify/turtle",
                        type : "POST",
                        headers : {
                            Authorization : token
                        },
                        data : {
                            turtle : turtles[index]['id']
                        },
                        success : function(response) {
                            console.log(turtles[index].module);
                        },
                        error : function(xhr, ajaxOptions, thrownError) {
                            checkStatus(xhr.status);
                        }
                    });

                }