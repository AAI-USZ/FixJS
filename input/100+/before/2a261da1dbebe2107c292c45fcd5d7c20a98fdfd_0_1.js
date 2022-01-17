function(i){

                    // Setup if last element
                    if(!--response.data.tree.length){
                        _this.container.addClass('loaded');
                        transition(_this.container.find('.page').first(), 'left', true);
                    }

                    // Return if data is not a file
                    if(this.type != 'blob')
                        return;

                    // Setup defaults
                    var first       = _this.container.find('.page').first()
                        ctx         = _this.repo,
                        output      = first,
                        path        = this.path,
                        arr         = path.split('/'),
                        file        = arr[(arr.length - 1)],
                        id          = '';

                    // Remove file from array
                    arr = arr.slice(0,-1);
                    id = _this.namespace;
                    
                    // Loop through folders
                    $.each(arr, function(i){

                        var name    = String(this),
                            index   = 0,
                            exists  = false;

                        id = id + '_split_' + name.replace('.','_dot_');

                        // Loop through folders and check names
                        $.each(ctx.folders, function(i){
                            if(this.name == name){
                                index = i;
                                exists = true;
                            }
                        });

                        // Create folder if it doesn't exist
                        if(!exists){
                            
                            // Append folder to DOM
                            if(output !== first){
                                output.find('ul li.back').after($('<li class="dir"><a href="#" data-id="' + id + '">' + name +'</a></li>'));
                            } else {
                                output.find('ul li').first().after($('<li class="dir"><a href="#" data-id="' + id + '">' + name +'</a></li>'));    
                            }

                            // Add folder to repo object
                            ctx.folders.push({
                                name        : name,
                                folders     : [],
                                files       : [],
                                element     : $('<div class="page" id="' + id + '"><ul><li class="titles"><span>name</span></li><li class="back"><a href="#">..</a></li></ul></page>').appendTo(_this.container)[0]
                            });
                            index = ctx.folders.length-1;

                        }

                        // Change context & output to the proper folder
                        output = $(ctx.folders[index].element);
                        ctx = ctx.folders[index];

                    });
                    
                    // Append file to DOM
                    output.find('ul').append($('<li class="file"><a href="#" data-path="' + path + '" data-id="' + id + '">' + file +'</a></li>'));
                    
                    // Add file to the repo object
                    ctx.files.push(file);
                
                }