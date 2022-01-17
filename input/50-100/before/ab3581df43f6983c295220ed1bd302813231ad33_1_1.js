function(name, id){
        if(!id){
            return;
        }
        var list = ac_container.find('ul');
        list.find('.all').hide();
        if (ac_container.find('li[data-id=' + id + ']').length === 0){
            list.prepend('<li data-name="'+ name + '" data-id="' + id + '">' + name + '<a class="remove">-</a></li>');
        }

    }