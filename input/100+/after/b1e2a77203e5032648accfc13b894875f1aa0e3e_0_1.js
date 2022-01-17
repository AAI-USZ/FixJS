function (callback) {

		var cb = callback;

	

		core.template2('bioSide', function () {

			core.templates.bioSide.apply(null, function (data) {

				$("#bioSide").hide().html(data);

			})

		});

		

		core.template2('bio', function () {

			core.templates.bio.apply(null, function (data) {

				$(data).appendTo($(core.region));

				core.attachEventHandlers();

				console.log("Loaded bio");

				core.handlers.adjustPosition();

				if (cb) cb();

			});

		});

	}