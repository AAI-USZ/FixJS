function() {
                	var index = $(this).attr('id').replace('listel-','');
                	console.log(index);
                  	$('#listel-' + index+' img').attr('src','images/turtle.gif');
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
                            $('#listel-' + index+' img').attr('src',getImage(index));
                        },
                        error : function(xhr, ajaxOptions, thrownError) {
                            checkStatus(xhr.status);
                            $('#listel-' + index+' img').attr('src',getImage(index));
                        }
                    });

                }