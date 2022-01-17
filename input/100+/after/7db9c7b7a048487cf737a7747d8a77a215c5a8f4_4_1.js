function ExCommandExecutor (editor, isRoot, onFinish) {
		this.editor = editor;
		this.commands = [];
		this.editLogLevel = 0;
		this.isRoot = !!isRoot;
		this.isAsync = false;
		this.sGlobalSpecified = false;
		this.source = '';
		this.onFinish = onFinish || null;
		this.lastError = undefined;
		this.lastCommand = undefined;

		var running = false;
		this.__defineGetter__('running', function () {return running;});
		this.__defineSetter__('running', function (v) {
			if (v == running) return;
			running = v;
			$('wasavi_cover').className = v ? 'dim' : '';
		});
	}