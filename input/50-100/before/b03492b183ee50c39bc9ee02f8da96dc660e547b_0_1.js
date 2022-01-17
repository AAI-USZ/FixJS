function onLoad() {
    db = window.openDatabase("newsDB", "1.0", "News Database", 256*1024);
    createDatabase();
    loadItems();
    fetchItems();
}