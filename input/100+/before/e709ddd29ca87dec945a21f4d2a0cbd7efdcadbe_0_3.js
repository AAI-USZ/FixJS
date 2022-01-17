function() {
            var options = this.options;
            var path = this.options.path;
            var list = this.options.list;
            var breadcrumb = this.filemanager.one('.fm-breadcrumb');
            // empty breadcrumb
            breadcrumb.set('innerHTML', '').addClass('fm-empty');
            // build breadcrumb
            if (path && path.length) {
                breadcrumb.removeClass('fm-empty');
                var count = 0;
                for(var p in path) {
                    var arrow = '';
                    if (count==0) {
                        arrow = Y.Node.create('<span>'+M.str.moodle.path + ': </span>');
                    } else {
                        arrow = Y.Node.create('<span> ▶ </span>');
                    }
                    count++;

                    var pathid  = 'fm-path-node-'+this.client_id;
                    pathid += ('-'+count);

                    var crumb = Y.Node.create('<a href="###" id="'+pathid+'">'+path[p].name+'</a>');
                    breadcrumb.appendChild(arrow);
                    breadcrumb.appendChild(crumb);

                    var args = {};
                    args.requestpath = path[p].path;
                    args.client_id = this.client_id;
                    Y.one('#'+pathid).on('click', function(e, args) {
                        var scope = this;
                        var params = {};
                        params['filepath'] = args.requestpath;
                        this.currentpath = args.requestpath;
                        this.request({
                            action: 'list',
                            scope: scope,
                            params: params,
                            callback: function(id, obj, args) {
                                scope.filecount = obj.filecount;
                                scope.check_buttons();
                                scope.options = obj;
                                scope.render(obj);
                            }
                        }, true);
                    }, this, args);
                }
            }
            var listhtml = '';

            // folder list items
            var folder_ids = [];
            var folder_data = {};

            // normal file list items
            var file_ids   = [];
            var file_data  = {};

            // archives list items
            var zip_ids    = [];
            var zip_data = {};

            var html_ids = [];
            var html_data = {};

            file_data.itemid = folder_data.itemid = zip_data.itemid = options.itemid;
            file_data.client_id = folder_data.client_id = zip_data.client_id = this.client_id;

            var foldername_ids = [];
            this.filemanager.removeClass('fm-updating').removeClass('fm-noitems');
            if (!list || list.length == 0) {
                this.filemanager.addClass('fm-noitems');
                return;
            }

            var count = 0;
            for(var i in list) {
                count++;
                // the li html element
                var htmlid = 'fileitem-'+this.client_id+'-'+count;
                // link to file
                var fileid = 'filename-'+this.client_id+'-'+count;
                // file menu
                var action = 'action-'  +this.client_id+'-'+count;

                var html = M.form_filemanager.templates.onefile;

                html_ids.push('#'+htmlid);
                html_data[htmlid] = action;

                list[i].htmlid = htmlid;
                list[i].fileid = fileid;
                list[i].action = action;

                var url = "###";

                switch (list[i].type) {
                    case 'folder':
                        // click folder name
                        foldername_ids.push('#'+fileid);
                        // click folder menu
                        folder_ids.push('#'+action);
                        folder_data[action] = list[i];
                        folder_data[fileid] = list[i];
                        break;
                    case 'file':
                        file_ids.push('#'+action);
                        // click file name
                        file_ids.push('#'+fileid);
                        file_data[action] = list[i];
                        file_data[fileid] = list[i];
                        if (list[i].url) {
                            url = list[i].url;
                        }
                    break;
                    case 'zip':
                        zip_ids.push('#'+action);
                        zip_ids.push('#'+fileid);
                        zip_data[action] = list[i];
                        zip_data[fileid] = list[i];
                        if (list[i].url) {
                            url = list[i].url;
                        }
                    break;
                }
                var fullname = list[i].fullname;

                if (list[i].sortorder == 1) {
                    html = html.replace('___fullname___', '<strong><a title="'+fullname+'" href="'+url+'" id="'+fileid+'"><img src="'+list[i].icon+'" /> ' + fullname + '</a></strong>');
                } else {
                    html = html.replace('___fullname___', '<a title="'+fullname+'" href="'+url+'" id="'+fileid+'"><img src="'+list[i].icon+'" /> ' + fullname + '</a>');
                }
                html = html.replace('___action___', '<span class="fm-menuicon" id="'+action+'"><img alt="▶" src="'+M.util.image_url('i/menu')+'" /></span>');
                html = '<li id="'+htmlid+'">'+html+'</li>';
                listhtml += html;
            }
            this.filemanager.one('.fm-filelist').set('innerHTML', listhtml);

            // click normal file menu
            Y.on('click', this.create_filemenu, file_ids, this, file_data);
            Y.on('contextmenu', this.create_filemenu, file_ids, this, file_data);
            // click folder menu
            Y.on('click', this.create_foldermenu, folder_ids, this, folder_data);
            Y.on('contextmenu', this.create_foldermenu, folder_ids, this, folder_data);
            Y.on('contextmenu', this.create_foldermenu, foldername_ids, this, folder_data);
            // click archievs menu
            Y.on('click', this.create_zipmenu, zip_ids, this, zip_data);
            Y.on('contextmenu', this.create_zipmenu, zip_ids, this, zip_data);
            // click folder name
            Y.on('click', this.enter_folder, foldername_ids, this, folder_data);
        }