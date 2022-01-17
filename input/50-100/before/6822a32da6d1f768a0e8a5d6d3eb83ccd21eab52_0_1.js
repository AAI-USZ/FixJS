function setItem(name) {
        var itemData = data.get(status.page).getItem(name);
        var item = itemMap[name];
        item[0].style.cssText = '';
        setPosition(name, itemData.getPosition());
        setStyle(name, itemData.getStyle());
        setContent(name, itemData.getValue());
    }