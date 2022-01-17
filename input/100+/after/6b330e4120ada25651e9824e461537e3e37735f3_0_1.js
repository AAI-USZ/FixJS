function () {
	turntablePlayer.init();

	// panels
	if (turntablePlayer.options.panels.cover)
		document.getElementById('panel-cover').checked = true;
	else
		document.getElementById('panel-cover').checked = false;

	if (turntablePlayer.options.panels.playlist)
		document.getElementById('panel-playlist').checked = true;
	else
		document.getElementById('panel-playlist').checked = false;

	if (turntablePlayer.options.panels.infos)
		document.getElementById('panel-infos').checked = true;
	else
		document.getElementById('panel-infos').checked = false;

	var infos = ['duration', 'current', 'timer', 'position'];
	for (var i in infos) {
		if (turntablePlayer.options.infos.indexOf(infos[i]) != -1)
			document.getElementById('panel-infos-choice-' + infos[i]).checked = true;
		else
			document.getElementById('panel-infos-choice-' + infos[i]).checked = false;
	}

	// mode
	var modes = ['manual', 'automatic', 'semiautomatic'];
	for (var i in modes) {
		if (turntablePlayer.options.mode == modes[i])
			document.getElementById('mode-' + modes[i]).checked = true;
		else
			document.getElementById('mode-' + modes[i]).checked = false;
	}

	// theme
	var themes = ['wood', 'alu'];
	for (var i in themes) {
		if (turntablePlayer.options.theme == themes[i])
			document.getElementById('theme-' + themes[i]).checked = true;
		else
			document.getElementById('theme-' + themes[i]).checked = false;
	}

	// debug
	if (turntablePlayer.options.debug)
		document.getElementById('debug').checked = true;
	else
		document.getElementById('debug').checked = false;
}