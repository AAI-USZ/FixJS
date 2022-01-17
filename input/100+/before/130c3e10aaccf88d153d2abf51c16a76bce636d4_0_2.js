function(e){
                    
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
                }