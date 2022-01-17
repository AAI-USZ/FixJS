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

		var isRunning = false;
		this.__defineGetter__('isRunning', function () {return isRunning;});
		this.__defineSetter__('isRunning', function (v) {
			if (v == isRunning) return;
			isRunning = v;
			$('wasavi_cover').className = v ? 'dim' : '';
		});
	}