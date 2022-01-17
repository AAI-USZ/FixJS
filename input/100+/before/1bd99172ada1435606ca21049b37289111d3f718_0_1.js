function doWrap() {
            var myRange = $.fn.range;
            var Spans = [];
    
            if (!myRange.startContainer || !myRange.endContainer) {
                return false;
            }
        
            var myNodes = myRange.GetContainedNodes();
            var iLength = myNodes.length;
        
            //myNodes is arranged by level, so everything at the same level can be surrounded by a <span>
            var myNodesSurrounded = 0;
            for (var i = 0; i < iLength; i++) {
                if (!myNodes[i][0]) {
                    continue;
                }
                var myParent = myNodes[i][0].parentNode;
                var myParentName = myParent.nodeName;
        
                if (myParentName !== 'DIV') {
                    var mySpan = makeSpanElement();
                    //Firefox has bugs if we don't attach the span first;
                    //we can't just append it because we don't know where it
                    //goes in the parent
                    myParent.insertBefore(mySpan, myNodes[i][0]);
                    Spans.push(mySpan);
                }
                for (var j = 0, jLength = myNodes[i].length; j < jLength; j++) {
                    //this works assuming there aren't any block-level
                    //elements contained in the lower element; so it should
                    //work for P, but not for UL
                    if (myParentName === 'DIV') {
                        if (myNodes[i][j].nodeType !== 1) {
                            continue;
                        }
                        var myChildNodes = myNodes[i][j].childNodes;
                        var mySpan = makeSpanElement();
                        while (myChildNodes.length > 0) {
                            mySpan.appendChild(myChildNodes[0]);
                        }
            
                        //it's OK to do here because we're replacing the
                        //whole thing
                        myNodes[i][j].appendChild(mySpan);
                        Spans.push(mySpan);
                    }
                    //appending automatically removes them
                    else {
                        mySpan.appendChild(myNodes[i][j]);
                    }
                    myNodesSurrounded += 1;
                }
            }
            return myNodesSurrounded;
        }