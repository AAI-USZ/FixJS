function(seconds, guide) {
    guide = guide || seconds; // Default to using seconds as guide
    var s = Math.floor(seconds % 60),
        m = Math.floor(seconds / 60 % 60),
        h = Math.floor(seconds / 3600),
        gm = Math.floor(guide / 60 % 60),
        gh = Math.floor(guide / 3600);

    // Check if we need to show hours
    h = (h > 0 || gh > 0) ? h + ":" : "";

    // If hours are showing, we may need to add a leading zero.
    // Always show at least one digit of minutes.
    m = (((h || gm >= 10) && m < 10) ? "0" + m : m) + ":";

    // Check if leading zero is need for seconds
    s = (s < 10) ? "0" + s : s;

    return h + m + s;
  }