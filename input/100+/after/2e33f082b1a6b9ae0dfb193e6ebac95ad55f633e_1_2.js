function() {  
    if(localStorage['favorites']==null)
        localStorage['favorites']=  JSON.stringify(new Array());
    if(mapLoaded){ 
        if(typeof myRouteVector!='undefined')
            myRouteVector.destroyFeatures();
    }else{
        $.getJSON('http://tali.irail.be/REST/Category.json',function(data){
            $.each(data.category, function (key,val){
                var checkbox = $("<input />").attr({type: 'checkbox', id: 'filter' + val.categoryID, checked: 'checked'});
                $(checkbox).change(filterClick);
                
                var label = $("<label />").attr('for', 'filter' + val.categoryID).html(val.name);
                var li = $("<li />").attr('class', val.name.toLowerCase()).append(checkbox).append(' ').append(label); 
                $('ul#filterSection').append(li);  
            });
        });
    }              
}