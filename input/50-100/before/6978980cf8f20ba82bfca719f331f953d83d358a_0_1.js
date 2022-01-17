function(ele, key, extra){
        return ret[key === 'width' ? 'getWidth' : 'getHeight'](ele, extra);
    }