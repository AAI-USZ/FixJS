function addObject() {
    ///<summary> 
    ///gets the sentence from the main textbox and add it to the added entities box after checking the validation of the sentence an, it shows , hides the add button and removes the objects from addedEntitiesBox
    ///if empty return false esle return true 
    /// <para></para>
    ///
    ///</summary>
    if (enable() == true && !stopadd()) {
        var objectName = $(".header .searcharea .searchbox .searchinput").val();
        $(".header .searcharea .searchbox .searchinput").val("");
        var x = $(".header .searcharea .addedEntitiesBox");
        x.append("<span class='addedEntity'><span class='text'>" + objectName + "</span><a href='#' class='closeIcon'><img src='img/closeIcon.png'/></a><a href='#' class='closeIconHover'><img src='img/closeIconHover.png'/></a></span>");
        addedNum(); //read the number of the left entities
        $("a.closeIconHover").hide();
        $(".addedEntity").hover(
  			function () {
  			    $(this).children('a.closeIcon').hide();
  			    $(this).children('a.closeIconHover').show();
  			},
  			function () {
  			    $(this).children('a.closeIconHover').hide();
  			    $(this).children('a.closeIcon').show();
  			});
    };




    $("a.closeIconHover").click(function () {
        $(this).parent().fadeOut(250, function () {
            $(this).remove();
            $('.header .searcharea .searchbox .searchinput').focus();
            $(".header .searcharea .searchbox .addbutton").css("opacity", "1");
            addedNum();
        });

    });


}