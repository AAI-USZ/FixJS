function findFirstLiWithPositionAfter(ul, targetPosition) {
    var children = ul.children("li");
    for (var i = 0; i < children.length; i++) {
        var liPosition = parseFloat($(children[i]).attr("data-position"));
        if (liPosition > targetPosition) {
            return $(children[i]);
        }
    }
    return null;
}