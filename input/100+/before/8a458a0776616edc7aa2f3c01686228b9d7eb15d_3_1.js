function() {
             this.buttonWidget = new dijit.form.Button({
                 label: "Add",
                 onClick: dojo.hitch(this, function(event) {
                     dojo.stopEvent(event);
                     this.addAnswer();
                 })
             },
             this._addButton);
             this.answerSource  = new dojo.dnd.Source(this._listAnswers, {
                 accept: [],
                 copyOnly: false,
                 selfCopy : false,
                 selfAccept: true,
                 withHandles : false,
                 autoSync : true,
                 isSource : true
              });
             dojo.connect(this.answerSource, "onDrop", this, this.onDrop);
             // on key up.
             dojo.connect(this._suggest, "onKeyUp", dojo.hitch(this, function(e) {
                 if (dojo.keys.ENTER == e.keyCode) {
                     this.addAnswer();
                 }
             }));
             this.enableBlockTweetPollOnProcess();
        }