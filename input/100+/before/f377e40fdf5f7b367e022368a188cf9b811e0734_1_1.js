function(AtKit) {
	var jQ = AtKit.lib();

	var baseURL = AtKit.getResourceURL() + "/presentation/images/";

	jQ.facebox = function(data, klass) {
		jQ.facebox.loading()
		
		if (data.div) fillFaceboxFromHref(data.div)
		else if (jQ.isFunction(data)) data.call(jQ)
		else jQ.facebox.reveal(data, klass)
	}

  /*
   * Public, jQ.facebox methods
   */

  jQ.extend(jQ.facebox, {
    settings: {
      opacity      : 0,
      overlay      : true,
      loadingImage : baseURL + 'loading.gif',
      closeImage   : baseURL + 'closelabel.gif',
      imageTypes   : [ 'png', 'jpg', 'jpeg', 'gif' ],
      faceboxHtml  : '\
    <div id="facebox" style="display:none;position: absolute;top:0;left: 0;z-index: 100;text-align: left;width:410px"> \
      <div class="popup" style="position: relative;"> \
        <table style="border-collapse: collapse;border:none"> \
          <tbody> \
            <tr> \
              <td class="tl" style="background:url(' + baseURL + '/tl.png); border: 0 none; border-bottom: 0;padding: 0;height: 10px;width: 10px;overflow: hidden;padding: 0;" /><td class="b" style="background:url(' + baseURL + '/b.png); border: 0 none; border-bottom: 0;padding: 0;" /><td class="tr" style="background:url(' + baseURL + '/tr.png); border: 0 none;height: 10px;width: 10px;overflow: hidden;padding: 0;" /> \
            </tr> \
            <tr> \
              <td class="b" style="background:url(' + baseURL + '/b.png); border: 0 none; border-bottom: 0;padding: 0;" /> \
              <td class="body" style="border-bottom: 0;padding: 10px;background: #fff;width: 370px;"> \
                <div class="content"> \
                </div> \
                <div class="footer" style="border-top: 1px solid #DDDDDD;padding-top: 5px;margin-top: 10px;text-align: right;"> \
                  <a href="#" class="close"> \
                    <img src="' + baseURL + '/closelabel.gif" title="close" class="close_image" /> \
                  </a> \
                </div> \
              </td> \
              <td class="b" style="background:url(' + baseURL + '/b.png); border: 0 none; border-bottom: 0;padding: 0;" /> \
            </tr> \
            <tr> \
              <td class="bl" style="background:url(' + baseURL + '/bl.png); border: 0 none; border-bottom: 0;padding: 0;height: 10px;width: 10px;overflow: hidden;padding: 0;" /><td class="b" style="background:url(' + baseURL + '/b.png); border: 0 none; border-bottom: 0;padding: 0;" /><td class="br" style="background:url(' + baseURL + '/br.png); border: 0 none; border-bottom: 0;padding: 0;height: 10px;width: 10px;overflow: hidden;padding: 0;" /> \
            </tr> \
          </tbody> \
        </table> \
      </div> \
    </div>'
    },

    loading: function() {
      init()
      if (jQ('#facebox .loading').length == 1) return true
      showOverlay()

      jQ('#facebox .content').empty()
      jQ('#facebox .body').children().hide().end().
        append('<div class="loading"><img src="'+jQ.facebox.settings.loadingImage+'"/></div>')

      jQ('#facebox').css({
        top:	getPageScroll()[1] + (getPageHeight() / 10),
        left:	385.5
      }).show()

      jQ(document).bind('keydown.facebox', function(e) {
        if (e.keyCode == 27) jQ.facebox.close()
        return true
      })
      jQ(document).trigger('loading.facebox')
    },

    reveal: function(data, klass) {
      jQ(document).trigger('beforeReveal.facebox')
      if (klass) jQ('#facebox .content').addClass(klass)
      jQ('#facebox .content').append(data)
      jQ('#facebox .loading').remove()
      jQ('#facebox .body').children().fadeIn('normal')
      jQ('#facebox').css('left', jQ(window).width() / 2 - (jQ('#facebox table').width() / 2))
      jQ(document).trigger('reveal.facebox').trigger('afterReveal.facebox')
    },

	changeFaceboxContent: function(data) {
		jQ('#facebox .content').html(data);
	},

    close: function() {
      jQ(document).trigger('close.facebox')
      return false
    }
  })

  /*
   * Public, jQ.fn methods
   */

  jQ.fn.facebox = function(settings) {
    init(settings)

    function clickHandler() {
      jQ.facebox.loading(true)

      // support for rel="facebox.inline_popup" syntax, to add a class
      // also supports deprecated "facebox[.inline_popup]" syntax
      var klass = this.rel.match(/facebox\[?\.(\w+)\]?/)
      if (klass) klass = klass[1]

      fillFaceboxFromHref(this.href, klass)
      return false
    }

    return this.click(clickHandler)
  }

  /*
   * Private methods
   */

  // called one time to setup facebox on this page
  function init(settings) {
    if (jQ.facebox.settings.inited) return true
    else jQ.facebox.settings.inited = true

    jQ(document).trigger('init.facebox')
    makeCompatible()

    var imageTypes = jQ.facebox.settings.imageTypes.join('|')
    jQ.facebox.settings.imageTypesRegexp = new RegExp('\.' + imageTypes + '$', 'i')

    if (settings) jQ.extend(jQ.facebox.settings, settings)
	jQ('#sbar').after(jQ.facebox.settings.faceboxHtml)

    var preload = [ new Image(), new Image() ]
    preload[0].src = jQ.facebox.settings.closeImage
    preload[1].src = jQ.facebox.settings.loadingImage

    jQ('#facebox').find('.b:first, .bl, .br, .tl, .tr').each(function() {
      preload.push(new Image())
      preload.slice(-1).src = jQ(this).css('background-image').replace(/url\((.+)\)/, '$1')
    })

    jQ('#facebox .close').click(jQ.facebox.close)
    jQ('#facebox .close_image').attr('src', jQ.facebox.settings.closeImage)
  }
  
  // getPageScroll() by quirksmode.com
  function getPageScroll() {
    var xScroll, yScroll;
    if (self.pageYOffset) {
      yScroll = self.pageYOffset;
      xScroll = self.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {	 // Explorer 6 Strict
      yScroll = document.documentElement.scrollTop;
      xScroll = document.documentElement.scrollLeft;
    } else if (document.body) {// all other Explorers
      yScroll = document.body.scrollTop;
      xScroll = document.body.scrollLeft;	
    }
    return new Array(xScroll,yScroll) 
  }

  // Adapted from getPageSize() by quirksmode.com
  function getPageHeight() {
    var windowHeight
    if (self.innerHeight) {	// all except Explorer
      windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
      windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
      windowHeight = document.body.clientHeight;
    }	
    return windowHeight
  }

  // Backwards compatibility
  function makeCompatible() {
    var jQs = jQ.facebox.settings

    jQs.loadingImage = jQs.loading_image || jQs.loadingImage
    jQs.closeImage = jQs.close_image || jQs.closeImage
    jQs.imageTypes = jQs.image_types || jQs.imageTypes
    jQs.faceboxHtml = jQs.facebox_html || jQs.faceboxHtml
  }

  // Figures out what you want to display and displays it
  // formats are:
  //     div: #id
  //   image: blah.extension
  //    ajax: anything else
  function fillFaceboxFromHref(href, klass) {
    // div
    if (href.match(/#/)) {
      var url    = window.location.href.split('#')[0]
      var target = href.replace(url,'')
      jQ.facebox.reveal(jQ(target).clone().show(), klass)

    // image
    } else if (href.match(jQ.facebox.settings.imageTypesRegexp)) {
      fillFaceboxFromImage(href, klass)
    // ajax
    } else {
      fillFaceboxFromAjax(href, klass)
    }
  }


  function skipOverlay() {
    return jQ.facebox.settings.overlay == false || jQ.facebox.settings.opacity === null 
  }

  function showOverlay() {
    if (skipOverlay()) return

    if (jQ('facebox_overlay').length == 0) 
      jQ("body").append('<div id="facebox_overlay" class="facebox_hide" style="position: fixed;top: 0px;left: 0px;height:100%;width:100%;"></div>')

    jQ('#facebox_overlay').hide().addClass("facebox_overlayBG")
      .css('opacity', jQ.facebox.settings.opacity)
      .click(function() { jQ(document).trigger('close.facebox') })
      .fadeIn(200)
    return false
  }

  function hideOverlay() {
    if (skipOverlay()) return

    jQ('#facebox_overlay').fadeOut(200, function(){
      jQ("#facebox_overlay").removeClass("facebox_overlayBG")
      jQ("#facebox_overlay").css("z-index", "-100"); 
      jQ("#facebox_overlay").remove()
    })
    
    return false
  }

  /*
   * Bindings
   */

  jQ(document).bind('close.facebox', function() {
    jQ(document).unbind('keydown.facebox')
    jQ('#facebox').fadeOut(function() {
      jQ('#facebox .content').removeClass().addClass('content')
      hideOverlay()
      jQ('#facebox .loading').remove()
    })
  })

}