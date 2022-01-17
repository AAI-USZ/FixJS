function() {
            /*
             * parameters.
             */ 
        	var params = {
                     "id" : this.tweetPollId,
                     "answerId" : this.answer.answerId
            };
            /*
             * on success
             */
            var load = dojo.hitch(this, function(data) {
            	this.loading_hide();
                var i = dojo.indexOf(this.parentAnswer.listItems, this);
                console.debug("removing answer", i);
                this.parentAnswer.listItems.splice(i, 1);
                dojo.publish("/encuestame/tweetpoll/updatePreview");
                dojo.destroy(this.domNode, true);
            });
            
            /*
             * on error.
             */
            var error = function(error) {
            	this.loading_show();
                dojo.publish("/encuestame/tweetpoll/dialog/error", [error]);
            };
            //this.loadingRef.show();
            encuestame.service.xhrGet(
                    encuestame.service.list.removeAnswer, params, load, error);
        }