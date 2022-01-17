function(ev, el) {

	var target = document.id(el.get('href').substring(1))
	, active = el.getParent('.nav-tabs').getElement('li.active')

	ev.preventDefault()

	if (!target) return

	if (active)
	{
		active.removeClass('active')
	}

	el.getParent('li').addClass('active')

	target.getParent('.tab-content').getChildren().each(function(pane) {

		pane[target == pane ? 'addClass' : 'removeClass']('active')
	})
}