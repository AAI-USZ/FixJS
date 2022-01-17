function(options, _notificationAreaName) {
        return this.each(function()
        {
            var elem = $(this);
            if (elem.data('crudForm') && elem.data('crudForm')[_.first(_.keys(options))]){
                return elem.data('crudForm')[_.first(_.keys(options))].call(this,_.first(_.values(options)));
            } else if(!elem.data('crudForm')) {
                elem.data('crudForm', new CrudFunction(options, elem, _notificationAreaName));
            }
        });
    }