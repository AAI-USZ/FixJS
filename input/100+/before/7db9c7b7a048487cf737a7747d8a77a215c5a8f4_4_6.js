function handleExtensionChannelMessage (req) {
		if (!req) return;

		var t = getEditorCore();
		switch (req.type) {
		case 'relocate':
			targetElement.rect = req.rect;
			setGeometory();
			break;
		case 'authorize-response':
			if (req.error) {
				showMessage(req.error, true, false);
				exCommandExecutor.stop();
				break;
			}
			showMessage(_('Obtaining access rights ({0})...', req.phase || '-'));
			break;
		case 'fileio-write-response':
			if (req.error) {
				showMessage(req.error, true, false);
				console.log(req.error.replace(/&/g, '\n&'));
				//exCommandExecutor.stop();
				break;
			}
			switch (req.state) {
			case 'buffered':
				showMessage(_('Buffered: {0}', fileName));
				break;
			case 'writing':
				showMessage(_('Writing ({0}%)', req.progress.toFixed(2)));
				break;
			case 'complete':
				showMessage(_('Written: {0}', getFileIoResultInfo(t, req.meta.charLength)));
				break;
			}
			//exCommandExecutor.runAsyncNext();
			break;
		case 'fileio-read-response':
			//console.log('*** fileio-read-response ***\n' + JSON.stringify(req, null, ' '));
			if (req.error) {
				showMessage(req.error, true, false);
				exCommandExecutor.stop();
				break;
			}
			switch (req.state) {
			case 'reading':
				showMessage(_('Reading ({0}%)', req.progress.toFixed(2)));
				break;
			case 'complete':
				var read = exCommandExecutor.lastCommandObj.clone();
				read.handler = function (t, a) {
					switch (this.name) {
					case 'read':
						return ExCommand.read(t, a, req.content, req.meta);
					case 'edit':
						return ExCommand.edit(t, a, req.content, req.meta);
					}
					return _('Invalid read handler.');
				};
				exCommandExecutor.runAsyncNext(read, exCommandExecutor.lastCommandArg);
				break;
			}
		}
	}