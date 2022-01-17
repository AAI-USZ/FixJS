function searchData(regExp) {
        var keys = Object.keys(perfData).filter(function (key) {
            return regExp.test(key);
        });
        
        var datas = [];
        
        keys.forEach(function (key) {
            datas.push(perfData[key]);
        });
        
        return datas;
    }