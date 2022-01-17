function(evt) {
    evt && evt.preventDefault()
    var link = $(evt.target).closest("a")
      , href = link.attr("href")
      , notificationId = link.data("notification-id")

    // mark the thing as read with this ghetto legacy endpoint
    $.ajax({
      url : "/notifications/" + notificationId,
      type : "PUT"
    })

    window.location = href
  }