function () {
            var that = this;
            $(this.el).children('a').on('click', function (e) {
                e.preventDefault();
                app.groupUserRouter.navigate($(this).attr('href'), { trigger: true });
                that.activityCount = 0;
                that.$el.find('p span').remove();
                return false;
            });

            app.vent.on('newactivity:' + this.model.id + ':observationadded newactivity:' + this.model.id + ':postadded newactivity:' + this.model.id + ':observationnoteadded', this.onNewActivityReceived, this);
        }