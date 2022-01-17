function(data){
    var max = 0;
    var max_index = 0;

    for (var i = 0; i < data.length; i++){
        var year = data[i].released.substring(0, data[i].released.indexOf('-'));

        if ((year > max) && (year <= new Date().getFullYear())){
            max = year;
            max_index = i;
        }
    }

    return max_index;
}