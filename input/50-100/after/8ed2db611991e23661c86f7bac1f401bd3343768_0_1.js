function(node, itself, kill){
            if(!node) return;
			//cleanup children
            var cn = node.childNodes;
            if(cn && cn.length > 0){
				//destroy everything in a few ms to avoid memory leaks
				//remove them all and copy objs into new array
				$.asap(cleanUpAsap, {}, [slice.apply(cn, [0]), kill]);
            }
			//cleanUp this node
			if(itself) cleanUpNode(node, kill);
        }