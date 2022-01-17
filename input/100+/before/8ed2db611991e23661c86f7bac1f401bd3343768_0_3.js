function(node, itself, kill){
            if(!node) return;
			//cleanup children
            var cn = node.childNodes;
            if(cn && cn.length > 0){
				//destroy everything in a few ms to avoid memory leaks
				//remove them all and copy objs into new array
				var els = [].slice.apply(cn, [0]);
				$.asap(function(){
                	for(var i=0;i<els.length;i++){
                		cleanUpContent(els[i], kill);
                	}	
				});
            }
			//cleanUp this node
			if(itself) cleanUpNode(node, kill);
        }