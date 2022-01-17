function handleClick(event, container, options) {
  options = optionsFor(container, options)

  var link = event.currentTarget

  if (link.tagName.toUpperCase() !== 'A')
    throw "$.fn.pjax or $.pjax.click requires an anchor element"

  // Middle click, cmd click, and ctrl click should open
  // links in a new tab as normal.
  if ( event.which > 1 || event.metaKey || event.ctrlKey )
    return

  // Ignore cross origin links
  if ( location.protocol !== link.protocol || location.host !== link.host )
    return

  if ( link.hash ) {
    // Ignore anchors on the same page
    if ( link.href.replace(link.hash, '') ===
         location.href.replace(location.hash, '') )
      return
  } else {
    // Ignore trailing (empty) anchors on the same page (href="(.*)#"),
    // which get treated differently (link.hash = '', link.href ends with a #)
    if ( link.href === location.href + '#' )
      return
  }

  var defaults = {
    url: link.href,
    container: $(link).attr('data-pjax'),
    target: link,
    clickedElement: $(link), // DEPRECATED: use target
    fragment: null
  }

  $.pjax($.extend({}, defaults, options))

  event.preventDefault()
}