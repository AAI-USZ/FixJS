function(reason){
        if (reason === 'good') {
            return interestingTagDetailBox;
        } else if (reason === 'bad') {
            return ignoredTagDetailBox;
        } else if (reason === 'subscribed') {
            return subscribedTagDetailBox;
        }
    }