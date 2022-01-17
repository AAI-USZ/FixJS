function() {
            var client_id = this.options.client_id;
            var toolbar = this.fpnode.one('.fp-toolbar');
            toolbar.one('.fp-tb-logout').one('a,button').on('click', function(e) {
                e.preventDefault();
                if (!this.active_repo.nologin) {
                    this.hide_header();
                    this.request({
                        action:'logout',
                        client_id: this.options.client_id,
                        repository_id: this.active_repo.id,
                        path:'',
                        callback: this.display_response
                    }, true);
                }
            }, this);
            toolbar.one('.fp-tb-refresh').one('a,button').on('click', function(e) {
                e.preventDefault();
                if (!this.active_repo.norefresh) {
                    this.list();
                }
            }, this);
            toolbar.one('.fp-tb-search form').
                set('method', 'POST').
                set('id', 'fp-tb-search-'+client_id).
                on('submit', function(e) {
                    e.preventDefault();
                    if (!this.active_repo.nosearch) {
                        this.request({
                            scope: this,
                            action:'search',
                            client_id: this.options.client_id,
                            repository_id: this.active_repo.id,
                            form: {id: 'fp-tb-search-'+client_id, upload:false, useDisabled:true},
                            callback: this.display_response
                        }, true);
                    }
                }, this);

            // it does not matter what kind of element is .fp-tb-manage, we create a dummy <a>
            // element and use it to open url on click event
            var managelnk = Y.Node.create('<a/>').
                setAttrs({id:'fp-tb-manage-'+client_id+'-link', target:'_blank'}).
                setStyle('display', 'none');
            toolbar.append(managelnk);
            toolbar.one('.fp-tb-manage').one('a,button').
                on('click', function(e) {
                    e.preventDefault();
                    managelnk.simulate('click')
                });

            // same with .fp-tb-help
            var helplnk = Y.Node.create('<a/>').
                setAttrs({id:'fp-tb-help-'+client_id+'-link', target:'_blank'}).
                setStyle('display', 'none');
            toolbar.append(helplnk);
            toolbar.one('.fp-tb-manage').one('a,button').
                on('click', function(e) {
                    e.preventDefault();
                    helplnk.simulate('click')
                });
        }