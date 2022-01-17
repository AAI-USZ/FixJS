function(task, forceTop){
        if (!ul.is(':visible')) { return }

        ul.find('> li > ul > li').removeClass('selected');
        ul.find('> li > header .ui-edit, > li > header .ui-sub').attr('disabled', true);
        if (task.id in app.data.taskli_map) {
            app.data.taskli_map[task.id].addClass('selected');
            app.data.taskli_map[task.id].parent().parent()
                .find('> header .ui-edit, > header .ui-sub').attr('disabled', false);
            app.dom.scrollTopFix(ul.parent(), app.data.taskli_map[task.id], forceTop);
        }
        current_task = task;
    }