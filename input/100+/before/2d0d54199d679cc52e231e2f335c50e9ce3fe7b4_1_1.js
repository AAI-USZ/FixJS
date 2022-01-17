function(ev, el) {

	var target = document.id(el.get('href').substring(1))

	if (!target) return

	target.getParent('.tab-content').getChildren().each(function(pane) {

		pane[target == pane ? 'addClass' : 'removeClass']('active')
	})
}