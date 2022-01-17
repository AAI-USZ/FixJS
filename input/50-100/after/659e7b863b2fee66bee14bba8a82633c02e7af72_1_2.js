function _toggleItem(id, slug, name, category, title_color, title_subs, add) {
    add ? _add(id, slug, name, category, title_color, title_subs) : _remove(id, name, category);

    if (GFW && GFW.app.infowindow) {
      GFW.app.infowindow.close();
    }

  }