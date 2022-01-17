function(source, actor, x, y, time) {
        if (source instanceof FavoritesButton){
            AppFavorites.getAppFavorites().removeFavorite(source.app.get_id());
            return true;
        }
        return false;
    }