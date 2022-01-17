function addItem(it) {
    it.extend({'icon-file':getIconURI(it.icon)}); // make this additions before the hook, so it can change these too
    TPL('onObjectItem', it); // custom treatment, especially mode-based
    $('<li>').append(TPL.item.format(log(it)))
        .appendTo('#items')        
        .find('a.item-link').click(itemClickHandler);
}