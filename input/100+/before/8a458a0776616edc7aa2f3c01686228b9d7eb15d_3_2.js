function() {
            //dojo.publish("/encuestame/tweetpoll/autosave");
            var text = dijit.byId(this._suggest);
            var params = {
                    "id" : this.tweetPollId,
                    "answer" : text.get("value"),
                    "shortUrl" : encuestame.shortUrlProvider[1].code
               };
               //console.debug("params", params);
               var load = dojo.hitch(this, function(data){
                   console.debug(data);
                   var items = [];
                   var answerWidget = new encuestame.org.core.commons.tweetPoll.AnswerItem({
                       answer :{
                           answerId : data.success.newAnswer.answer.answer_id,
                           label: data.success.newAnswer.answer.answers,
                           shortUrl : data.success.newAnswer.short_url,
                           provider: encuestame.shortUrlProvider[1]
                      },
                      parentAnswer : this,
                      tweetPollId : this.tweetPollId
                   });
                   items.push(answerWidget.domNode);
                   this.listItems.push(answerWidget);
                   this.answerSource.insertNodes(false, items);
                   text.set('value', "");
                   dojo.publish("/encuestame/tweetpoll/updatePreview");
               });
               var error = function(error) {
                   dojo.publish("/encuestame/tweetpoll/dialog/error", [error]);
               };
               if (this.tweetPollId != null) {
                   encuestame.service.xhrGet(encuestame.service.list.addAnswer, params, load, error);
               } else {
                   dojo.publish("/encuestame/tweetpoll/dialog/error", [encuestame.constants.errorCodes["024"]]);
               }
        }