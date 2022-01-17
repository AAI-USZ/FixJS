function() {
            if(this.nodeType === 3) {
                var listName = this.nodeValue;
                var matches = listMatch.exec(listName);
                if(matches && matches.length == 2) {
                    cardLimit = matches[1];
                } else {
                    cardLimit = null;
                }
            }
        }