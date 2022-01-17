function(list){
        var li = $(list_template);
        li.data('id', list.id);
        li.find('> header .name').text(list.name);
        li.find('> ul').empty();

        app.dom.setup(li);

        li.get(0).addEventListener('dragover', function(e){
            e.stopPropagation();
            if (list.id === app.data.dragtask.list.id) {
                return true;
            }
            e.preventDefault();
            return false;
        });
        li.get(0).addEventListener('drop', function(e){
            e.stopPropagation();
            app.api.task.move(app.data.dragtask.list.id, app.data.dragtask.id, list.id);
        }, false);

        var folder = li.find('.icon-folder-open');
        if ("collapse" in app.data.state && list.id in app.data.state.collapse) {
            collapseList(li, true, false);
        }
        folder.click(function(){
            var folder = $(this);
            if (folder.data('closed')) {
                app.fireEvent('collapseList', list, false);
            } else {
                app.fireEvent('collapseList', list, true);
            }
        });

        var mute = li.find('.ui-listmenu .icon-pause').parent();
        if (list.id in app.data.state.mute) {
            mute.addClass('active');
        }
        mute.click(function(){
            var method = mute.hasClass('active') ? 'off' : 'on';
            app.api.account.update({
                ns: 'state',
                method: method,
                key: 'mute',
                val: list.id
            })
            .done(function(data){
                if (data.success === 1) {
                    app.data.state.mute = data.account.state.mute;
                    app.fireEvent('checkMute', list, mute.hasClass('active'));
                    mute[ mute.hasClass('active') ? 'removeClass' : 'addClass' ]('active');
                } else {
                    // 現在 ステータスコード 200 の例外ケースは無い
                }
            });
        });
        if (list.id in app.data.state.tags) {
            li.attr('data-tag', app.data.state.tags[list.id]);
        }
        li.find('.ui-tags a').each(function(i, element){
            var ele = $(element);
            var tag = ele.data('tag');
            if (tag) {
                if ((list.id in app.data.state.tags) &&
                    (tag === app.data.state.tags[list.id])) {
                    ele.addClass('active');
                    li.attr('data-tag', tag);
                }
                ele.click(function(e){
                    var ns = 'state.tags';
                    var method = 'set';
                    var key = list.id;
                    var val = tag;
                    if (ele.hasClass('active')) {
                        ns = 'state';
                        method = 'off';
                        key = 'tags';
                        val = list.id;
                    }
                    app.api.account.update({
                        ns: ns,
                        method: method,
                        key: key,
                        val: val
                    })
                    .done(function(data){
                        if (data.success === 1) {
                            app.data.state.tags = data.account.state.tags;
                            ele.parent().children().removeClass('active');
                            if (method === 'set') {
                                ele.addClass('active');
                                li.attr('data-tag', tag);
                            } else {
                                li.removeAttr('data-tag');
                            }
                            app.fireEvent('checkTag', list, tag, ele.hasClass('active'));
                        } else {
                            // 現在 ステータスコード 200 の例外ケースは無い
                        }
                    });
                });
            }
        });
        li.find('.ui-listmenu .icon-chevron-up').parent().click(function(e){
            var prev = li.prevAll(':first');
            if (prev.length) {
                prev.before(li);
                updateSort();
            }
        });
        li.find('.ui-listmenu .icon-chevron-down').parent().click(function(e){
            var next = li.nextAll(':first');
            if (next.length) {
                next.after(li);
                updateSort();
            }
        });
        li.find('.ui-listmenu .icon-signal').parent().click(function(e){
            app.fireEvent('publicListBegin', list);
        });
        if (list.public_code) {
            li.find('.ui-listmenu .icon-signal').parent().addClass('active');
        }
        li.find('.ui-listmenu .icon-edit').parent().click(function(e){
            app.fireEvent('editList', list);
        });
        li.find('.ui-listmenu .icon-user').parent().click(function(e){
            app.fireEvent('editListMember', list);
        });
        li.find('.ui-normal .ui-edit').click(function(e){
            if (current_task) {
                app.fireEvent('editTask', current_task);
            }
        });
        li.find('.ui-normal .ui-sub').click(function(e){
            if (current_task) {
                app.fireEvent('createSubTask', current_task);
            }
        });
        if (list.original) {
            li.find('.ui-listmenu .icon-remove-sign').parent().attr('disabled', true);
        } else {
            li.find('.ui-listmenu .icon-remove-sign').parent().click(function(e){
                app.fireEvent('deleteListBegin', list);
            });
        }
        var dropdown = li.find('.ui-submenu');
        dropdown.find('> a').click(function(e){
            dropdown.toggleClass('open');
            return false;
        });
        $('html').on('click', function(){
            dropdown.removeClass('open');
        });
        if (list.description) {
            li.find('.ui-description').html(app.util.autolink(list.description, 64).replace(/\r?\n/g, '<br />'));
            li.find('> header .name')
                .css('cursor', 'pointer')
                .append($('<i class="icon-info-sign"/>'))
                .click(function(e){
                    li.find('.ui-description').slideToggle();
                });
        }

        if (list.members.length) {
            var members = [list.owner].concat(list.members);
            for (var i = 0, max_i = members.length; i < max_i; i++) {
                var account_id = members[i];
                if (!(account_id in app.data.users)) {
                    continue;
                }
                var condition = { turn: account_id, list_id: list.id };
                var icon = app.util.getIcon(account_id, 26);
                icon.data('account_id', account_id);
                // var count = $('<div class="count"/>');
                // count.data('counter-condition', condition);
                // app.setup.memberCounter(count);
                var li2 = $('<li/>')
                    .append(icon)
                    // .append(count)
                    .data('id', account_id)
                    .data('filter-condition', condition)
                    .click(function(e){
                        e.preventDefault();
                        var li2 = $(this);
                        var reset = li2.hasClass('active');
                        li2.parent().children().removeClass('active');
                        if (reset) {
                            app.fireEvent('filterTask', app.data.current_filter);
                        } else {
                            app.fireEvent('memberTask', li2.data('filter-condition'));
                            li2.addClass('active');
                        }
                        li2.parent().toggleClass('active-filter', li2.hasClass('active'));
                    })
                    // .dblclick(function(e){
                    //     e.preventDefault();
                    //     app.fireEvent('createTask', list, $(this).data('id'));
                    // })
                    .addClass('member')
                    .appendTo(li.find('ul.members'));
            }
        }

        if (list.id in app.data.listli_map) {
            li.find('> ul.tasks').append(
                app.data.listli_map[list.id].find('> ul.tasks').children());
            li.css('display', app.data.listli_map[list.id].css('display'));
            if (app.data.listli_map[list.id].find('.icon-folder-close').length) {
                li.find('.icon-folder-open').data('closed', true);
                li.find('.icon-folder-open').removeClass('icon-folder-open').addClass('icon-folder-close');
                li.addClass('task-collapse');
            }
            app.data.listli_map[list.id].after(li);
            app.data.listli_map[list.id].remove();
        } else {
            li.prependTo(ul);
        }
        app.data.listli_map[list.id] = li;
    }