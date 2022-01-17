function srcVideo(source, e){
    switch (source){
    case "youtube": return getSrc(e).replace(/youtube.com\/(v|embed)\/([^\?&]+)([^\"\']*)/, "youtube.com/embed/$2");
    case "kino-govno": return getQueryVariable(e.getAttribute("flashvars"), "file");
    case "ted.com": return getQueryVariable(e.getAttribute("flashvars"), "vu");
    case "vimeo": return "//vimeo.com/play_redirect?clip_id=" + getQueryVariable(getSrc(e), "clip_id") + "&codecs=H264";
    }
}