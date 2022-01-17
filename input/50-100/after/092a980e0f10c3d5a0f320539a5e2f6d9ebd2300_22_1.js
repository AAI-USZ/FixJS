function _addKeyBindingToMenuItem($menuItem, key, displayKey) {
        var $shortcut = $menuItem.find(".menu-shortcut");
        
        if ($shortcut.length === 0) {
            $shortcut = $("<span class='menu-shortcut' />");
            $menuItem.append($shortcut);
        }
        
        $shortcut.data("key", key);
        $shortcut.text(KeyBindingManager.formatKeyDescriptor(displayKey));
    }