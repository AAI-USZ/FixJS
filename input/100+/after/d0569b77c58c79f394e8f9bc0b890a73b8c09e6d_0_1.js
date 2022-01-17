function CollapsibleContainerTitleOnClick() {
    // The item clicked is the title div... get this parent (the overall container) and toggle the content within it.
    if ((i % 2) == 0) {
        $('.triangle').attr("src" , "/img/circle_arrow_down.png");
        $('.collapsibleContainerTitle').css('border-bottom-left-radius', '0px');
        $('.collapsibleContainerTitle').css('border-bottom-right-radius', '0px');
        $('.collapsibleContainerTitle div').css('border-bottom-left-radius', '0px');
        $('.collapsibleContainerTitle div').css('border-bottom-right-radius', '0px');
    } else {
        $('.triangle').attr("src" , "/img/circle_arrow_right.png");
        $('.collapsibleContainerTitle').css('border-bottom-left-radius', '4px');
        $('.collapsibleContainerTitle').css('border-bottom-right-radius', '4px');
        $('.collapsibleContainerTitle div').css('border-bottom-left-radius', '4px');
        $('.collapsibleContainerTitle div').css('border-bottom-right-radius', '4px');
    }
    $(".collapsibleContainerContent", $(this).parent()).slideToggle();
    i++;
}