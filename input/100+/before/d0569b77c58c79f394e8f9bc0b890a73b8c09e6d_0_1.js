function CollapsibleContainerTitleOnClick() {
    // The item clicked is the title div... get this parent (the overall container) and toggle the content within it.
    if ((i % 2) == 0) {
        $('.triangle').attr("src" , "/img/circle_arrow_down.png");
    } else {
        $('.triangle').attr("src" , "/img/circle_arrow_right.png");
    }
    $(".collapsibleContainerContent", $(this).parent()).slideToggle();
    i++;
}