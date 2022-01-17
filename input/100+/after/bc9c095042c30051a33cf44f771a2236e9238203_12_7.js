function() {
            if (sakai_global.profile.main.data.userid === sakai.data.me.user.userid) {
                mymemberships.isOwnerViewing = true;
                render(sakai.api.Groups.getMemberships(sakai.data.me.groups));
            } else {
                sakai.api.Server.loadJSON('/system/me', function(success, data) {
                    mymemberships.isOwnerViewing = false;
                    render(sakai.api.Groups.getMemberships(data.groups));
                }, { uid: sakai_global.profile.main.data.userid });
            }
            sakai.api.Util.TemplateRenderer('mymemberships_title_template', {
                isMe: mymemberships.isOwnerViewing,
                user: sakai_global.profile.main.data.basic.elements.firstName.value
            }, $('#mymemberships_title_container', $rootel));

            uncheckAll();

            $('.s3d-listview-options', $rootel).find('div').removeClass('selected');
            mymemberships.listStyle = $.bbq.getState('ls') || 'list';
            if (mymemberships.listStyle === 'list') {
                $('#mymemberships_items', $rootel).removeClass('s3d-search-results-grid');
                $mymemberships_show_list.addClass('selected');
                $mymemberships_show_list.children().addClass('selected');
            } else {
                $('#mymemberships_items', $rootel).addClass('s3d-search-results-grid');
                $mymemberships_show_grid.addClass('selected');
                $mymemberships_show_grid.children().addClass('selected');
            }
        }