function _insertInList($list, $element, position, $relativeElement) {
        // Determine where to insert. Default is LAST.
        var inserted = false;
        if (position) {

            // Adjust relative position for menu section positions since $relativeElement
            // has already been resolved by _getRelativeMenuItem() to a menuItem
            if (position === FIRST_IN_SECTION) {
                position = BEFORE;
            } else if (position === LAST_IN_SECTION) {
                position = AFTER;
            }

            if (position === FIRST) {
                $list.prepend($element);
                inserted = true;
            } else if ($relativeElement && $relativeElement.length > 0) {
                if (position === AFTER) {
                    $relativeElement.after($element);
                    inserted = true;
                } else if (position === BEFORE) {
                    $relativeElement.before($element);
                    inserted = true;
                }
            }
        }

        // Default to LAST
        if (!inserted) {
            $list.append($element);
        }
    }