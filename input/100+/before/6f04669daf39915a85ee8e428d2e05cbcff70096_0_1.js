function (relativeID, position) {
        var $relativeElement,
            key,
            menuItem,
            map,
            foundMenuItem;
        
        if (relativeID) {
            if (position === FIRST_IN_SECTION || position === LAST_IN_SECTION) {
                if (!relativeID.hasOwnProperty("sectionMarker")) {
                    console.log("Bad Parameter in _getRelativeMenuItem(): relativeID must be a MenuSection when position refers to a menu section");
                }

                // Determine the $relativeElement by traversing the sibling list and
                // stop at the first divider found
                var $sectionMarker = this._getMenuItemForCommand(CommandManager.get(relativeID.sectionMarker));
                var $sectionItems = $sectionMarker.siblings();
                var $listElem = $sectionMarker;
                $relativeElement = $listElem;
                while (true) {
                    $listElem = (position === FIRST_IN_SECTION ? $listElem.prev() : $listElem.next());
                    if ($listElem.length === 0) {
                        break;
                    } else if ($listElem.find(".divider").length > 0) {
                        break;
                    } else {
                        $relativeElement = $listElem;
                    }
                }
            } else {
                // handle FIRST, LAST, BEFORE, & AFTER
                var command = CommandManager.get(relativeID);
                if (command) {
                    // Lookup Command for this Command id
                    // Find MenuItem that has this command
                    $relativeElement = this._getMenuItemForCommand(command);
                }
            }
            
            return $relativeElement;
        } else {
            console.log("Bad Parameter in _getRelativeMenuItem(): relativeID not specified");
        }
        
        return $relativeElement;
    }