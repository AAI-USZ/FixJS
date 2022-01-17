function(tag, imgSrc, text, attributes, imgAttributes) {
    //Create button and return object.
    //Set the text: the container TITLE or image ALT attributes can be overridden, eg.
    //  main.mk_button('a', main.portal.icons['move_2d'], strmove, [['title', strmoveshort]]);
    var container = document.createElement(tag);
    container.style.cursor = 'pointer';
    container.setAttribute('title', text);
    var image = document.createElement('img');

    image.setAttribute('src', imgSrc);
    image.setAttribute('alt', text);
    container.appendChild(image);

    if (attributes != null) {
        for (var c=0; c<attributes.length; c++) {
            if (attributes[c][0] == 'title' && this.is_ie()) {
                image.setAttribute(attributes[c][0], attributes[c][1]); //IE hack: transfer 'title'.
            } else {
                container.setAttribute(attributes[c][0], attributes[c][1]);
            }
        }
    }
    if (imgAttributes != null) {
        for (var c=0; c<imgAttributes.length; c++) {
            image.setAttribute(imgAttributes[c][0], imgAttributes[c][1]);
        }
    }
    return container;
}