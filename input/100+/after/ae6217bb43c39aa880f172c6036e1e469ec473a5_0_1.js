function() {
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
          }