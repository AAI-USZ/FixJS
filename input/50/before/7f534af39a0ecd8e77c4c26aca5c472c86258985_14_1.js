function open(event) {
    event && event.preventDefault();

    /**
     * XXX What a big steaming pile, use CSS animations for this!
     */
    $("#moreInfo").slideDown();
    $("#openMoreInfo").css({visibility: "hidden"});
  }