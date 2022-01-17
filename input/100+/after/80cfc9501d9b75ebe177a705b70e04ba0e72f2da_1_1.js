function(/* widget */ question) {
                //remove old question
            	dojo.empty(this._content);
            	var newQuestionValue = question.get("value");
            	// by first time it's necessary save the node.
                if (this._questionBox.node == null) {
                  this._questionBox.node = dojo.create("span");
                  dojo.addClass(this._questionBox.node, "previewQuestion");
                  this._questionBox.innerHTML = "";
                  this._questionBox.initialize = true;
                }                
                if (question) {
                  var newPreview = newQuestionValue;
                  //question
                  this._questionBox.node.innerHTML = newPreview;
                  this._completeText = newPreview || "";
                }
                if (newQuestionValue != "") {
                    this._content.appendChild( dojo.clone(this._questionBox.node));
                }
            }