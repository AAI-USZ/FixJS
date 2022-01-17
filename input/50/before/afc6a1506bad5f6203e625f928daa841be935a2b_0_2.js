function(wishedSource) {
            for(sourceName in sources) {
                if(sourceName == wishedSource) {
                    var source = sources[wishedSource];
                    source.close();
                    return true;
                }
            }
            return false;
        }