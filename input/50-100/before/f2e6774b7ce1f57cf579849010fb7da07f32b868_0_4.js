function(menu) {
      for (var i in menu.items) {
        if (menu.items[i].type === 'menuitem') {
          var id = menu.items[i].id;;
          menuItems[id] = menu.items[i];
          menuItems[id].src = 'user';
        } else if (menu.items[i].type === 'menu') {
          collectMenuItems(menu.items[i]);
        }
      }
    }