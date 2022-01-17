function onLoad() {
    if(!window.openDatabase)
    {
        $('#news-list').html('<p>Sorry Support for your device is not ready yet. Please try again in the future.</p>');
        return;
    }
    db = window.openDatabase("newsDB", "1.0", "News Database", 256*1024);
    createDatabase();
    loadItems();
    fetchItems();
}