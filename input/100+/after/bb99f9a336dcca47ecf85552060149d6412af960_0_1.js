function(fieldID, enabled, onText, offText, isTable) {
		enabled = enabled || false;
		var checked = (enabled) ? 'CHECKED' : '';
		onText = onText || 'on';
		offText = offText || 'off';
		var thisToggle = document.createElement('div');
		thisToggle.setAttribute('class','toggleButton');
		thisToggle.setAttribute('id',fieldID+'Container');
		var tableAttr = '';
		if (isTable) {
			tableAttr = ' tableOption="true"';
		}
		// thisToggle.innerHTML = '<span class="toggleOn">'+onText+'</span><span class="toggleOff">'+offText+'</span><input type="checkbox" style="visibility: hidden;" '+checked+'>';
		thisToggle.innerHTML = '<span class="toggleOn">'+onText+'</span><span class="toggleOff">'+offText+'</span><input id="'+fieldID+'" type="checkbox" '+tableAttr+checked+'>';
		thisToggle.addEventListener('click',function(e) {
			var thisCheckbox = this.querySelector('input[type=checkbox]');
			var enabled = thisCheckbox.checked;
			thisCheckbox.checked = !enabled;
			(!enabled) ? addClass(this,'enabled') : removeClass(this,'enabled');
		}, false);
		if (enabled) addClass(thisToggle,'enabled');
		return thisToggle;
	}