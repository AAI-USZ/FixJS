function() {
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
        }