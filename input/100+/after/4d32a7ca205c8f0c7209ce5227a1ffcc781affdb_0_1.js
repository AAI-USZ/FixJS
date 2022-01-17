function(mode, noTab) {

			aigua.pause = true;

			if (!noTab) {
				$('#modes h2').attr('class', 'passive');
				$("#modes h2:contains('" + mode + "')").attr('class', 'active');
			}

			aigua.modes[aigua.currentModeIndex].code = aigua.codeMirror.getValue();

			aigua.currentModeIndex = _.indexOf(_.pluck(aigua.modes, 'name'), mode);

			aigua.codeMirror.setValue(aigua.modes[aigua.currentModeIndex].code || '');

			aigua.codeMirror.setOption("mode", aigua.modes[aigua.currentModeIndex].name);
			CodeMirror.autoLoadMode(aigua.codeMirror, aigua.modes[aigua.currentModeIndex].name);

			aigua.pause = false;
		}