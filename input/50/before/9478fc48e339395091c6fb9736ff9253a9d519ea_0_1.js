function() {
    smileyParser = new SmileyParser;
    replaceSmileys(document);

    window.document.addEventListener('DOMNodeInserted', function(event) {
        replaceSmileys(event.target);
    }, false);
}