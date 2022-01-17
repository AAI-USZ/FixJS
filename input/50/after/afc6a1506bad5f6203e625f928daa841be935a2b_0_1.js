function(uri) {
            for(var subscription in subscriptions) {
                if(subscription === uri) return true;
            }
            return false;
        }