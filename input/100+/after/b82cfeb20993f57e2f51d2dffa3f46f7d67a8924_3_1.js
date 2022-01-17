function getIntListFromURLParam(param){
    var param_value = getUrlVars()[param];
    var return_list = [];
    if (param_value!== undefined){
        $.each(param_value.split(','), function(index, value){
            if (value!=''){
                return_list.push(parseInt(value));
            }
        });
    }
    return return_list;

}