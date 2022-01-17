function(Y, options) {
    var FileManagerHelper = function(options) {
        FileManagerHelper.superclass.constructor.apply(this, arguments);
    };
    FileManagerHelper.NAME = "FileManager";
    FileManagerHelper.ATTRS = {
        options: {},
        lang: {}
    };

    Y.extend(FileManagerHelper, Y.Base, {
        api: M.cfg.wwwroot+'/repository/draftfiles_ajax.php',
        menus: {},
        initializer: function(options) {
            this.options = options;
            if (options.mainfile) {
                this.enablemainfile = options.mainfile;
            }
            this.client_id = options.client_id;
            this.currentpath = '/';
            this.maxfiles = options.maxfiles;
            this.maxbytes = options.maxbytes;
            this.emptycallback = null; // Used by drag and drop upload

            this.filepicker_options = options.filepicker?options.filepicker:{};
            this.filepicker_options.client_id = this.client_id;
            this.filepicker_options.context = options.context;
            this.filepicker_options.maxfiles = this.maxfiles;
            this.filepicker_options.maxbytes = this.maxbytes;
            this.filepicker_options.env = 'filemanager';
            this.filepicker_options.itemid = options.itemid;

            if (options.filecount) {
                this.filecount = options.filecount;
            } else {
                this.filecount = 0;
            }
            // prepare filemanager for drag-and-drop upload
            this.filemanager = Y.one('#filemanager-'+options.client_id);
            if (this.filemanager.hasClass('filemanager-container') || !this.filemanager.one('.filemanager-container')) {
                this.dndcontainer = this.filemanager;
            } else  {
                this.dndcontainer = this.filemanager.one('.filemanager-container');
                if (!this.dndcontainer.get('id')) {
                    this.dndcontainer.generateID();
                }
            }
            // save template for one path element and location of path bar
            if (this.filemanager.one('.fp-path-folder')) {
                this.pathnode = this.filemanager.one('.fp-path-folder');
                this.pathbar = this.pathnode.get('parentNode');
                this.pathbar.removeChild(this.pathnode);
            }
            // initialize 'select file' panel
            var fpselectnode = Y.Node.create(M.form_filemanager.templates.fileselectlayout);
            this.filemanager.appendChild(fpselectnode);
            this.selectui = new Y.Panel({
                srcNode      : fpselectnode,
                zIndex       : 600000,
                centered     : true,
                modal        : true,
                close        : true,
                render       : true
            });
            this.selectui.hide();
            this.setup_select_file();
            // setup buttons onclick events
            this.setup_buttons();
            // display files
            this.viewmode = 1; // TODO take from cookies?
            this.filemanager.all('.fp-vb-icons,.fp-vb-tree,.fp-vb-details').removeClass('checked')
            this.filemanager.all('.fp-vb-icons').addClass('checked')
            this.refresh(this.currentpath); // MDL-31113 get latest list from server
        },

        wait: function() {
           this.filemanager.addClass('fm-updating');
        },
        request: function(args, redraw) {
            var api = this.api + '?action='+args.action;
            var params = {};
            var scope = this;
            if (args['scope']) {
                scope = args['scope'];
            }
            params['sesskey'] = M.cfg.sesskey;
            params['client_id'] = this.client_id;
            params['filepath'] = this.currentpath;
            params['itemid'] = this.options.itemid?this.options.itemid:0;
            if (args['params']) {
                for (i in args['params']) {
                    params[i] = args['params'][i];
                }
            }
            var cfg = {
                method: 'POST',
                on: {
                    complete: function(id,o,p) {
                        if (!o) {
                            alert('IO FATAL');
                            return;
                        }
                        var data = null;
                        try {
                            data = Y.JSON.parse(o.responseText);
                        } catch(e) {
                            // TODO display error
                            scope.print_msg(M.str.repository.invalidjson, 'error');
                            //scope.display_error(M.str.repository.invalidjson+'<pre>'+stripHTML(o.responseText)+'</pre>', 'invalidjson')
                            return;
                        }
                        if (data && data.tree && scope.set_current_tree) {
                            scope.set_current_tree(data.tree);
                        }
                        args.callback(id,data,p);
                    }
                },
                arguments: {
                    scope: scope
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'User-Agent': 'MoodleFileManager/3.0'
                },
                data: build_querystring(params)
            };
            if (args.form) {
                cfg.form = args.form;
            }
            Y.io(api, cfg);
            if (redraw) {
                this.wait();
            }
        },
        filepicker_callback: function(obj) {
            this.filecount++;
            this.check_buttons();
            this.refresh(this.currentpath);
            if (typeof M.core_formchangechecker != 'undefined') {
                M.core_formchangechecker.set_form_changed();
            }
        },
        check_buttons: function() {
            if (this.filecount>0) {this.filemanager.removeClass('fm-nofiles');}
            else {this.filemanager.addClass('fm-nofiles');}
            if (this.filecount >= this.maxfiles && this.maxfiles!=-1)
                {this.filemanager.addClass('fm-maxfiles');}
            else {this.filemanager.removeClass('fm-maxfiles');}
        },
        refresh: function(filepath) {
            var scope = this;
            this.currentpath = filepath;
            if (!filepath) {
                filepath = this.currentpath;
            } else {
                this.currentpath = filepath;
            }
            this.request({
                action: 'list',
                scope: scope,
                params: {'filepath':filepath},
                callback: function(id, obj, args) {
                    scope.filecount = obj.filecount;
                    scope.check_buttons();
                    scope.options = obj;
                    scope.render(obj);
                }
            }, true);
        },
        /** displays message in a popup */
        print_msg: function(msg, type) {
            var header = M.str.moodle.error;
            if (type != 'error') {
                type = 'info'; // one of only two types excepted
                header = M.str.moodle.info;
            }
            if (!this.msg_dlg) {
                var node = Y.Node.create(M.form_filemanager.templates.message);
                this.filemanager.appendChild(node);

                this.msg_dlg = new Y.Panel({
                    srcNode      : node,
                    zIndex       : 800000,
                    centered     : true,
                    modal        : true,
                    visible      : false,
                    render       : true
                });
                node.one('.fp-msg-butok').on('click', function(e) {
                    e.preventDefault();
                    this.msg_dlg.hide();
                }, this);
            }

            this.msg_dlg.set('headerContent', header);
            this.filemanager.one('.fp-msg').removeClass('fp-msg-info').removeClass('fp-msg-error').addClass('fp-msg-'+type)
            this.filemanager.one('.fp-msg .fp-msg-text').setContent(msg);
            this.msg_dlg.show();
        },
        setup_buttons: function() {
            var button_download = this.filemanager.one('.fp-btn-download');
            var button_create   = this.filemanager.one('.fp-btn-mkdir');
            var button_addfile  = this.filemanager.one('.fp-btn-add');

            // setup 'add file' button
            // if maxfiles == -1, the no limit
            button_addfile.on('click', function(e) {
                e.preventDefault();
                var options = this.filepicker_options;
                options.formcallback = this.filepicker_callback;
                // XXX: magic here, to let filepicker use filemanager scope
                options.magicscope = this;
                options.savepath = this.currentpath;
                M.core_filepicker.show(Y, options);
            }, this);

            // setup 'make a folder' button
            if (this.options.subdirs) {
                button_create.on('click',function(e) {
                    e.preventDefault();
                    var scope = this;
                    // a function used to perform an ajax request
                    var perform_action = function(e) {
                        e.preventDefault();
                        var foldername = Y.one('#fm-newname-'+scope.client_id).get('value');
                        if (!foldername) {
                            scope.mkdir_dialog.hide();
                            return;
                        }
                        scope.request({
                            action:'mkdir',
                            params: {filepath:scope.currentpath, newdirname:foldername},
                            callback: function(id, obj, args) {
                                var filepath = obj.filepath;
                                scope.mkdir_dialog.hide();
                                scope.refresh(filepath);
                                Y.one('#fm-newname-'+scope.client_id).set('value', '');
                                if (typeof M.core_formchangechecker != 'undefined') {
                                    M.core_formchangechecker.set_form_changed();
                                }
                            }
                        });
                    }
                    if (!this.mkdir_dialog) {
                        var node = Y.Node.create(M.form_filemanager.templates.mkdir);
                        this.filemanager.appendChild(node);
                        this.mkdir_dialog = new Y.Panel({
                            srcNode      : node,
                            zIndex       : 800000,
                            centered     : true,
                            modal        : true,
                            visible      : false,
                            render       : true
                        });
                        node.one('.fp-dlg-butcreate').on('click', perform_action, this);
                        node.one('input').set('id', 'fm-newname-'+this.client_id).
                            on('keydown', function(e){
                                if (e.keyCode == 13) {Y.bind(perform_action, this)(e);}
                            }, this);
                        node.all('.fp-dlg-butcancel').on('click', function(e){e.preventDefault();this.mkdir_dialog.hide();}, this);
                        node.all('.fp-dlg-curpath').set('id', 'fm-curpath-'+this.client_id);
                    }
                    this.mkdir_dialog.show();
                    Y.one('#fm-newname-'+scope.client_id).focus();
                    Y.all('#fm-curpath-'+scope.client_id).setContent(this.currentpath)
                }, this);
            } else {
                this.filemanager.addClass('fm-nomkdir');
            }

            // setup 'download this folder' button
            // NOTE: popup window must be enabled to perform download process
            button_download.on('click',function(e) {
                e.preventDefault();
                var scope = this;
                // perform downloaddir ajax request
                this.request({
                    action: 'downloaddir',
                    scope: scope,
                    callback: function(id, obj, args) {
                        if (obj) {
                            scope.refresh(obj.filepath);
                            var win = window.open(obj.fileurl, 'fm-download-folder');
                            if (!win) {
                                scope.print_msg(M.str.repository.popupblockeddownload, 'error');
                            }
                        } else {
                            scope.print_msg(M.str.repository.draftareanofiles, 'error');
                        }
                    }
                });
            }, this);

            this.filemanager.all('.fp-vb-icons,.fp-vb-tree,.fp-vb-details').
                on('click', function(e) {
                    e.preventDefault();
                    var viewbar = this.filemanager.one('.fp-viewbar')
                    if (!viewbar || !viewbar.hasClass('disabled')) {
                        this.filemanager.all('.fp-vb-icons,.fp-vb-tree,.fp-vb-details').removeClass('checked')
                        if (e.currentTarget.hasClass('fp-vb-tree')) {
                            this.viewmode = 2;
                        } else if (e.currentTarget.hasClass('fp-vb-details')) {
                            this.viewmode = 3;
                        } else {
                            this.viewmode = 1;
                        }
                        e.currentTarget.addClass('checked')
                        this.render();
                        //Y.Cookie.set('recentviewmode', this.viewmode);
                    }
                }, this);
        },
        print_path: function() {
            var p = this.options.path;
            this.pathbar.setContent('').addClass('empty');
            if (p && p.length!=0 && this.viewmode != 2) {
                for(var i = 0; i < p.length; i++) {
                    var el = this.pathnode.cloneNode(true);
                    this.pathbar.appendChild(el);
                    if (i == 0) {el.addClass('first');}
                    if (i == p.length-1) {el.addClass('last');}
                    if (i%2) {el.addClass('even');} else {el.addClass('odd');}
                    el.one('.fp-path-folder-name').setContent(p[i].name).
                        on('click', function(e, path) {
                            e.preventDefault();
                            var scope = this;
                            this.currentpath = path;
                            this.request({
                                action: 'list',
                                scope: scope,
                                params: {filepath:path},
                                callback: function(id, obj, args) {
                                    scope.filecount = obj.filecount;
                                    scope.check_buttons();
                                    scope.options = obj;
                                    scope.render(obj);
                                }
                            }, true);
                        }, this, p[i].path);
                }
                this.pathbar.removeClass('empty');
            }
        },
        get_filepath: function(obj) {
            if (obj.path && obj.path.length) {
                return obj.path[obj.path.length-1].path;
            }
            return '';
        },
        treeview_dynload: function(node, cb) {
            var retrieved_children = {};
            if (node.children) {
                for (var i in node.children) {
                    retrieved_children[node.children[i].path] = node.children[i];
                }
            }
            this.request({
                action:'list',
                params: {filepath:node.path?node.path:''},
                scope:this,
                callback: function(id, obj, args) {
                    var list = obj.list;
                    var scope = args.scope;
                    // check that user did not leave the view mode before recieving this response
                    if (!(scope.viewmode == 2 && node && node.getChildrenEl())) {
                        return;
                    }
                    if (cb != null) { // (in manual mode do not update current path)
                        scope.options = obj;
                        scope.currentpath = node.path?node.path:'/';
                    }
                    node.highlight(false);
                    node.origlist = obj.list?obj.list:null;
                    node.origpath = obj.path?obj.path:null;
                    node.origcurrentpath = node.path?node.path:'/';
                    node.children = [];
                    for(k in list) {
                        if (list[k].type == 'folder' && retrieved_children[list[k].filepath]) {
                            // if this child is a folder and has already been retrieved
                            node.children[node.children.length] = retrieved_children[list[k].filepath];
                        } else {
                            // append new file to the list
                            scope.view_files([list[k]]);
                        }
                    }
                    if (cb == null) {
                        node.refresh();
                    } else {
                        // invoke callback requested by TreeView component
                        cb();
                    }
                    //scope.content_scrolled();
                }
            }, false);
        },
        view_files: function(appendfiles) {
            this.filemanager.removeClass('fm-updating').removeClass('fm-noitems');
            if ((appendfiles == null) && (!this.options.list || this.options.list.length == 0)) {
                this.filemanager.addClass('fm-noitems');
                return;
            }
            var list = (appendfiles != null) ? appendfiles : this.options.list;
            var element_template;
            if (this.viewmode == 2 || this.viewmode == 3) {
                element_template = Y.Node.create(M.form_filemanager.templates.listfilename);
            } else {
                this.viewmode = 1;
                element_template = Y.Node.create(M.form_filemanager.templates.iconfilename);
            }
            var options = {
                viewmode : this.viewmode,
                appendonly : appendfiles != null,
                filenode : element_template,
                callbackcontext : this,
                callback : function(e, node) {
                    if (e.preventDefault) { e.preventDefault(); }
                    if (node.type == 'folder') {
                        this.refresh(node.filepath);
                    } else {
                        this.select_file(node);
                    }
                },
                rightclickcallback : function(e, node) {
                    if (e.preventDefault) { e.preventDefault(); }
                    this.select_file(node);
                }
            };
            if (this.viewmode == 2) {
                options.dynload = true;
                options.filepath = this.options.path;
                options.treeview_dynload = this.treeview_dynload;
                options.norootrightclick = true;
                options.callback = function(e, node) {
                    // TODO MDL-32736 e is not an event here but an object with properties 'event' and 'node'
                    if (!node.fullname) {return;}
                    if (node.type != 'folder') {
                        if (e.node.parent && e.node.parent.origpath) {
                            // set the current path
                            this.options.path = e.node.parent.origpath;
                            this.options.list = e.node.parent.origlist;
                            this.print_path();
                        }
                        this.currentpath = node.filepath;
                        this.select_file(node);
                    } else {
                        // save current path and filelist (in case we want to jump to other viewmode)
                        this.options.path = e.node.origpath;
                        this.options.list = e.node.origlist;
                        this.currentpath = e.node.origcurrentpath;
                        this.print_path();
                        //this.content_scrolled();
                    }
                };
            }
            if (!this.lazyloading) {this.lazyloading={};}
            this.filemanager.one('.fp-content').fp_display_filelist(options, list, this.lazyloading);
        },
        populate_licenses_select: function(node) {
            if (!node) {return;}
            node.setContent('');
            var licenses = this.options.licenses;
            for (var i in licenses) {
                var option = Y.Node.create('<option/>').
                    set('value', licenses[i].shortname).
                    setContent(licenses[i].fullname);
                node.appendChild(option)
            }
        },
        set_current_tree: function(tree) {
            var appendfilepaths = function(list, node) {
                if (!node || !node.children || !node.children.length) {return;}
                for (var i in node.children) {
                    list[list.length] = node.children[i].filepath;
                    appendfilepaths(list, node.children[i]);
                }
            }
            var list = ['/'];
            appendfilepaths(list, tree);
            var selectnode = this.filemanager.one('.fp-select');
            node = selectnode.one('.fp-path select');
            node.setContent('');
            for (var i in list) {
                node.appendChild(Y.Node.create('<option/>').
                    set('value', list[i]).setContent(list[i]))
            }
        },
        update_file: function() {
            var selectnode = this.filemanager.one('.fp-select');
            var fileinfo = this.selectui.fileinfo;

            var newfilename = selectnode.one('.fp-saveas input').get('value');
            var filenamechanged = (newfilename && newfilename != fileinfo.fullname);
            var pathselect = selectnode.one('.fp-path select'),
                    pathindex = pathselect.get('selectedIndex'),
                    targetpath = pathselect.get("options").item(pathindex).get('value');
            var filepathchanged = (targetpath != this.get_parent_folder_name(fileinfo));

            if (filenamechanged && filepathchanged) {
                alert('Sorry, simultaneous changing of name and path is not supported yet'); // TODO
                return;
            }
            if (!filenamechanged && !filepathchanged) {
                // no changes
                this.selectui.hide();
            }

            selectnode.addClass('loading');

            // RENAME
            if (filenamechanged) {
                var action = '';
                var params = {};
                if (fileinfo.type == 'folder') {
                    params['filepath']   = fileinfo.filepath;
                    params['filename']   = '.';
                    params['newdirname'] = newfilename;
                    action = 'renamedir';
                } else {
                    params['filepath']   = fileinfo.filepath;
                    params['filename']   = fileinfo.fullname;
                    params['newfilename'] = newfilename;
                    action = 'rename';
                }
                this.request({
                    action: action,
                    scope: this,
                    params: params,
                    callback: function(id, obj, args) {
                        if (obj == false) {
                            selectnode.removeClass('loading');
                            args.scope.print_msg(M.str.repository.fileexists, 'error');
                        } else {
                            args.scope.selectui.hide();
                            args.scope.refresh(obj.filepath);
                            if (typeof M.core_formchangechecker != 'undefined') {
                                M.core_formchangechecker.set_form_changed();
                            }
                        }
                    }
                });
            }

            // MOVE
            if (filepathchanged) {
                var params = {};
                if (fileinfo.type == 'folder') {
                    action = 'movedir';
                } else {
                    action = 'movefile';
                }
                params['filepath'] = fileinfo.filepath;
                params['filename'] = fileinfo.fullname;
                params['newfilepath'] = targetpath;
                this.request({
                    action: action,
                    scope: this,
                    params: params,
                    callback: function(id, obj, args) {
                        args.scope.selectui.hide();
                        args.scope.refresh((obj && obj.filepath) ? obj.filepath : '/');
                        if (typeof M.core_formchangechecker != 'undefined') {
                            M.core_formchangechecker.set_form_changed();
                        }
                    }
                });
            }
        },
        setup_select_file: function() {
            var selectnode = this.filemanager.one('.fp-select');
            // bind labels with corresponding inputs
            selectnode.all('.fp-saveas,.fp-path,.fp-author,.fp-license').each(function (node) {
                node.all('label').set('for', node.one('input,select').generateID());
            });
            this.populate_licenses_select(selectnode.one('.fp-license select'));
            // register event on clicking buttons
            selectnode.one('.fp-file-update').on('click', function(e) {
                e.preventDefault();
                this.update_file();
            }, this);
            selectnode.one('.fp-file-download').on('click', function(e) {
                e.preventDefault();
                window.open(this.selectui.fileinfo.url, 'fm-download-file');
            }, this);
            selectnode.one('.fp-file-delete').on('click', function(e) {
                e.preventDefault();
                var dialog_options = {};
                var params = {};
                dialog_options.message = M.str.repository.confirmdeletefile;
                dialog_options.scope = this;
                if (this.selectui.fileinfo.type == 'folder') {
                    params.filename = '.';
                    params.filepath = this.selectui.fileinfo.filepath;
                } else {
                    params.filename = this.selectui.fileinfo.fullname;
                }
                dialog_options.callbackargs = [params];
                dialog_options.callback = function(params) {
                    //selectnode.addClass('loading');
                    this.request({
                        action: 'delete',
                        scope: this,
                        params: params,
                        callback: function(id, obj, args) {
                            //args.scope.selectui.hide();
                            args.scope.filecount--;
                            args.scope.refresh(obj.filepath);
                            if (typeof M.core_formchangechecker != 'undefined') {
                                M.core_formchangechecker.set_form_changed();
                            }
                        }
                    });
                };
                this.selectui.hide(); // TODO remove this after confirm dialog is replaced with YUI3
                M.util.show_confirm_dialog(e, dialog_options);
            }, this);
            selectnode.one('.fp-file-zip').on('click', function(e) {
                e.preventDefault();
                var params = {};
                var fileinfo = this.selectui.fileinfo;
                params['filepath']   = fileinfo.filepath;
                params['filename']   = '.';
                selectnode.addClass('loading');
                this.request({
                    action: 'zip',
                    scope: this,
                    params: params,
                    callback: function(id, obj, args) {
                        args.scope.selectui.hide();
                        args.scope.refresh(obj.filepath);
                    }
                });
            }, this);
            selectnode.one('.fp-file-unzip').on('click', function(e) {
                e.preventDefault();
                var params = {};
                var fileinfo = this.selectui.fileinfo;
                params['filepath'] = fileinfo.filepath;
                params['filename'] = fileinfo.fullname;
                selectnode.addClass('loading');
                this.request({
                    action: 'unzip',
                    scope: this,
                    params: params,
                    callback: function(id, obj, args) {
                        args.scope.selectui.hide();
                        args.scope.refresh(obj.filepath);
                    }
                });
            }, this);
            selectnode.one('.fp-file-setmain').on('click', function(e) {
                e.preventDefault();
                var params = {};
                var fileinfo = this.selectui.fileinfo;
                params['filepath'] = fileinfo.filepath;
                params['filename'] = fileinfo.fullname;
                selectnode.addClass('loading');
                this.request({
                    action: 'setmainfile',
                    scope: this,
                    params: params,
                    callback: function(id, obj, args) {
                        args.scope.selectui.hide();
                        args.scope.refresh(obj.filepath);
                    }
                });
            }, this);
            selectnode.all('.fp-file-cancel').on('click', function(e) {
                e.preventDefault();
                // TODO if changed asked to confirm, the same with close button
                this.selectui.hide();
            }, this);
        },
        get_parent_folder_name: function(node) {
            if (node.type != 'folder' || node.filepath.length < node.fullname.length+1) { return node.filepath; }
            var basedir = node.filepath.substr(0, node.filepath.length - node.fullname.length - 1);
            var lastdir = node.filepath.substr(node.filepath.length - node.fullname.length - 2);
            if (lastdir == '/' + node.fullname + '/') { return basedir; }
            return node.filepath;
        },
        select_file: function(node) {
            var selectnode = this.filemanager.one('.fp-select');
            selectnode.removeClass('loading').removeClass('fp-folder').
                removeClass('fp-file').removeClass('fp-zip').removeClass('fp-cansetmain');
            if (node.type == 'folder' || node.type == 'zip') {selectnode.addClass('fp-'+node.type);}
            else {selectnode.addClass('fp-file');}
            if (this.enablemainfile && (node.sortorder != 1)) {
                selectnode.addClass('fp-cansetmain');
            }
            this.selectui.fileinfo = node;
            selectnode.one('.fp-saveas input').set('value', node.fullname);
            var foldername = this.get_parent_folder_name(node);
            selectnode.all('.fp-origpath .fp-value').setContent(foldername);
            selectnode.all('.fp-author input').set('value', node.author);
            selectnode.all('.fp-license select option[selected]').set('selected', false);
            selectnode.all('.fp-license select option[value='+node.license+']').set('selected', true);
            selectnode.all('.fp-path select option[selected]').set('selected', false);
            selectnode.all('.fp-path select option').each(function(el){
                if (el.get('value') == foldername) {el.set('selected', true);}
            });
            selectnode.all('.fp-author input').set('disabled','disabled'); //TODO
            selectnode.all('.fp-license select').set('disabled','disabled'); //TODO
            // display static information about a file (when known)
            var attrs = ['datemodified','datecreated','size','dimensions'];
            for (var i in attrs) {
                if (selectnode.one('.fp-'+attrs[i])) {
                    var value = (node[attrs[i]+'_f']) ? node[attrs[i]+'_f'] : (node[attrs[i]] ? node[attrs[i]] : '');
                    selectnode.one('.fp-'+attrs[i]).addClassIf('fp-unknown', ''+value == '')
                        .one('.fp-value').setContent(value);
                }
            }
            // display thumbnail
            var imgnode = Y.Node.create('<img/>').
                set('src', node.realthumbnail ? node.realthumbnail : node.thumbnail).
                setStyle('maxHeight', ''+(node.thumbnail_height ? node.thumbnail_height : 90)+'px').
                setStyle('maxWidth', ''+(node.thumbnail_width ? node.thumbnail_width : 90)+'px');
            selectnode.one('.fp-thumbnail').setContent('').appendChild(imgnode);
            // show panel
            this.selectui.show();
        },
        render: function() {
            this.print_path();
            this.view_files();
        }
    });

    // finally init everything needed
    // hide loading picture, display filemanager interface
    var filemanager = Y.one('#filemanager-'+options.client_id);
    filemanager.removeClass('fm-loading').addClass('fm-loaded');

    var manager = new FileManagerHelper(options);
    var dndoptions = {
        filemanager: manager,
        acceptedtypes: options.accepted_types,
        clientid: options.client_id,
        maxfiles: options.maxfiles,
        maxbytes: options.maxbytes,
        itemid: options.itemid,
        repositories: manager.filepicker_options.repositories,
        containerid: manager.dndcontainer.get('id')
    };
    M.form_dndupload.init(Y, dndoptions);
}