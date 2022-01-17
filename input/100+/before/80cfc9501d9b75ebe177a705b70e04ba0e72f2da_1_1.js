function(/* widget */ question) {
                //remove old question
                dojo.empty(this._content);
                if (this._questionBox.node == null) {
                  this._questionBox.node = dojo.doc.createElement("span");
                  dojo.addClass(this._questionBox.node, "previewQuestion");
                  this._questionBox.innerHTML = "";
                  this._questionBox.initialize = true;
                }
                if (question) {
                  var newPreview = question.get("value");
                  //question
                  this._questionBox.node.innerHTML = newPreview;
                  this._completeText = newPreview;
                }
                if (question.get("value") != "") {
                    this._content.appendChild(this._questionBox.node);
                }
            }