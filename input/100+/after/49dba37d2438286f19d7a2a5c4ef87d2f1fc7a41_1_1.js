function(event){
                //console.debug("shecduled", event);
                if (event) {
                    dojo.removeClass(this._scheduledTime, "defaultDisplayHide");
                    dojo.removeClass(this._scheduledDate, "defaultDisplayHide");
                } else {
                    dojo.addClass(this._scheduledTime, "defaultDisplayHide");
                    dojo.addClass(this._scheduledDate, "defaultDisplayHide");
                }
                this.tweetPoll.options.scheduledTime = encuestame.date.getFormatTime(new Date(),
                        encuestame.date.timeFormat);
                this.scheduledDateWidget.set("value", new Date());
                this.scheduledTimeWidget.set("value", new Date());
                this.tweetPoll.options.scheduledTime = encuestame.date.getFormatTime(new Date(),
                        encuestame.date.timeFormat);
                this.tweetPoll.options.scheduledDate = encuestame.date.getFormatTime(new Date(),
                        encuestame.date.dateFormat);
                this.tweetPoll.options.scheduled = event;
                dojo.publish("/encuestame/tweetpoll/autosave");
            }