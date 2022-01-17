function() {
            this.questionWidget = dijit.byId("question");
            this.answerWidget = dijit.byId("answers");
            this.hashTagWidget = dijit.byId("hashtags");
            //create preview widget.
            this.previeWidget = this._createPreviewWidget(this._preview);
            //create preview fixed widet.
            this.previewFixedWiget  = this._createPreviewWidget(this._previewFixed);
            if(this.questionWidget
                    || this.answerWidget
                    || this.hashTagWidget
                    ){
                this.initialize();
            } else {
                this.errorLoading();
            }

            // scroll event for IE
            document.addEventListener(!dojo.isMozilla ? "onmousewheel" : "DOMMouseScroll", dojo.hitch(this, this.scroll), false);
            // scroll wheel for
            window.onscroll = dojo.hitch(this, this.scroll);

            //enable auto save.
            if (this.autosave) {
              //publish suport.
              dojo.subscribe("/encuestame/tweetpoll/autosave", this, this._autoSave);
              dojo.subscribe("/encuestame/tweetpoll/block", this, this._block);
              dojo.subscribe("/encuestame/tweetpoll/unblock", this, this._unblock);
              //active auto save.
              this.loadAutoSaveTimer();
              //add comet support on load.
              dojo.addOnLoad(dojo.hitch(this, function(){
                    subscriptionAutoSave  = encuestame.activity.cometd.subscribe('/service/tweetpoll/autosave',
                    dojo.hitch(this, function(message) {
                        //console.info("tweetpoll autosave response", message);
                        this._autoSaveStatus(message);
                    }));
              }));
              //remove comet support on unload.
              dojo.addOnUnload(function() {
                  if(subscriptionAutoSave != null){
                      //console.info("un subsrcibe subscriptionAutoSave service");
                      encuestame.activity.cometd.unsubscribe(subscriptionAutoSave);
                  }
              });
            }

            //tweet poll options

            //live results.
            this.liveResultsWidget = dijit.byId("liveResults");
            this.liveResultsWidget.onChange = dojo.hitch(this, function(event){
              this.tweetPoll.options.liveResults = event;
              dojo.publish("/encuestame/tweetpoll/autosave");
            });

            /*
             * replace by encuestame.org.core.shared.options.DateToClose.
             */
            //scheduled
            this.scheduleWidget = dijit.byId("schedule");
            this.scheduleWidget.onChange = dojo.hitch(this, function(event){
                console.debug("shecduled", event);
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
            });
            //date widget.
            this.scheduledDateWidget = dijit.byId("scheduledDate");
            this.scheduledDateWidget.onChange = dojo.hitch(this, function(event){
                //.debug("Scheduled Date", this.scheduledDateWidget.get("value"));
              this.tweetPoll.options.scheduledDate = encuestame.date.getFormatTime(this.scheduledDateWidget.get("value"),
                      encuestame.date.dateFormat);
              dojo.publish("/encuestame/tweetpoll/autosave");
            });
            //time widget.
            this.scheduledTimeWidget = dijit.byId("scheduledTime");
            this.scheduledTimeWidget.onChange = dojo.hitch(this, function(event){
                //console.debug("Scheduled Time", encuestame.date.getFormatTime(this.scheduledTimeWidget.get("value"),
                 //       encuestame.date.timeFormat));
                this.tweetPoll.options.scheduledTime = encuestame.date.getFormatTime(this.scheduledTimeWidget.get("value"),
                        encuestame.date.timeFormat);
                dojo.publish("/encuestame/tweetpoll/autosave");
            });

            this.captchaWidget = dijit.byId("captcha");
            this.captchaWidget.onChange = dojo.hitch(this, function(event){
                this.tweetPoll.options.captcha = event;
                dojo.publish("/encuestame/tweetpoll/autosave");
            });
            /*
             * end warning.
             */

            //Limit Votes
            /*
             * this code should be replace by encuestame.org.core.shared.options.LimitVotes.
             */
            this.limitVotesWidget = dijit.byId("limitVotes");
            this.limitVotesWidget.onChange = dojo.hitch(this, function(event){
                //console.debug("limitVotesWidget", event);
                if (event) {
                    dojo.removeClass(this._limitNumbers, "defaultDisplayHide");
                } else {
                    dojo.addClass(this._limitNumbers, "defaultDisplayHide");
                }
                this.tweetPoll.options.limitVotes = event;
                dojo.publish("/encuestame/tweetpoll/autosave");
            });
            this.limitNumbersWidget = dijit.byId("limitNumbers");
            this.limitNumbersWidget.onChange = dojo.hitch(this, function(event){
              //console.debug("maxLimitVotes ", this.limitNumbersWidget.get("value"));
              this.tweetPoll.options.maxLimitVotes = this.limitNumbersWidget.get("value");
              dojo.publish("/encuestame/tweetpoll/autosave");
            });
            /*
             * end warning.
             */

            //Allow Repeated Votes.
            /*
             * this code should be replace by encuestame.org.core.shared.options.RepeatedVotes.
             */
            this.ipWidget = dijit.byId("ip");
            this.ipWidget.onChange = dojo.hitch(this, function(event){
                //console.debug("ipWidget", event);
                if (event) {
                    dojo.removeClass(this._repeatedNumbers, "defaultDisplayHide");
                } else {
                    dojo.addClass(this._repeatedNumbers, "defaultDisplayHide");
                }
                this.tweetPoll.options.repeatedVotes = event;
                dojo.publish("/encuestame/tweetpoll/autosave");
            });
            this.repeatedNumbersWidget = dijit.byId("repeatedNumbers");
            this.repeatedNumbersWidget.onChange = dojo.hitch(this, function(event){
              //console.debug("maxLimitVotes ", this.repeatedNumbersWidget.get("value"));
              this.tweetPoll.options.maxRepeatedVotes = this.repeatedNumbersWidget.get("value");
              dojo.publish("/encuestame/tweetpoll/autosave");
            });
            /*
             * end warning.
             */

            //report
            this.resumeWidget = dijit.byId("resume");
            this.resumeWidget.onChange = dojo.hitch(this, function(event){
                //console.debug("resumeWidget ", event);
                this.tweetPoll.options.resumeLiveResults = event;
                dojo.publish("/encuestame/tweetpoll/autosave");
            });
            this.dashboardWidget = dijit.byId("dashboard");
            this.dashboardWidget.onChange = dojo.hitch(this, function(event){
                this.tweetPoll.options.followDashBoard = event;
                dojo.publish("/encuestame/tweetpoll/autosave");
            });
            //button publish event.
            dojo.connect(this._publish, "onClick", dojo.hitch(this, function(event) {
                this._checkPublish();
            }));

            dojo.subscribe("/encuestame/dialog/close", this, this._hideDialog);
            dojo.subscribe("/encuestame/tweetpoll/dialog/error", this, this._showErrorMessage);
            this.enableBlockTweetPollOnProcess();
        }