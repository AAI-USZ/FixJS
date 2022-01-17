function (key,val){
                var checkbox = $("<input />").attr({type: 'checkbox', id: 'filter' + val.categoryID, checked: 'checked'});
                $(checkbox).change(filterClick);
                
                var label = $("<label />").attr('for', 'filter' + val.categoryID).html(val.name);
                var li = $("<li />").append(checkbox).append(' ').append(label); 
                $('ul#filterSection').append(li);
                
            }