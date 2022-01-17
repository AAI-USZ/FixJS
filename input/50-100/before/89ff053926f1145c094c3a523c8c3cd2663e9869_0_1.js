function addNew() {
    $(".hiddenQuery").children(".queryDiv").clone().appendTo(".queryDivContainer");
    $(".queryDivContainer").find(".querySelect").ufd({});
    $(".query").unbind("keypress");
    $(".query").keypress(function(e) {
        if(e.which == 13) {
            recalculateTable();
        }
    });
}