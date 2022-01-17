function (i, n) {
            var $el = $(this)
              , href = $el.data('target') || (n.hash)
              , $href = /^#\w/.test(href) && $(href)
            return ( $href
              && href.length
              && [[ $href.position().top, href ]] ) || null
          }