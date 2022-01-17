function(key, value) {            
            var checkbox = $("<input />").attr({type: 'checkbox', id: 'filter' + value.categoryID, checked: 'checked'});
            $(checkbox).change(markerChange);
              
            var label = $("<label />").attr('for', 'filter' + value.categoryID).html(value.name);
        
            var li = $("<li />").append(checkbox).append(' ').append(label); 
        
            $("ul.filterMenu").append(li);      
        }