function(key, value) {            
            var checkbox = $("<input />").attr({type: 'checkbox', id: 'filter' + value.categoryID});
            $(checkbox).change(function() {
                alert(this.id);
            });
              
            var label = $("<label />").attr('for', 'filter' + value.categoryID).html(value.name);
        
            var li = $("<li />").append(checkbox).append(' ').append(label); 
        
            $("ul.filterMenu").append(li);      
        }