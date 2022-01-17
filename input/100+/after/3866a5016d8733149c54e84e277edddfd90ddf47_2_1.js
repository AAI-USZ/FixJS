function () {
        var self = this
          , $targets

        this.offsets = $([])
        this.targets = $([])

		// KWD
		// removes the #somelocation from the target using (n.hash)
		// because joomla menus require the whole path to be used - eg /somepage#somelocation
		// and $targets needs to be the anchor - eg #somelocation - only
        $targets = this.$body
          .find(this.selector)
          .map(function (i, n) {
            var $el = $(this)
              , href = $el.data('target') || (n.hash)
              , $href = /^#\w/.test(href) && $(href)
            return ( $href
              && href.length
              && [[ $href.position().top, href ]] ) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
            self.offsets.push(this[0])
            self.targets.push(this[1])
          })
      }