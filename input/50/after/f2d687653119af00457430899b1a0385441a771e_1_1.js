function () {
        current = $(this)
        updateFullImage($(this).prop("href"), $(this).attr("rel"))
        return false
    }