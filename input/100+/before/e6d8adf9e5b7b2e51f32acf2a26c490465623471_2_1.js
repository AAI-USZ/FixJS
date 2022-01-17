function(error, response, body){
                    if (!error && response.statusCode == 200) 
                    {
                        for (var i = 0; i < 60; i++) 
                        {
                            try
                            {
                                var data = JSON.parse(body);
                                var url = torrentz + data.query.results.dl[i].dt.a.href;
                                var title = helpers.sanitizeTitle(data.query.results.dl[i].dt.a.content);
                                var description = data.query.results.dl[i].dt.content;
                                
                                var element = {url: url, title: title, description: description};

                                array.pushIfNotExist(element, function(e) { 
                                    return e.title.toLowerCase() === element.title.toLowerCase(); 
                                });
                            }
                            catch(err)
                            {
                                //console.log("error: " + err);
                            }
                        }

                        callback();
                    }
                    else
                    {
                        callback();
                    }
                }