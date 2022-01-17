function addSiteToTrail(){
    currentSite = window.location.href;
    $.ajax({
        url: "http://localhost:3000/sites",
        type: "post",
        crossDomain: true,
        data: {
           "site[url]":currentSite,
           "site[trail_id]":trailID,
           "site[title]": document.title,
           "user": userID,
            notes: "none"
                },
        success: addFaviconsToDisplay
    })
}