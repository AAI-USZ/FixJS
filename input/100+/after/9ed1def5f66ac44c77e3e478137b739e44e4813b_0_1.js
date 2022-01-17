function ($nameInput, $messageInput, $messageList, socket) {
		var that = this;

		this.socket = socket;
		this.messageList = new MessageList($messageList, socket);
		this.userManager = new UserManager($nameInput, socket);
		this.issueManager = new IssueManager(socket);
		this.notifier = new Notifier(this.userManager, socket);
		this.$messageInput = $messageInput;

		this.disconnected = ko.observable();
		this.loading = ko.observable(true);

		this.initTooltips();

		$(window).bind('hashchange', _.bind(this.checkHashForBookmark, this));

		this.hideClosed = ko.observable(true);
		this.hideAssigned = ko.observable(false);
		this.helpOpen = ko.observable(false);
		this.addHtmlLinks = util.addHtmlLinks;

		ko.applyBindings(this);

		this.socket.on('connect', function () {
			that.disconnected(false);
			that.userManager.loginExistingUserIfAny();
			that.loading(false);
		});

		this.socket.on('disconnect', function () {
			that.disconnected(true);
		});

		this.socket.on('issues', function (issues) {
			that.checkHashForBookmark();
		});
	}