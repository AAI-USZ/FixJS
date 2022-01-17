function(resp) {
                    if (resp.Comments.length != 0) {
                        if ($(this).find('.tasks-bugs')[0] == undefined) {
                            /* we need to add the .tasks-bugs div */
                            var tbd = $('<div class="tasks-bugs"></div>');
                            if ($(this).find('.kanban-avatars')[0] == undefined) {
                                /* we need to position around an avatar */
                                tbd.addClass('tasks-bugs-left');
                            }
                            $(this).append(tbd);
                        }
                        $(this).find('.tasks-bugs').append('<a href="'+appHostAndPath+'/View.aspx?id='+itemId+'" class="commentCount">'+resp.Comments.Items.length+'</a>');
                    }
                }