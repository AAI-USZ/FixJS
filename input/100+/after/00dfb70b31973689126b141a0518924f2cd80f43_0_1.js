function handleTouchStart(menuItem) {
    if(!menuItem || !menuPeeked) {
        return;
    }
    menuItem.className = 'menuItem showItem';
}