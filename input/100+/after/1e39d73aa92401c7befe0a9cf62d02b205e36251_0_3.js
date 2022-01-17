function () {
    'use strict';


    var Prompt, makeFreshId;

    // WeSchemeInteractions: div (WeSchemeInteractions -> void) -> WeScheme
    var WeSchemeInteractions = function(interactionsDiv,
                                        afterInit) {
        var that = this;
        this.interactionsDiv = jQuery(interactionsDiv);
        this.interactionsDiv.empty();

        this.previousInteractionsDiv = document.createElement("div");
        this.previousInteractionsTextContainers = {};
        this.interactionsDiv.append(this.previousInteractionsDiv);

        new Prompt(
            this,
            this.interactionsDiv,
            function(prompt) {
                that.prompt = prompt;
                that.evaluator = that.makeFreshEvaluator();
                that.highlighter = function(id, offset, span, color) {
                    // default highlighter does nothing.  Subclasses will specialize that.
                };

                // Note: When starting a new prompt, the last element of
                // "historyArray" is always an empty string, and "historyIndex"
                // is the index of the last element in "historyArray".
                // When recalling history, the last element of "historyArray"
                // can be set to the line being edited (if different from the
                // history it recalls), so that a user can back out of the
                // history recall to return to the edited line.
                prompt.historyArray = [""];
                prompt.historyIndex = 0;
                prompt.maxSavedHistory = 100;

                if (afterInit) {
                    afterInit(that);
                }
            }
        );
    };

    // reset: -> void
    // Clears out the interactions.
    WeSchemeInteractions.prototype.reset = function() {
        var that = this;
        this.notifyBus("before-reset", this);
        this.evaluator = that.makeFreshEvaluator();
        jQuery(this.previousInteractionsDiv).empty();
        this.notifyBus("after-reset", that);
        this.prompt.clear();
    };

    // clearLine: -> void
    // Make sure we're on a line that's clear of any floats.
    WeSchemeInteractions.prototype.clearLine = function() {
        var clearDiv = document.createElement("div");
        clearDiv.style.clear = 'left';
        this.addToInteractions(clearDiv);
    };

    // Sets the text in the prompt.
    WeSchemeInteractions.prototype.setPromptText = function(t) {
        this.prompt.setText(t);
    };

    //////////////////////////////////////////////////////////////////////
    Prompt = function(interactions, parentDiv, K) {
        var that = this;
        this.interactions = interactions;
        this.div = jQuery("<div><span class='top-aligned-inline-block'>&gt;&nbsp;</span><span class='top-aligned-inline-block' style='width: 90%'/></div>");
        parentDiv.append(this.div);

        var innerDivElt = this.div.find("span").get(1);
        new plt.wescheme.WeSchemeTextContainer(
            innerDivElt,
            { dynamicHeight: true,
              lineNumbers: false,
              theme: "scheme-interactive",
              //stylesheet: "/js/codemirror/contrib/scheme/css/schemecolors-interactive.css",
              makeTransparentIframe: true,
              extraKeys: {
            	  "Enter":function (ed) {
            		  if (that.hasCompleteExpression()) {
            			  that.onEvaluation();
            		  } else {
            			  CodeMirror.commands.newlineAndIndent(ed);
            		  }
            	  },
            	  "Ctrl-N":function (ed) {
            		  that.onHistoryNext();
            	  },
            	  "Ctrl-P":function (ed) {
            		  that.onHistoryPrevious();
            	  },
            	  "Alt-N":function (ed) {
            		  that.onHistoryNext();
            	  },
            	  "Alt-P":function (ed) {
            		  that.onHistoryPrevious();
            	  }
              }},
            function(container) {
                that.textContainer = container;

                if (K) {
                    K(that);
                }
            });
    };

    Prompt.prototype.onEvaluation = function() {
        this.saveHistoryWithCleanup();
        var that = this;
        var nextCode = that.textContainer.getCode();
        that.textContainer.setCode("");

        var parentDiv = document.createElement('div');

        var promptSpan = document.createElement('span');
        promptSpan.className = 'top-aligned-inline-block';
        promptSpan.appendChild(document.createTextNode(">"));

        var textareaSpan = document.createElement("span");
        textareaSpan.className = 'top-aligned-inline-block';
        textareaSpan.style.width = '90%';

        parentDiv.appendChild(promptSpan);
        parentDiv.appendChild(document.createTextNode(" "));
        parentDiv.appendChild(textareaSpan);
        that.interactions.addToInteractions(parentDiv);

        that.interactions.clearLine();

        // // FIXME: figure out how to get the line height
        // dynamically, because I have no idea how to do
        // this correctly at the moment.
        var n = new plt.wescheme.WeSchemeTextContainer(
            textareaSpan,
            {   dynamicHeight: true,
                lineNumbers: false,
                theme: "scheme-interactive",
                //stylesheet: "/js/codemirror/contrib/scheme/css/schemecolors-interactive.css",
                content: nextCode,
                makeTransparentIframe: true,
                readOnly: true },
            function(container) {
                var newId = makeFreshId();
                that.interactions.previousInteractionsTextContainers[newId] = container;
                that.interactions.runCode(nextCode, newId, function() {});
            });
        //calling that.focus() doesn't work - the codeMirror box looks focused, but you can't type into it
        //if I focus on something else first, everything works fine
        n.focus();
        that.focus();
    };

    // TODO: historyPreviousIsOk and historyNextIsOk don't have to be methods.

    Prompt.prototype.historyPreviousIsOk = function(index, length) {
        return (index > 0);
    };

    Prompt.prototype.historyNextIsOk = function(index, length) {
        return ((length - index) > 1);
    }

    Prompt.prototype.onHistoryPrevious = function() {
        this.doHistory(-1, this.historyPreviousIsOk);
    };

    Prompt.prototype.onHistoryNext = function() {
        this.doHistory(1, this.historyNextIsOk);
    };

    Prompt.prototype.doHistory = function(increment, incrementIsOk) {
        if (this.historyArray.length > 1) {
            var code = jQuery.trim(this.textContainer.getCode());
            if (code === this.historyArray[this.historyIndex]) {
                // The code *is* the same as the history slot, so do the increment if OK.
                if (incrementIsOk(this.historyIndex, this.historyArray.length)) {
                    this.doHistoryPart2(increment);
                }
            } else {
                // The code is *not* the same as the history slot, so,
                // if increment will be OK if we update the last slot
                // with the current code, then update the last slot and
                // then do the increment.
                var tentativeIndex = (this.historyArray.length - 1);
                if (incrementIsOk(tentativeIndex, this.historyArray.length)) {
                    this.historyIndex = tentativeIndex;
                    this.historyArray[this.historyIndex] = code;
                    this.doHistoryPart2(increment);
                }
            }
        }

    };

    Prompt.prototype.doHistoryPart2 = function(increment) {
        this.historyIndex += increment;
        this.textContainer.setCode(this.historyArray[this.historyIndex]);
        // TODO: !!! setCursorToEnd doesn't yet work.
        this.textContainer.setCursorToEnd();
    };

    Prompt.prototype.saveHistoryWithCleanup = function() {
        var newEntry = jQuery.trim(this.textContainer.getCode());
        var lastIndex = (this.historyArray.length - 1);
        this.historyArray[lastIndex] = newEntry;
        var prevEntry = ((lastIndex < 1) ? null : this.historyArray[lastIndex - 1]);
        if (prevEntry && (prevEntry === newEntry)) {
            // The new entry is the same as the previous, so fall through and
            // let the new entry be reset to a blank.
        } else if (newEntry === "") {
            // New entry is already blank, so don't need to add a new one.
        } else {
            // Need to add a blank to historyArray, so shrink historyArray
            // if necessary, and then add blank.
            var shiftCount = Math.max(0, (this.historyArray.length - this.maxSavedHistory));
            while (shiftCount > 0) {
                this.historyArray.shift();
                shiftCount--;
            }
            // Note: We are setting lastIndex to one greater than the
            // current last index, so that our use of it in as an array
            // index in lhs of assignment below will result in appending to
            // the array.
            lastIndex = this.historyArray.length;
        }
        this.historyArray[lastIndex] = "";
        this.historyIndex = lastIndex;
    };

    // hasExpressionToEvaluate: -> boolean
    // Return true if the prompt contains a complete expression
    Prompt.prototype.hasCompleteExpression = function() {
        var codePastCursor = this.textContainer.getCode(this.textContainer.getCursorStartPosition());
        if (codePastCursor.match(new RegExp("[^\\s]"))) {
            return false;
        }
        var codeUpToCursor = this.textContainer.getCode(0, this.textContainer.getCursorStartPosition());
        return plt.wescheme.tokenizer.hasCompleteExpression(codeUpToCursor);
    };



    Prompt.prototype.setText = function(t) {
        this.textContainer.setCode(t);
    };

    Prompt.prototype.clear = function() {
        this.textContainer.setCode("");
    };

    Prompt.prototype.getDiv = function() {
        return this.div;
    };

    Prompt.prototype.hide = function() {
        this.div.hide();
    };

    Prompt.prototype.show = function() {
        this.div.show();
    };

    Prompt.prototype.focus = function() {
        this.interactions._scrollToBottom();
        this.textContainer.focus();
    };

    //////////////////////////////////////////////////////////////////////

    WeSchemeInteractions.prototype.makeFreshEvaluator = function() {
        var that = this;
        var evaluator = new Evaluator({
            write: function(thing) {
                that.addToInteractions(thing);
            },
            transformDom : function(dom) {
                var result = that._transformDom(dom);
                return result;
            },
            compilationServletUrl: "/compile",
            scriptCompilationServletUrl: plt.wescheme.WeSchemeProperties.compilation_server_url
        });
        evaluator.makeToplevelNode = function() {
            var dialog = jQuery("<div/>");
            var handleClose = function(event, ui) {
                that.evaluator.requestBreak();
            };

            dialog.dialog( {
                bgiframe : true,
                position: ["left", "top"],
                modal : true,
                width: "auto",
                height: "auto",
                beforeclose: handleClose,
                resizable: false,
                closeOnEscape: true
            });

            var innerArea = jQuery("<div class='evaluatorToplevelNode'></div>");
            dialog.append(innerArea);
            dialog.dialog("open");
            return innerArea.get(0);
        };
	evaluator.setImageProxy("/imageProxy");
        evaluator.setRootLibraryPath("/js/mzscheme-vm/collects");
        evaluator.setDynamicModuleLoader(function(aName, onSuccess, onFail) {
            loadScript(this.rootLibraryPath + "/" + aName + "-min.js",
                       onSuccess,
                       onFail);
        });

        return evaluator;
    };


    WeSchemeInteractions.prototype.focusOnPrompt = function() {
        this.prompt.focus();
    };

    WeSchemeInteractions.prototype.notifyBus = function(action, data) {
        if (typeof plt.wescheme.WeSchemeIntentBus != 'undefined') {
            plt.wescheme.WeSchemeIntentBus.notify("after-reset", this);
        }
    };

    WeSchemeInteractions.prototype.setSourceHighlighter = function(highlighter) {
        this.highlighter = highlighter;
    };
    
    WeSchemeInteractions.prototype.setAddToCurrentHighlighter = function(addToCurrentHighlighter) {
        this.addToCurrentHighlighter = addToCurrentHighlighter;
    };
    

    // Returns if x is a dom node.
    function isDomNode(x) {
        return (x.nodeType != undefined);
    }

    // addToInteractions: string | dom-node -> void
    // Adds a note to the interactions.
    WeSchemeInteractions.prototype.addToInteractions = function (interactionVal) {
        var that = this;
        this.notifyBus("before-add-to-interactions", this);
        if (isDomNode(interactionVal)) {
            this.previousInteractionsDiv.appendChild(interactionVal);
        } else {
            var newArea = jQuery("<div style='width: 100%'></div>");
            newArea.text(interactionVal);
            this.previousInteractionsDiv.appendChild(newArea.get(0));
        }
        this._scrollToBottom();
        this.notifyBus("after-add-to-interactions", this);
    };



    WeSchemeInteractions.prototype._scrollToBottom = function() {
        this.interactionsDiv.attr(
            "scrollTop", 
            this.interactionsDiv.attr("scrollHeight"));
    };

    WeSchemeInteractions.prototype._transformDom = function(dom) {
        if (helpers.isLocationDom(dom)) {
            return this._rewriteLocationDom(dom);
        } else {
            return dom;
        }
    };

    WeSchemeInteractions.prototype._rewriteLocationDom = function(dom) {
        var newDom = document.createElement("span");
        var children = dom.children;
        var offset, id, span, color;
        for (var i = 0; i < children.length; i++) {
            var textBody = children[i].textContent || children[i].innerText;
            if (children[i]['className'] === 'location-id') {
                id = textBody;
            }
            if (children[i]['className'] === 'location-offset') {
                offset = textBody;
            }
            if (children[i]['className'] === 'location-span') {
                span = textBody;
            }
            if (children[i]['className'] === 'location-color') {
                color = textBody;
            }

        }
         if(!color) { color = "red"; }//FIXME!
	  // console.log("_rewriteLocation " + color);
        return this.createLocationHyperlink({ id: id,
                                              offset: parseInt(offset),
                                              span: parseInt(span),
					      color: color});
    };

    // Evaluate the source code and accumulate its effects.
    WeSchemeInteractions.prototype.runCode = function(aSource, sourceName, contK) {
        this.notifyBus("before-run", this);
        var that = this;
        this.disableInput();
        this.evaluator.executeProgram(sourceName,
                                      aSource,
                                      function() { 
                                          that.enableInput();
                                          that.focusOnPrompt();
                                          contK();
                                      },
                                      function(err) { 
                                          that.handleError(err); 
                                          that.enableInput();
                                          that.focusOnPrompt();
                                          contK();
                                      });
    };

    WeSchemeInteractions.prototype.handleError = function(err) {
        this.addToInteractions(this.renderErrorAsDomNode(err));
        this.addToInteractions("\n");
    };

    //nextColor: int float -> int
    //takes in a rgb color from 0 to 255 and a percentage to tint by, 
    //  outputs the tinted color as an int
    var nextColor = function(color, percentage) {
	return parseInt(percentage*color + (255 * (1 - percentage)));
    };
    
    //nextTint: int int int float -> string
    //given rgb ints and a percentage to tint, returns the rgb string of the tinted color
    var nextTint = function(red, green, blue, percentage) {
	return "rgb(" + nextColor(red, percentage) + "," + nextColor(green, percentage) + "," 
				      + nextColor(blue, percentage) + ")";
    };
 
    
    var Color = function(red, green, blue) {
	this.red = red;
	this.green = green;
	this.blue = blue;
    };
    
    Color.prototype.toString = function() {
	   return "rgb(" + this.red +"," + this.green + "," + this.blue + ")";
      
    };

    //proper order is id offset line column span
    //badLocs is in   col id line offset span
   var fixLoc = function(badLocs) {
        var fixed = [];
        fixed.push(badLocs.id);
        fixed.push(parseInt(badLocs.offset));
        fixed.push(parseInt(badLocs.line));
        fixed.push(parseInt(badLocs.column));
        fixed.push(parseInt(badLocs.span));
        return types.vector(fixed);
   };

    //return array of fixed locs
   var fixLocList = function(badLocList) {

    var toReturn = [];
    for (var i =0; i < badLocList.length; i++) {
        toReturn.push(fixLoc(badLocList[i]));
    }
    return toReturn;
   };

    //structuredError -> Message
    var structuredErrorToMessage = function(se) {
	    console.log('structuredErrorToMessage');
        var msg = [];
        console.log(se);
        for(var i = 0; i < se.length; i++){
            if(typeof(se[i]) === 'string') {
                msg.push(se[i]);
            }
            else if(se[i].type === "ColoredPart"){
                //console.log("bad locs: ", fixLoc(se[i].loc));
                msg.push(new types.ColoredPart(se[i].text, fixLoc(se[i].loc)));
            }

            else if(se[i].type === "MultiPart"){
                console.log("bad locs list: ", se[i].locs);
                msg.push(new types.MultiPart(se[i].text, fixLocList(se[i].locs)));

            }
            else msg.push(se[i]+'');

        }
        return new types.Message(msg);
    };
    

    // Special multi-color highlighting
    var specialFormatting = function(that, msgDom, msg) {
	console.log("goes here too");
	var colors = [new Color(238,169,184), new Color(100, 149, 240), new Color(124,205,124), 
		      new Color(218,165,32), new Color(186,186,186)];
	var colorIndex = 0; //WARNING
	
	var currItem;
	var currColor = colors[colorIndex];
	var args = msg.args;
	for(var i = 0; i < args.length; i++){
	    //in the unlikely event that there are no more preset colors, choose a random one
	    if(colorIndex >= colors.length){
		currColor = new Color(Math.floor(Math.random()*255), 
				      Math.floor(Math.random()*255), 
				      Math.floor(Math.random()*255));
	    }
	    else currColor = colors[colorIndex];
	    
	    if(types.isColoredPart(args[i])) {
		currItem = args[i].location;
		console.log("currItem is ", currItem);
		that.addToCurrentHighlighter(currItem.ref(0), currItem.ref(1), currItem.ref(4), currColor+'');
		
		var aChunk = jQuery("<span/>").text(args[i].text).css("background-color", currColor+'');
		jQuery(msgDom).append(aChunk);
		
		colorIndex++;
	    } else if(types.isGradientPart(args[i])) {
		var parts = args[i].coloredParts;
		
		var percentage = 1;
		var change = 1/(parts.length+1);
		
		var currTint;
		for(var j = 0; j < parts.length; j++) {
		    
		    currItem = parts[j];
		    currTint = nextTint(currColor.red, currColor.green, currColor.blue, percentage);
		    
		    that.addToCurrentHighlighter(currItem.location.ref(0), currItem.location.ref(1), currItem.location.ref(4), 
						 currTint);
		    
		    var aChunk = jQuery("<span/>").text(currItem.text).css("background-color", currTint);
		    jQuery(msgDom).append(aChunk);		     
		    percentage = percentage - change;
		}
		
		colorIndex++;
	    }
	    
	    else if(types.isMultiPart(args[i])) {
		var locs = args[i].locations;
		
		for(var j = 0; j <locs.length; j++){
		    that.addToCurrentHighlighter(locs[j].ref(0), locs[j].ref(1), locs[j].ref(4), 
						 currColor);
		}
		var aChunk = jQuery("<span/>").text(args[i].text).css("background-color", currColor+'');
		jQuery(msgDom).append(aChunk);
		
		colorIndex++;
	    } else {
		msgDom.appendChild(document.createTextNode(args[i]+''));
	    }
	}	
    };



    // renderErrorAsDomNode: exception -> element
    // Given an exception, produces error dom node to be displayed.
    WeSchemeInteractions.prototype.renderErrorAsDomNode = function(err) {
        var that = this;
        var msg;
        var dom = document.createElement('div');
        if (types.isSchemeError(err) && types.isExnBreak(err.val)) {
            dom['className'] = 'moby-break-error';
            msg = "Program stopped by user (user break)";
        } 
        else {
            dom['className'] = 'moby-error';
            msg = this.evaluator.getMessageFromExn(err);
        }
        var msgDom = document.createElement('div');
        msgDom['className'] = 'moby-error:message';
        if (err.domMessage) {
		    console.log('domMessage');
            if(! err.structuredError){
                dom.appendChild(err.domMessage);
            } else {
                msg = structuredErrorToMessage(err.structuredError);
			}
		}
				
				
				
		if (! types.isMessage(msg)) {
            msgDom.appendChild(document.createTextNode(msg));
        } else {
		    //if it is a Message, do special formatting
            specialFormatting(that, msgDom, msg);
        }
        dom.appendChild(msgDom);
	
	
        var stacktrace = this.evaluator.getTraceFromExn(err);
        var stacktraceDiv = document.createElement("div");
        stacktraceDiv['className'] = 'error-stack-trace';
        for (var i = 0; i < stacktrace.length; i++) {
            var anchor = this.createLocationHyperlink(stacktrace[i]);
            stacktraceDiv.appendChild(anchor);
        }
        
        dom.appendChild(stacktraceDiv);
	
        return dom;
    };

    // createLocationHyperlink: location (or dom undefined) -> paragraph-anchor-element
    // Produce a hyperlink that, when clicked, will jump to the given location on the editor.
    // FIXME: should this really wrap a paragraph around a link?  The client
    // really should be responsible for layout issues instead....
    WeSchemeInteractions.prototype.createLocationHyperlink = function(aLocation, anchorBodyDom) {
        console.log("aLocation is ", aLocation);
        if (! anchorBodyDom) {
            anchorBodyDom = document.createTextNode(
                "at: line " + aLocation.line + 
                    ", column " + aLocation.column +
                    ", in " + aLocation.id);
        }
        var para = document.createElement('p');
        para.className = 'location-paragraph';
        var anchor = document.createElement("a");
        anchor['href'] = "#";
        anchor['onclick'] = makeHighlighterLinkFunction(
            this, aLocation);
        anchor.appendChild(anchorBodyDom);
        para.appendChild(anchor);
        return para;
    };
    
    
    //WHERE TO GET COLOR??
    var makeHighlighterLinkFunction = function(that, elt) {
        return function() { 
            that.highlighter(elt.id, elt.offset, elt.span, /*elt.color*/ "red");
        };
    };

    WeSchemeInteractions.prototype.disableInput = function() {
        this.prompt.hide();
    };

    WeSchemeInteractions.prototype.enableInput = function() {
        this.prompt.show();
    };

    WeSchemeInteractions.prototype.requestBreak = function() {
        this.evaluator.requestBreak();
    };

    WeSchemeInteractions.prototype.toString = function() { return "WeSchemeInteractions()"; };

    //////////////////////////////////////////////////////////////////////
    var _idNum = 0;
    makeFreshId = function() {
        return ("<interactions" + (_idNum++) + ">");
    }
    //////////////////////////////////////////////////////////////////////

    return WeSchemeInteractions;
}