function(appenditems) {
            this.viewbar_set_enabled(true);
            this.print_path();
            /*if ((appenditems == null) && (!this.filelist || !this.filelist.length) && !this.active_repo.hasmorepages) {
             // TODO do it via classes and adjust for each view mode!
                // If there are no items and no next page, just display status message and quit
                this.display_error(M.str.repository.nofilesavailable, 'nofilesavailable');
                return;
            }*/
            if (this.viewmode == 2) {
                this.view_as_list(appenditems);
            } else if (this.viewmode == 3) {
                this.view_as_table(appenditems);
            } else {
                this.view_as_icons(appenditems);
            }
            // display/hide the link for requesting next page
            if (!appenditems && this.active_repo.hasmorepages) {
                if (!this.fpnode.one('.fp-content .fp-nextpage')) {
                    this.fpnode.one('.fp-content').append(M.core_filepicker.templates.nextpage);
                }
                this.fpnode.one('.fp-content .fp-nextpage').one('a,button').on('click', function(e) {
                    e.preventDefault();
                    this.fpnode.one('.fp-content .fp-nextpage').addClass('loading');
                    this.request_next_page();
                }, this);
            }
            if (!this.active_repo.hasmorepages && this.fpnode.one('.fp-content .fp-nextpage')) {
                this.fpnode.one('.fp-content .fp-nextpage').remove();
            }
            if (this.fpnode.one('.fp-content .fp-nextpage')) {
                this.fpnode.one('.fp-content .fp-nextpage').removeClass('loading');
            }
            this.content_scrolled();
        }