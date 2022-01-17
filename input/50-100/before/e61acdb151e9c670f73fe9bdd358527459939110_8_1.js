function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[ $.type(title) == 'object' ? 'append' : 'html' ](title)
      $tip.find('.popover-content > *')[ $.type(content) == 'object' ? 'append' : 'html' ](content)

      $tip.removeClass('fade top bottom left right in')
    }