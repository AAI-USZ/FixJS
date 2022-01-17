function(aImageSrc, node, flags) {
    let verbose = false;
    var before;
    
    let nodeName = node.localName.toLowerCase();
    let nodeClass = node.getAttribute("class");
    ThumbnailZoomPlus.Pages._logger.debug("getZoomImage Thumbnail for " + nodeName 
                                          + " class='" + nodeClass + "'" +
                                          " baseURI=" + node.baseURI);


    if (! node.hasAttribute("src") && node.hasAttribute("href") &&
        node.style.backgroundImage.indexOf("url") == -1) {
      // We don't want to use node if it's just an href since we need
      // it to be an actual image.  (The Others rule already handles hrefs.)
      ThumbnailZoomPlus.Pages._logger.debug(
            "thumbnail getZoomImage: ignoring since it's a link, not a thumb");
      return null;
    }
    if (verbose) ThumbnailZoomPlus.Pages._logger.debug(
            "thumbnail getZoomImage p03: so far have " + aImageSrc);

    // For certain sites, if node has a background style, use image from that.
    // And actually, aImageSrc may be already coming from the
    // background but needs to be excluded.
    // But in general we don't since it leads to too many popups from static
    // background styling (non-image) graphics.
    let backImage = node.style.backgroundImage;
    let urlRegExp = /url\("(.*)"\)$/i;
    if (backImage && "" != backImage && urlRegExp.test(backImage)) {
      if (node.children.length > 0 && ! /thumb/.test(nodeClass)) {
        // Ignore e.g. in Google Offers, where a big map image is the background
        // around the guts of the page.
        // But we explicitly allow using background image if nodeClass
        // contains "thummb", as in 
        ThumbnailZoomPlus.Pages._logger.debug(
            "thumbnail getZoomImage: ignoring background image since has " +
            node.children.length + " children > 0");
        return null;
      }
      aImageSrc = backImage.replace(urlRegExp, "$1");
    }
    
    // For diasp.org & similar, get from <img data-full-photo="http://...">
    let fullPhoto = node.getAttribute("data-full-photo");
    if (fullPhoto) {
      aImageSrc = fullPhoto;
    }
    
    aImageSrc = ThumbnailZoomPlus.FilterService._applyBaseURI(node.ownerDocument, aImageSrc);
    if (verbose) ThumbnailZoomPlus.Pages._logger.debug(
            "thumbnail getZoomImage p06: so far have " + aImageSrc);

    // Disable for certain kinds of Facebook thumbs.
    ThumbnailZoomPlus.Pages._logger.debug("thumbnail getZoomImage: node=" +
                                          node + "; class=" +
                                          nodeClass);
    if ("spotlight" == nodeClass && /\.(fbcdn|akamaihd)\.net/.test(aImageSrc) // facebook 'lightbox'
        ) {
        ThumbnailZoomPlus.Pages._logger.debug("getZoomImage: ignoring since Facebook spotlight");
      return null;
    }
    if (nodeClass && nodeClass.indexOf("actorPic") >= 0) {
      // Don't show popup for small Facebook thumb of the person who's
      // entering a comment since the comment field loses focus and the 
      // thumbnails disappears, which is confusing.
        ThumbnailZoomPlus.Pages._logger.debug("getZoomImage: ignoring since Facebook actorPic");
      return null;
    }
    if (verbose) ThumbnailZoomPlus.Pages._logger.debug(
            "thumbnail getZoomImage p10: so far have " + aImageSrc);

    // For tiny tumblr profile thumbs change 
    // http://30.media.tumblr.com/avatar_a1aefbaa780f_16.png to
    // http://30.media.tumblr.com/avatar_a1aefbaa780f_128.png ; also as
    // https://gs1.wac.edgecastcdn.net/8019B6/data.tumblr.com/avatar_c9703e0bc252_64.png
    // TODO: Similar changes would help for images in archives, changing 128 to 400, 500, or 1280.
    // But we aren't guaranteed that those sizes exist so we don't handle that case.
    let tumblrRegExp = /(\.tumblr\.com\/avatar_[a-f0-9]+)_[0-9][0-9]\./;
    aImageSrc = aImageSrc.replace(tumblrRegExp, "$1_128.");

    // For Google Play Android Apps, change
    // https://lh6.ggpht.com/JAPlPOSg988jbSWvtxUjFObCguHOJk1yB1haLgUmFES_r7ZhAZ-c7WQEhC3-Sz9qDT0=h230 to
    // https://lh6.ggpht.com/JAPlPOSg988jbSWvtxUjFObCguHOJk1yB1haLgUmFES_r7ZhAZ-c7WQEhC3-Sz9qDT0 and
    // and ...=w124 and ...==w78-h78
    let googlePlayRegExp = new RegExp("(\\.ggpht\\.com/.*)=[-wh0-9]+$");
    let aImageSrc = aImageSrc.replace(googlePlayRegExp, "$1");
    
    // For Wordpress and Bing Images, etc., get URL from
    // imgurl=... part.
    // eg, change:
    // http://s2.wp.com/imgpress?w=222&url=http%3A%2F%2Fthreehundredsixtysixdaysdotcom.files.wordpress.com%2F2012%2F02%2Fvalentines_me.jpg to
    // http://threehundredsixtysixdaysdotcom.files.wordpress.com/2012/02/valentines_me.jpg
    let imgurlEx = /.*[\?&](img_?)?url=([^&]+).*$/;
    if (imgurlEx.test(aImageSrc)) {
      aImageSrc = aImageSrc.replace(imgurlEx, "$2");
      aImageSrc = decodeURIComponent(aImageSrc);
      if (! /^https?:\/\/./i.test(aImageSrc)) {
        ThumbnailZoomPlus.Pages._logger.debug("getZoomImage: adding http:// prefix after finding url=" +
                                              aImageSrc);
        aImageSrc = "http://" + aImageSrc;
      }
    }
    if (verbose) ThumbnailZoomPlus.Pages._logger.debug(
            "thumbnail getZoomImage p20: so far have " + aImageSrc);
    
    // For wordpress, change:
    // http://trulybogus.files.wordpress.com/2012/02/p2126148.jpg?w=150&h=104 to
    // http://trulybogus.files.wordpress.com/2012/02/p2126148.jpg
    // Similarly for http://wsj2day.files.wordpress.com/2012/03/wsj4060.jpg?w=72&crop=1&h=72
    let wordpressEx = new RegExp("https?://[^/]+\\.files\\.wordpress\\.com/");
    if (wordpressEx.test(aImageSrc)) {
      aImageSrc = aImageSrc.replace(/[?&]w=[0-9]+/, "");
      aImageSrc = aImageSrc.replace(/[?&]h=[0-9]+/, "");
      aImageSrc = aImageSrc.replace(/[?&]crop=[0-9]+/, "");
    }
    
    // egotastic.com; may generalize to other wordpress sites (not necessarily 
    // wordpress.com) but don't know.
    // http://cdn02.cdn.egotastic.com/wp-content/uploads/2012/04/30/miley-cyrus-striped-top-pilates-07-94x94.jpg becomes
    // http://cdn02.cdn.egotastic.com/wp-content/uploads/2012/04/30/miley-cyrus-striped-top-pilates-07.jpg
    let wpContentEx = new RegExp("(egotastic\.com/wp-content/uploads/.*)-[0-9]+x[0-9]+(" + 
                                 ThumbnailZoomPlus.Pages._imageTypesRegExpStr + ")");
    aImageSrc = aImageSrc.replace(wpContentEx, "$1$2");
    
    // For blogger aka Blogspot, change
    // http://3.bp.blogspot.com/-3LhFo9B3BFM/T0bAyeF5pFI/AAAAAAAAKMs/pNLJqyZogfw/s500/DSC_0043.JPG to
    // http://3.bp.blogspot.com/-3LhFo9B3BFM/T0bAyeF5pFI/AAAAAAAAKMs/pNLJqyZogfw/s1600/DSC_0043.JPG; change
    // http://1.bp.blogspot.com/-cCrMafs3SJ4/TwcFrqD23II/AAAAAAAABCg/3GxEgPh0qRQ/s320-p/Tiara+Riley.jpeg to
    // http://1.bp.blogspot.com/-cCrMafs3SJ4/TwcFrqD23II/AAAAAAAABCg/3GxEgPh0qRQ/s1600-p/Tiara+Riley.jpeg
    // NOTE: This rule exists in both Others and Thumbnails, and should be the same in both.
    let blogspotRegExp = new RegExp("(\\.(blogspot|blogger)\\.com/.*)/s[0-9]+(-[a-z])?/([^/?&]+\.[^./?&]*)$");
    aImageSrc = aImageSrc.replace(blogspotRegExp, "$1/s1600/$4");
    
    // For weibo.com profile pics, change
    // http://tp1.sinaimg.cn/1744655144/50/5602386657/0 to
    // http://tp1.sinaimg.cn/1744655144/180/5602386657/0
    aImageSrc = aImageSrc.replace(/(\.sinaimg\.cn\/[0-9]+)\/50\/(.*)/, "$1/180/$2");

    // For weibo.com photos, change
    // http://ww4.sinaimg.cn/thumbnail/4b80c1bdjw1drrv3te5ygj.jpg to
    // http://ww4.sinaimg.cn/large/4b80c1bdjw1drrv3te5ygj.jpg
    aImageSrc = aImageSrc.replace(/(\.sinaimg\.cn)\/thumbnail/, "$1/large");

    aImageSrc = aImageSrc.replace(/\/free_pictures\/thumbs\//, "/free_pictures/normal/");
    
    // For taobao.com, change
    // http://img01.taobaocdn.com/bao/uploaded/i2/T130KYXatnXXXL.Tk3_051312.jpg_310x310.jpg to
    // http://img01.taobaocdn.com/bao/uploaded/i2/T130KYXatnXXXL.Tk3_051312.jpg
    // sim for http://img02.taobaocdn.com/bao/uploaded/i2/T1zrSVXitjXXaE.Ufb_095429.jpg_b.jpg
    aImageSrc = aImageSrc.replace(new RegExp("(/bao/.*\\.jpg)_(?:[0-9]+x[0-9]+|[a-z]+)\\.jpg$"), "$1");
    
    // For leBonCoin.fr: image URLs don't contain the site domainname, so instead
    // we verify the site using baseURI.
    let leBonCoinSiteRegExp = new RegExp("\\.leboncoin\\.fr/", "i");
    if (leBonCoinSiteRegExp.test(node.baseURI)) {
      // change
      // http://193.164.197.30/thumbs/171/1716737621.jpg to
      // http://193.164.197.30/images/171/1716737621.jpg
      let leBonCoinRegExp = new RegExp("/thumbs/([0-9]+/[0-9]+" + 
                                       ThumbnailZoomPlus.Pages._imageTypesRegExpStr +
                                       ")");
      aImageSrc = aImageSrc.replace(leBonCoinRegExp, "/images/$1");
    }
    
    if (verbose) ThumbnailZoomPlus.Pages._logger.debug(
            "thumbnail getZoomImage p30: so far have " + aImageSrc);

    // minus.com
    let minusRegexp = new RegExp("([.\\/]minus\\.com/.*)_(e|xs)\\.jpg");
    if (verbose) ThumbnailZoomPlus.Pages._logger.debug(
            "thumbnail getZoomImage: testing " + aImageSrc + " against " + minusRegexp +
            ": " + minusRegexp.test(aImageSrc));
    aImageSrc = aImageSrc.replace(minusRegexp, "$1.jpg");

    if (verbose) ThumbnailZoomPlus.Pages._logger.debug(
            "thumbnail getZoomImage p40: so far have " + aImageSrc);

    // For 500px.com change
    // http://pcdn.500px.net/6151440/23d1e866fda841f169e5f1bc5a329a7c217392cd/2.jpg to
    // http://pcdn.500px.net/6151440/23d1e866fda841f169e5f1bc5a329a7c217392cd/4.jpg
    aImageSrc = aImageSrc.replace(new RegExp("(https?://[^/?]*\\.500px\\.net/.*)/[123](" + 
                                  ThumbnailZoomPlus.Pages._imageTypesRegExpStr + ")"),
                                  "$1/4$2");
                                  
    // For some sites where /images/thumb/(digits) changes thumb to full.
    // This really belongs more in the Others rule, but it often wouldn't
    // work since it'd instead follow the <a> link around the image.
    let regEx = new RegExp("(/images)/(thumb|mini)/([0-9]+/[0-9]+/[0-9]+\.)");
    aImageSrc = aImageSrc.replace(regEx, "$1/full/$3");
    
    // For xh*ster.com, change 000/014/111/004_160.jpg to 000/014/111/004_1000.jpg
    let regEx = new RegExp("(xh[a-z0-9]*ster.com.*/[0-9]+/[0-9]+/[0-9]+/[0-9]+)_[0-9]{1,3}(\.[a-z]+)");
    aImageSrc = aImageSrc.replace(regEx, "$1_1000$2");
    
    aImageSrc = aImageSrc.replace(new RegExp("/uploaded_pics/thumbs/(pha.[0-9]+\.)"), "/uploaded_pics/$1");
    
    aImageSrc = aImageSrc.replace(/\/livesnap100\//, "/livesnap320/");
    
    aImageSrc = aImageSrc.replace(/(fantasti\..*\/+big\/.*)\/thumb[\/]/i, 
                                  "$1/");
    
    // Sites using Piwigo image gallery, eg
    // http://www.worldwidefieldguide.com/galleries/Plantae/Ranunculales/Ranunculaceae/Pulsatilla/vulgaris/thumbnail/TN-DSCN0585.jpg becomes
    // http://www.worldwidefieldguide.com/galleries/Plantae/Ranunculales/Ranunculaceae/Pulsatilla/vulgaris/DSCN0585.jpg
    if ("thumbnail" == nodeClass && 
        "wrap2" == node.parentNode.parentNode.getAttribute("class")) {
      aImageSrc = aImageSrc.replace("/thumbnail/TN-", "/");
    }
    
    // td-galerie:
    // http://raxanathos.free.fr/modules/td-galerie/mini/20070407230812-4.jpg becomes
    // http://raxanathos.free.fr/modules/td-galerie/imgs/20070407230812-3.jpg
    aImageSrc = aImageSrc.replace("modules/td-galerie/mini/", "modules/td-galerie/imgs/");
    
    // Google Play album: change
    // https://lh4.googleusercontent.com/Z0AD4MsVIa8qoMs69GmZqNRHq-dzapfbO_HrviLyBmmbgnwi1_YmhId29CojSoERSbdrqEMonBU=w128 to
    // https://lh4.googleusercontent.com/Z0AD4MsVIa8qoMs69GmZqNRHq-dzapfbO_HrviLyBmmbgnwi1_YmhId29CojSoERSbdrqEMonBU=w1000
    // and
    // https://encrypted.google.com/books?id=bgMiAFs66bwC&printsec=frontcover&img=2&zoom=2&source=ge-web-market to
    // https://encrypted.google.com/books?id=bgMiAFs66bwC&printsec=frontcover&img=2&zoom=0&source=ge-web-market
    aImageSrc = aImageSrc.replace(/(\.googleusercontent\.com\/.*=)w[0-9][0-9][0-9]?$/, "$1w1000");
    aImageSrc = aImageSrc.replace(/(\.google\.com\/books?.*)&zoom=1&/, "$1&zoom=0&");

    // For diasp.org:
    // https://diasp.org/uploads/images/thumb_small_d4abd1cd065ed5746b01.jpg ->
    // https://diasp.org/uploads/images/d4abd1cd065ed5746b01.jpg
    // https://joindiaspora.com/uploads/images/thumb_small_Tf3hixImiB4d06d4482c174313aa001347.jpeg
    aImageSrc = aImageSrc.replace(new RegExp("/uploads/images/thumb_small_([a-z0-9]+" +
                                             ThumbnailZoomPlus.Pages._imageTypesRegExpStr + ")", "i"),
                                             "/uploads/images/$1");
    
    // modelmayhem.com:
    // http://photos.modelmayhem.com/avatars/6/1/6/5/8/3/4f8d45b8e42d2_t.jpg to
    // http://photos.modelmayhem.com/avatars/6/1/6/5/8/3/4f8d45b8e42d2_m.jpg
    aImageSrc = aImageSrc.replace(new RegExp("^(https?://photos\\.modelmayhem\\.com/avatars/.*)_t(" + 
                                             ThumbnailZoomPlus.Pages._imageTypesRegExpStr + ")", "i"),
                                             "$1_m$2");
    // http://photos.modelmayhem.com/photos/111202/20/4ed9ac558b0ef_m.jpg to
    // http://photos.modelmayhem.com/photos/111202/20/4ed9ac558b0ef.jpg
    aImageSrc = aImageSrc.replace(new RegExp("^(https?://photos\\.modelmayhem\\.com/photos/.*)_[a-z](" + 
                                             ThumbnailZoomPlus.Pages._imageTypesRegExpStr + ")", "i"),
                                             "$1$2");

    // viddy.com (see also in Others rule):
    // http://cdn.viddy.com/images/users/thumb/15dfd804-ab4f-4998-a1f4-fc56277fe0b3_150x150.jpg to
    // http://cdn.viddy.com/images/users/15dfd804-ab4f-4998-a1f4-fc56277fe0b3.jpg
    aImageSrc = aImageSrc.replace(new RegExp("^(https?://[^/]+\\.viddy\\.com/.*)/thumb/(.*)_[0-9]+x[0-9]+(" + 
                                             ThumbnailZoomPlus.Pages._imageTypesRegExpStr + ")", "i"),
                                             "$1/$2$3");
    
    // imageporter.com
    aImageSrc = aImageSrc.replace(/(imageporter\.com\/.*)_t\.jpg/, "$1.jpg");

    aImageSrc = aImageSrc.replace(new RegExp("^(https?://images[0-9]*\\.pin[a-z]+\\.com/" +
                                             "images/pin[a-z]+/[0-9]+/[0-9]+/[0-9]+)/[0-9x]+/" +
                                             "([0-9a-z]+" + ThumbnailZoomPlus.Pages._imageTypesRegExpStr + ")", "i"),
                                  "$1/620/$2");
    // imagetwist:
    // http://img8.imagetwist.com/th/01282/999sz25wbi76.jpg becomes
    // http://img8.imagetwist.com/i/01282/999sz25wbi76.jpg
    aImageSrc = aImageSrc.replace(/(\.imagetwist\.com\/)th\//, "$1i/");

    // imgchili.com:
    // http://t2.imgchili.com/7428/9998984_ie_011.jpg becomes
    // http://i2.imgchili.com/7428/9998984_ie_011.jpg
    aImageSrc = aImageSrc.replace(/:\/\/t([0-9]+\.imgchili\.com\/)/, "://i$1/");

    // pixiv.net
    // http://img29.pixiv.net/img/puppy/12345678_s.jpg becomes
    // http://img29.pixiv.net/img/puppy/12345678_m.jpg
    aImageSrc = aImageSrc.replace(new RegExp("(pixiv.net/img/.*)_s(" + 
                                             ThumbnailZoomPlus.Pages._imageTypesRegExpStr + ")", "i"),
                                             "$1_m$2");
    // http://img01.pixiv.net/img/ajoritas/1234567_100.jpg?ctype=ranking becomes
    // http://img01.pixiv.net/img/ajoritas/1234567_m.jpg?ctype=ranking 
    aImageSrc = aImageSrc.replace(new RegExp("(pixiv.net/img/.*)_[0-9]{2,3}(" + 
                                             ThumbnailZoomPlus.Pages._imageTypesRegExpStr + ")", "i"),
                                             "$1_m$2");
    
    // xuite.net
    // http://c.share.photo.xuite.net/konwewe/1c8dee9/5609298/217205911_c.jpg becomes
    // http://c.share.photo.xuite.net/konwewe/1c8dee9/5609298/217205911_x.jpg
    aImageSrc = aImageSrc.replace(/(:\/\/[^/]*photo\.xuite\.net\/.*\/[0-9]+)_[a-z]\.jpg/i, 
                                  "$1_x.jpg");

    // photo.net
    // http://static.photo.net/thumbnails/97/42/9742906-tn-lg.jpg becomes
    // http://gallery.photo.net/photo/9742906-lg.jpg
    // http://thumbs.photo.net/photo/14271073-sm.jpg becomes
    // http://gallery.photo.net/photo/14271073-lg.jpg
    aImageSrc = aImageSrc.replace(/(:\/\/)(?:static|thumbs)\.photo\.net\/.*\/(.*?)-(?:tn-)?[a-z0-9]*\.jpg/i, 
                                  "$1gallery.photo.net/photo/$2-lg.jpg");
    
    // redbox.com
    // http://images.redbox.com/Images/EPC/Thumb150/5584.jpg becomes
    // http://images.redbox.com/Images/EPC/Detail370/5584.jpg
    before = aImageSrc;
    aImageSrc = aImageSrc.replace(/^(https?:\/\/images\.redbox\.com\/Images\/EPC)\/Thumb[0-9]+\/([0-9]+\.jpg)$/i,
                                  "$1/Detail370/$2");
    if (before != aImageSrc) {
      flags.popupAvoiderLREdge = 1;
      flags.popupAvoiderWidth = 422;
    }
    
    // weheartit.com uses 
    // http://data.whicdn.com/images/24321233/6cj4w2c9qtgj_large.jpg ->
    // http://data.whicdn.com/images/24321233/6cj4w2c9qtgj_thumb.jpg
    aImageSrc = aImageSrc.replace(/(data\.whicdn\.com\/images\/.*)_thumb\.jpg/,
                                  "$1_large.jpg");
    
    // Huffingtonpost.com
    // http://i.huffpost.com/gen/574638/thumbs/s-MILA-KUNIS-WITHOUT-MAKEUP-154x114.jpg becomes
    // http://i.huffpost.com/gen/574638/thumbs/o-MILA-KUNIS-WITHOUT-MAKEUP-570.jpg
    // can also be -mini, -small.  Note that occasionally o-*570 doesn't exist,
    // but s-*large does.  We fail in that case.
    aImageSrc = aImageSrc.replace(/^(https?:\/\/i.huffpost.com\/gen\/.*\/thumbs)\/s-(.*)-(mini|small|large|[0-9]+x[0-9]+)[0-9]*\.jpg/i,
                                  "$1/o-$2-570.jpg");
    // http://i.huffpost.com/gen/576806/thumbs/r-SECRET-LIVES-OF-MOMS-medium260.jpg becomes
    // http://i.huffpost.com/gen/576806/thumbs/o-SECRET-LIVES-OF-MOMS-570.jpg
    aImageSrc = aImageSrc.replace(/^(https?:\/\/i.huffpost.com\/gen\/.*\/thumbs)\/r-(.*)-(mini|small|medium|large)[0-9]*\.jpg/i,
                                  "$1/o-$2-570.jpg");

    // smugmug.com
    // http://fotomom.smugmug.com/Daily-Photos/My-Best-Daily-Shots/i-NV2b7Mx/0/Ti/IMG5190Cropped8X10-Ti.jpg becomes
    // http://fotomom.smugmug.com/Daily-Photos/My-Best-Daily-Shots/i-NV2b7Mx/0/L/IMG5190Cropped8X10-L.jpg
    // or src as Th; or dest as X1, X3, or X3 instead of L.
    // Can be on other domains like on http://www.duffyknox.com/Personal/sports/Zion-Memorial-Day-adventure/23261775_gtCnDp#!i=1876521503&k=65764hV
    aImageSrc = aImageSrc.replace(new RegExp("(/[0-9]+/)T[hi](/.*-)T[hi](-.*)?(" + 
                                             ThumbnailZoomPlus.Pages._imageTypesRegExpStr + ")"),
                                  "$1X2$2X2$3$4");
                                  
    // http://papanaturephotography.smugmug.com/Flowers/Papa-Nature-Photography/DSC5217pscrop/804122257_FaNFY-Ti-2.jpg becomes
    // http://papanaturephotography.smugmug.com/Flowers/Papa-Nature-Photography/DSC5217pscrop/804122257_FaNFY-L-2.jpg
    aImageSrc = aImageSrc.replace(new RegExp("^(https?://[^/]*\\.smugmug\\.com/.*-)T[hi](-.*)?(" + 
                                             ThumbnailZoomPlus.Pages._imageTypesRegExpStr + ")"),
                                  "$1X2$2$3");
                                  
    // coppermine gallery, e.g.
    // http://coppermine-gallery.net/demo/cpg15x/ or
    // http://photo.net.ph/albums/userpics/10002/thumb_DSCN5416a.jpg becomes
    // http://photo.net.ph/albums/userpics/10002/DSCN5416a.jpg
    // album names can vary or be nested.
    // http://media.animegalleries.net/albums/rosario_vampire/moka_akashiya/thumb_rosario_moka_0192.jpg becomes
    // http://media.animegalleries.net/albums/rosario_vampire/moka_akashiya/rosario_moka_0192.jpg
    // 
    aImageSrc = aImageSrc.replace(/(\/albums\/[^?&]+\/)thumb_([^?&\/]+\.(jpg|png|gif))/i, 
                                  "$1$2");
    
    // Powered by PhotoPost vBGallery, eg
    // http://www.hondahookup.com/gallery/files/5/2/4/5/9/9/img_20120513_133135_thumb.jpg becomes
    // http://www.hondahookup.com/gallery/files/5/2/4/5/9/9/img_20120513_133135.jpg
    // and parent <a> tag includes "showimage.php".
    // This rule works for many sites, but some images have .jpg in thumb but .JPG in image.
    let photoPostRegEx = new RegExp("(/[0-9]+/.*)_thumb(" + 
                                    ThumbnailZoomPlus.Pages._imageTypesRegExpStr + ")");
    if (photoPostRegEx.test(aImageSrc)) {
      let parentName = String(node.parentNode)
      if (/showimage\.php/.test(parentName)) {
        aImageSrc = aImageSrc.replace(photoPostRegEx, "$1$2");
      }     
    }
    
    //
    aImageSrc = aImageSrc.replace(new RegExp("(tyimg\\.com/thumb)/[a-z]/[a-z]_(.*" + 
                                             ThumbnailZoomPlus.Pages._imageTypesRegExpStr + ")"),
                                  "$1/l/l_$2");
                                  
    // phpThumb (on various sites).  You can test it here if you turn off
    // the Others rule and on the Thumbnails rule (since the site's links are
    // bad): http://phpthumb.sourceforge.net/demo/demo/phpThumb.demo.demo.php
    // eg:
    // http://timmy/phpThumb/phpThumb.php?w=80&h=60&f=png&src=http://timmy/timmy/emp_pix/110024668.jpeg becomes
    // http://timmy/timmy/emp_pix/110024668.jpeg, or
    // http://phpthumb.sourceforge.net/demo/phpThumb.php?src=images/animaple.gif&w=25&f=gif&hash=30654d06a0e509eca0d14d08bf2f01d8 becomes
    // http://phpthumb.sourceforge.net/demo/images/animaple.gif
    before = aImageSrc;
    aImageSrc = aImageSrc.replace(/.*\/phpThumb\.php.*[?&]src=([^&]*).*/i,
                                  "$1");
    if (before != aImageSrc) {
      aImageSrc = decodeURIComponent(aImageSrc);
      aImageSrc = ThumbnailZoomPlus.FilterService._applyThisBaseURI(node.ownerDocument, before, aImageSrc);
    }
    
    // nytimes.com:
    // http://graphics8.nytimes.com/images/2012/06/22/us/JASPER-3/JASPER-3-articleInline.jpg becomes
    // http://graphics8.nytimes.com/images/2012/06/22/us/JASPER-3/JASPER-3-popup.jpg ,
    // http://i1.nyt.com/images/2012/06/22/theater/22MOTH_ASYOU/22MOTH_ASYOU-moth.jpg becomes
    // http://graphics8.nytimes.com/images/2012/06/22/arts/22ASYOU_SPAN/22ASYOU_SPAN-articleLarge.jpg (removes MOTH_)
    // http://i1.nyt.com/images/2012/06/22/arts/22MOTH_HOT/22MOTH_HOT-moth.jpg becomes
    // http://graphics8.nytimes.com/images/2012/06/22/arts/22HOT/22HOT-popup.jpg (removes MOTH_)
    // Some URLs become _SPAN-articleLarge but how do we know which?
    before = aImageSrc;
    aImageSrc = aImageSrc.replace(/(\.(?:nytimes|nyt)\.com\/images\/.*)-(articleInline|moth|thumbStandard|custom[0-9]*|blog[0-9]*)/,
                                  "$1-popup");
    aImageSrc = aImageSrc.replace(/(\.(?:nytimes|nyt)\.com\/images\/.*)-(videoThumb|sfSpan|hpMedium)/,
                                  "$1-articleLarge");
    if (before != aImageSrc) {
      aImageSrc = aImageSrc.replace(/MOTH_/g, "");
      // We don't always know which of -popup or -articleLarge to use.  Our
      // framework doesn't support trying both, so suppress the error indicator.
      flags.noErrorIndicator = true;
    }
    
    // Using the thumb itself as source; don't annoy the user with
    // "too small" warnings, which would be quite common.
    flags.noTooSmallWarning = true;

    if (verbose) ThumbnailZoomPlus.Pages._logger.debug(
            "thumbnail getZoomImage p99: so far have " + aImageSrc);

    return aImageSrc; 
  }