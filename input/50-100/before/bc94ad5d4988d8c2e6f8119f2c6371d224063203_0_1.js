function(t) {
      for(var n = range.firstNode(), after = range.lastNode().nextSibling;
          n && n !== after;
          n = n.nextSibling) {
        Meteor.ui._event.registerEventType(t, n);
        console.log('attach event',t,n)
      }
        
    }