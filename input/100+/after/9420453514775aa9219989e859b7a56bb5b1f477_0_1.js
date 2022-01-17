function(aImageSrc, node, flags) {
    /*
       The rules here transform various kinds of link URLs into links to images.
       The simplest case is a link which already refers directly to a *.jgp or
       other image.
       
       Cases which are tested first is cases which transform a URL into a
       different URL, which may be the URL of an image or a URL which can
       be processed by the rules after it to produce an image.  An 
       example is a stumbleupon link or deviantart link which refers to
       a YouTube video.  The stumbleupon rule turns it into a youtube URL,
       and then the youtube rule turns it into a jpg.
     */
    
    if (/^https?:\/\/[^\/]*\.wikipedia.org\/wiki\/File:/i.test(aImageSrc)) {
      // wikipedia page URLs look like image URLs but they aren't.  We don't
      // support showing images for wiki page links, but the Wikipedia rule does
      // support wikipedia *thumbnails*.
      return null;
    }
    
    if (/^https?:\/\/photo\.xuite\.net\/./.test(aImageSrc)) {
      // Prohibit using links from photo.xuite.net since they look like
      // .jpg URLs but are really html.  By rejecting them here we let the
      // Thumbnails rule handle them.
      return null;
    }
    
    // For StumbleUpon.com links, change
    // http://www.stumbleupon.com/to/3roKbh/content.mindcrap.com/gallery/dogs/15/34.jpg/t:7ed1a2cbdd70f;src:all or
    // http://www.stumbleupon.com/su/3roKbh/content.mindcrap.com/gallery/dogs/15/34.jpg to
    // http://content.mindcrap.com/gallery/dogs/15/34.jpg
    let stumbleUponEx = new RegExp(/^(.*\.)?stumbleupon.com\/(to|su)\/[^\/]+\/(.*?)(\/t:[0-9a-f]+;.*)?$/);
    if (stumbleUponEx.test(aImageSrc)) {
      aImageSrc = aImageSrc.replace(stumbleUponEx, "http://$3");
      aImageSrc = decodeURIComponent(aImageSrc);
      aImageSrc = decodeURIComponent(aImageSrc);
    }

    // For google images links, google video search, images.yandex.ru, 
    // and some others, get URL from imgurl=... part.
    let imgurlEx = new RegExp(/.*[\?&](img_?)?url=([^&]+).*$/);
    if (imgurlEx.test(aImageSrc)) {
      aImageSrc = aImageSrc.replace(imgurlEx, "$2");
      aImageSrc = decodeURIComponent(aImageSrc);
      if (! /^https?:\/\/./.test(aImageSrc)) {
        aImageSrc = "http://" + aImageSrc;
      }
    }

    // Deviantart external links: change
    // http://www.deviantart.com/users/outgoing?http://www.youtube.com/watch?v=DLQBAOomHzq to
    // http://www.youtube.com/watch?v=DLQBAOomHzq
    let deviantOutgoingRex = new RegExp("https?://[^\\.]+\\.deviantart\\.com/.*/outgoing\\?(.*)");
    aImageSrc = aImageSrc.replace(deviantOutgoingRex, "$1");

    // Deviantart profile links:
    // Change link
    // http://truong-abcdef.deviantart.com/ to
    // http://a.deviantart.net/avatars/t/r/truong-san.jpg?1 (/t/r/ are from the 1st 2 letters)
    // We unfortunately have to assume either jpg or gif.
    let deviantProfileRex = new RegExp("(https?)://([^/?&.])([^/?&.])([^/?&.]*)\\.deviantart\\.com/?$");
    aImageSrc = aImageSrc.replace(deviantProfileRex, "$1://a.deviantart.net/avatars/$2/$3/$2$3$4.jpg?1");
    
    // For twitter links like https://twitter.com/#!/search/picture/slideshow/photos?url=https%3A%2F%2Fp.twimg.com%2FAe0VPNGCIAIbRXW.jpg
    let twitterEx = new RegExp("^https?://twitter.com/.*\\?url=([^&]+)(&.*)?$");
    aImageSrc = decodeURIComponent(aImageSrc.replace(twitterEx, "$1"));
    
    // For links to twitpic pages, chage
    // http://twitpic.com/10l4j4.jpg to
    // http://twitpic.com/show/full/10l4j4  (or .../large/...)
    let twitpicEx = new RegExp("^(https?://(.*\\.)?twitpic.com/)([^\\./]+)$");
    aImageSrc = aImageSrc.replace(twitpicEx, "$1/show/full/$3");
    
    // For google.com/url?v= for youtube.com:
    // http://www.google.com/url?q=http://www.youtube.com/watch%3Fv%3Dr6-SJLlneLc&sa=X&ei=JMh-T__sEcSviAKIrLSvAw&ved=0CCEQuAIwAA&usg=AFQjCNEl2fsaLGeItGZDrJ0U_IEPghjL0w to
    // http://www.google.com/url?q=http://www.youtube.com/watch%3Fv%3Dr6-SJLlneLc&sa=X&ei=JMh-T__sEcSviAKIrLSvAw&ved=0CCEQuAIwAA&usg=AFQjCNEl2fsaLGeItGZDrJ0U_IEPghjL0w
    let youtube2Ex = new RegExp("^(?:https?://)(?:[^/]*\\.)?google\\.com/url(?:\\?.*)?[?&]q=([^&]*).*$");
    aImageSrc = decodeURIComponent(aImageSrc.replace(youtube2Ex, "$1"));

    // For youtube links, change 
    // http://www.youtube.com/watch?v=-b69G6kVzTc&hd=1&t=30s to 
    // http://i3.ytimg.com/vi/-b69G6kVzTc/hqdefault.jpg
    // http://youtu.be/kuX2lI84YRQ to
    // http://i3.ytimg.com/vi/kuX2lI84YRQ/hqdefault.jpg
    // http://www.youtube.com/embed/87xNpOYOlQ4?rel=0 to
    // http://i3.ytimg.com/vi/87xNpOYOlQ4/hqdefault.jpg
    let youtubeEx = new RegExp("(https?://)(?:[^/]*\\.)?(?:youtube\\.com|nsfwyoutube\\.com|youtu\\.be).*(?:v=|/)([^?&#!/]+)[^/]*/*$");
    aImageSrc = aImageSrc.replace(youtubeEx, "$1i3.ytimg.com/vi/$2/hqdefault.jpg");

    // For blogger aka Blogspot, change
    // http://3.bp.blogspot.com/-3LhFo9B3BFM/T0bAyeF5pFI/AAAAAAAAKMs/pNLJqyZogfw/s500/DSC_0043.JPG to
    // http://3.bp.blogspot.com/-3LhFo9B3BFM/T0bAyeF5pFI/AAAAAAAAKMs/pNLJqyZogfw/s1600/DSC_0043.JPG; change
    // http://1.bp.blogspot.com/-cCrMafs3SJ4/TwcFrqD23II/AAAAAAAABCg/3GxEgPh0qRQ/s320-p/Tiara+Riley.jpeg to
    // http://1.bp.blogspot.com/-cCrMafs3SJ4/TwcFrqD23II/AAAAAAAABCg/3GxEgPh0qRQ/s1600-p/Tiara+Riley.jpeg
    // NOTE: This rule exists in both Others and Thumbnails, and should be the same in both.
    let blogspotRegExp = new RegExp("(\\.(blogspot|blogger)\\.com/.*)/s[0-9]+(-[a-z])?/([^/?&]+\.[^./?&]*)$");
    aImageSrc = aImageSrc.replace(blogspotRegExp, "$1/s1600/$4");

    // memegenerator.net:
    // http://memegenerator.net/instance/21284704?.. becomes
    // http://cdn.memegenerator.net/instances/600x/21284704.jpg
    aImageSrc = aImageSrc.replace(/^(https?:\/\/)memegenerator\.net\/instance\/([0-9]+)([?\/].*)?$/i,
                                  "$1cdn.memegenerator.net/instances/600x/$2.jpg");

    // If imgur link, remove part after "&" or "#", e.g. for https://imgur.com/nugJJ&yQU0G
    // Also turn http://imgur.com/gallery/24Av1.jpg into http://imgur.com/24Av1.jpg
    let imgurRex = new RegExp(/(imgur\.com\/)(gallery\/)?([^\/&#]+)([&#].*)?/);
    aImageSrc = aImageSrc.replace(imgurRex, "$1$3");

    let quickmemeEx = new RegExp(/(?:www\.quickmeme\.com\/meme|(?:i\.)?qkme\.me)\/([^\/\?]+).*/);
    aImageSrc = aImageSrc.replace(quickmemeEx, "i.qkme.me/$1");
  
    // fotoblur.com: change
    // http://www.fotoblur.com/images/389235 to
    // http://www.fotoblur.com/api/resize?id=389235&width=1280&height=1024
    aImageSrc = aImageSrc.replace(/^(https?:\/\/[^\/?]*fotoblur\.com)\/images\/([0-9]+).*/,
                                  "$1/api/resize?id=$2&width=1280&height=1024");
    
    // viddy.com (see also in Thumbnail rule)
    // http://www.viddy.com/video/a35a8581-7c0f-4fd4-b98f-74c6cf0b5794 becomes
    // http://cdn.viddy.com/images/video/a35a8581-7c0f-4fd4-b98f-74c6cf0b5794.jpg
    aImageSrc = aImageSrc.replace(/^(https?:\/\/)(?:[^\/]+\.)?viddy\.com\/(?:play\/)?video\/([^\/?]+).*/i,
                                  "$1/cdn.viddy.com/images/video/$2.jpg");
    // http://viddy.com/play/video/1c042fbd-66d5-4c19-9896-816a0347d2aa?source=Profile becomes
    // http://cdn.viddy.com/images/video/1c042fbd-66d5-4c19-9896-816a0347d2aa?source=Profile
    
    // imgchili.com:
    // http://imgchili.com/show/7428/9998984_ie_011.jpg becomes
    // http://i2.imgchili.com/7428/9998984_ie_011.jpg
    aImageSrc = aImageSrc.replace(/\/\/imgchili\.com\/show\//, "i2.imgchili.com/");
    
    aImageSrc = aImageSrc.replace(/(\/\/img..g\.com)\/\?v=/i, "$1/images/");
    
    // For most sites, if there is no image suffix, add .jpg.
    let rex = new RegExp("tumblr\\.com/.*" + 
                         "|twimg[.0-9-]" +
                         "|twitpic\\.com" +
                         "|(" + ThumbnailZoomPlus.Pages._imageTypesRegExpStr + "([?&].*)?$)"
                         , "i");
    if (! rex.test(aImageSrc)) {
      // add .jpg, e.g. for imgur links, if it doesn't appear anywhere 
      // (including stuff.jpg?more=...)
      aImageSrc += ".jpg";
    }
    this._logger.debug("Others getZoomImage: using zoom image " + aImageSrc);

    return aImageSrc;
  }