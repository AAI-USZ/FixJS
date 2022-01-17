function(data) {
            	this.loading_hide();
                var i = dojo.indexOf(this.parentAnswer.listItems, this);
                console.debug("removing answer", i);
                this.parentAnswer.listItems.splice(i, 1);
                dojo.publish("/encuestame/tweetpoll/updatePreview");
                dojo.destroy(this.domNode, true);
            }