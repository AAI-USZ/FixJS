function(item, checked) {
            var size = item.value;
            Frog.Prefs.set('tileCount', size);
            item.parentMenu.hide();
            self.fireEvent('onChange', [Frog.Prefs]);
        }