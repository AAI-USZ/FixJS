function HeaderView() {

	var core = new View();

	var enterCallBack = null;

	

	core.name = 'header';

	core.template = 'headerTemplate';

	core.model = new StaticModel();

	

	core.onEnterRegion = function (callback) {

		enterCallBack = callback;

		

		core.template2('header', function () {

			core.model.single('header', core.loadDataComplete);

		});

	};

	

	core.onLeaveRegion = function (callback) {

		core.detachEventHandlers();

		$(region).fadeOut("fast", callback);

	};

	

	core.loadDataComplete = function (data, textStatus, jqXHR) {

		core.templates.header.apply(data, function (data) {

			$(core.region).hide().html('');

			$(data).appendTo($(core.region));

			$(core.region).fadeIn();

		});

		

		core.attachEventHandlers();

		if (enterCallBack) enterCallBack();

	};

	

	core.attachEventHandlers = function () {

		$("#closeIcon").bind('click', core.handlers.closeIconClick);

		$("#headerLogo").bind('click', core.handlers.headerLogoClick);

	};

	

	core.detachEventHandlers = function () {

		$("#closeIcon").unbind('click');

		$("#headerLogo").unbind('click');

	};

	

	core.handlers = {

		closeIconClick: function (evt) {

			$("#header").fadeOut(function () {

				layout.sendMessage("search","HEADER_HIDDEN");

			});

		},

		

		// TODO: Change this into a link.

		headerLogoClick: function () { location.hash = "#"; }

	};

	

	return core;

}