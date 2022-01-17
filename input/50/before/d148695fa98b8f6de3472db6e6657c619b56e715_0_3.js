function(item, checked) {
            var size = item.value;
            Frog.Prefs.set('tile_count', size);
            item.parentMenu.hide();
            self.fireEvent('onChange', [Frog.Prefs]);
        }