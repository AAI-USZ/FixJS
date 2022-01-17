function() {
                       try {
                           var oldValueJSON =  JSON.stringify(parent.get('item').get('value'));
                           var newValueJSON =  JSON.stringify(JSON.parse(this.$().val()));
                           if (newValueJSON == oldValueJSON) {
                               this.set('uncomittedChanges',false);
                               this.get('parentView').set('refreshAvailable',false);
                           }
                       }
                       catch(e) {
                       }
                   }