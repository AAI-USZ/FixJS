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
                for (var j = 0, jLength = myNodes[i].length; j < jLength; j++) {
		    $(myNodes[i][j])
		      //all child and this as tag
		      .find('*').add($(myNodes[i][j]))
		      //get child nodes and add this if it text
		      .contents().add($(myNodes[i][j]))
		      //get only text and whap it's
		      .filter(function(){
			if (this.nodeType !== 3)
			  return false;
			return $.trim(this.textContent).length > 0;
		      }).wrap(makeSpanElement());
                    myNodesSurrounded += 1;
                }
            }
            return myNodesSurrounded;
        }