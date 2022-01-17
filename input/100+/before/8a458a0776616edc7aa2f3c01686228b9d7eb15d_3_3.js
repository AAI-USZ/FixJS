function() {
             var params = {
                     "id" : this.tweetPollId,
                     "answerId" : this.answer.answerId
            };
            var load = dojo.hitch(this, function(data) {
                var i = dojo.indexOf(this.parentAnswer.listItems, this);
                console.debug("removing answer", i);
                this.parentAnswer.listItems.splice(i, 1);
                dojo.publish("/encuestame/tweetpoll/updatePreview");
                dojo.destroy(this.domNode, true);
            });
            var error = function(error) {
                dojo.publish("/encuestame/tweetpoll/dialog/error", [error]);
            };
            encuestame.service.xhrGet(
                    encuestame.service.list.removeAnswer, params, load, error);
        }