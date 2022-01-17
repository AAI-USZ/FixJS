function (relativeID, position) {
        var $relativeElement,
            key,
            menuItem,
            map,
            foundMenuItem;
        
        if (relativeID) {
            // Lookup Command for this Command id
            var command = CommandManager.get(relativeID);
            
            if (command) {
                // Find MenuItem that has this command
                $relativeElement = this._getMenuItemForCommand(command);
            }
        }
        
        return $relativeElement;
    }