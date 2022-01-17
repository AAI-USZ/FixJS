function(response){


                var treeLength = response.data.tree.length;
                $.each(response.data.tree, function(i){

                    // Setup if last element
                    if(!--treeLength){
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
                
                });
                
                // Bind to page links
                _this.container.on('click', 'a', function(e){
                    
                    e.preventDefault();

                    var link        = $(this),
                        parent      = link.parents('li'),
                        page        = link.parents('.page'),
                        repo        = link.parents('.repo'),
                        el          = $('#' + link.data('id'));
                    
                    // Is link a file
                    if(parent.hasClass('file')){
                        
                        el = $('#' + link.data('id'));
                        
                        if(el.legnth > 0){
                            el.addClass('active');
                        } else {
                            $.ajax({
                                url: 'https://api.github.com/repos/' + _this.settings.user + '/' + _this.settings.name + '/contents/' + link.data('path') + '?ref=' + _this.settings.branch,
                                type: 'GET',
                                data: {},
                                dataType: 'jsonp',
                                success: function(response){
                                    var fileContainer = $('<div class="file page" id="' + link.data('id') + '"></div>'),
                                        extension = response.data.name.split('.').pop().toLowerCase(),
                                        mimeType = getMimeTypeByExtension(extension);
                                        
                                    if('image' === mimeType.split('/').shift()){
                                        el = fileContainer.append($('<div class="image"><span class="border-wrap"><img src="" /></span></div>')).appendTo(repo);
                                        el.find('img')
                                            .attr('src', 'data:' + mimeType + ';base64,' + response.data.content)
                                            .attr('alt', response.data.name);
                                    }
                                    else {
                                        el = fileContainer.append($('<pre><code></code></pre>')).appendTo(repo);
                                        if(typeof _this.extensions[extension] != 'undefined')
                                            file.find('code').addClass(_this.extensions[extension]);
                                        el.find('code').html(String(decode64(response.data.content)).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'));
                                        el.find('pre').vanGogh();
                                    }

                                    transition(el, 'left');
                                }, 
                                error: function(response){
                                    if(console && console.log)
                                        console.log('Request Error:', e);
                                }
                            });
                        }

                    // Is link a folder
                    } else if(parent.hasClass('dir')) {

                        _this.container
                            .find('h1')
                            .find('.active')
                            .removeClass('active')
                            .end()
                            .append('<a href="#" data-id="' + link.data('id') + '" class="active">' + link.text() + '</a>');
                        transition(el, 'left');

                    // Is link a back link 
                    } else if(parent.hasClass('back')){

                        _this.container.find('h1 a').last().remove();
                        el = page[0].id.split('_split_').slice(0,-1).join('_split_');
                        el = (el == _this.namespace) ? _this.container.find('.page').first() : $('#' + el);
                        transition(el, 'right');

                    // Is nav link
                    } else {

                        if(link[0] !== _this.container.find('h1 a')[0])
                            link.addClass('active');
                        _this.container.find('h1 a').slice((link.index()+1),_this.container.find('h1 a').length).remove();
                        transition(el, 'right');

                    }
                });
            }