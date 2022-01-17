function (m) { 
          //only accept to move a node from the reference tree if it does not exists in that tree
           var checkNotAlreadyBound = function() {
	          var res = true;
	          var originTree = m.ot.get_container().prop("id");
	          var activetechniqueid = "";
	          for(i = 0 ; i < m.o[0].attributes.length; i++) {
	        	  if(m.o[0].attributes[i].name == "activetechniqueid") {
	        		  activetechniqueid = m.o[0].attributes[i].nodeValue;
	        		  break;
	        	  }
	          }
	          var list = $(id + " [activeTechniqueid=" + activetechniqueid + "]");
	          if(foreignTreeId == originTree) {
	            //look if there is an li with attr activeTechniqueId == moved object activeTechniqueId
	            res =  list.size() < 1 ;
	          }
	          return res;
          };
          //only accept "inside" node move (yes, comparing m.p == "inside" does not work)
          //and into a new parent node. 
          var checkInside = (m.p != "before" && m.p != "after" && this._get_parent(m.o)[0] !== m.np[0]);
          
          return checkNotAlreadyBound() && checkInside;
        }