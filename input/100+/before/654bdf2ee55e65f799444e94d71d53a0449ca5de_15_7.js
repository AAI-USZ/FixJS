function (e) {
                e.preventDefault();
                app.groupUserRouter.navigate($(this).attr('href'), { trigger: true });
                return false;
            }