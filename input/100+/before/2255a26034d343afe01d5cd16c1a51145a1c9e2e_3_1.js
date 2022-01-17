function(name, x, y) {        
        // Create the entity and temporarily store it for reference purposes
        var entity = new cp.template[name];
        
        // Apply the passed parameters to init
        if (arguments.length > 1 && entity.init) {
            // Remove name argument
            var args = [].slice.call(arguments, 1);
            // Fire the init with proper arguments
            entity.init.apply(entity, args);
        } else if (entity.init) {
            entity.init();
        }
        
        // Pushes your new variable into an array
        cp.core.storage.push(entity); 
        entity.id = cp.core.idNew();
        
        // Push into type storage for quicker collision detection
        switch (entity.type) {
            case 'a':
                cp.core.typeA.push(entity);
                break;
            case 'b':
                cp.core.typeB.push(entity);
                break;
            default:
                break;
        }
        
        cp.core.id += 1; // Increment the id so the next shape is a unique variable
    }