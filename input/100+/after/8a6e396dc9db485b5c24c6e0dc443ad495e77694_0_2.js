function success(message) {
    return noty({
        "text": message,
        "theme":"noty_theme_twitter",
        "layout":"topRight",
        "type":"success",
        "animateOpen":{"opacity":"toggle"},
        "animateClose":{"height":"toggle"},
        "speed":200,
        "timeout":2000,
        "closeButton":false,
        "closeOnSelfClick":true,
        "closeOnSelfOver":false,
        "modal":false});
}