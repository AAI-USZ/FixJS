function(channel){

        var args = [].slice.call(arguments, 1),
            el = args[0],
            file = obj.util.decamelize(channel);

        // Remove all modules under a widget path (e.g widgets/todos)
        obj.unload("widgets/" + file);

        // Empty markup associated with the module
        $(el).html('');

    }