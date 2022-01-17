function (m) { 
          //only accept to move a node from the reference tree if it does not exists in that tree
          var checkNotAlreadyBound = true;
          if(foreignTreeId == m.ot.get_container().prop("id")) {
            //look if there is an li with attr activeTechniqueId == moved object activeTechniqueId
            checkNotAlreadyBound =  $(id + " [activeTechniqueId=" + m.o.prop("activeTechniqueId") + "]").size() < 1 ;
          }
          //only accept "inside" node move (yes, comparing m.p == "inside" does not work)
          //and into a new parent node. 
          var checkInside = (m.p != "before" && m.p != "after" && this._get_parent(m.o)[0] !== m.np[0]);
          
          return checkNotAlreadyBound && checkInside;
        }