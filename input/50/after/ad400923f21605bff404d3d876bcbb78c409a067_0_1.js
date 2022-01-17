function(response) {
                            console.log(turtles[index].module);
                            $('#listel-' + index+' img').attr('src',getImage(index));
                        }