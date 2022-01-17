function (callback) {

		enterCallBack = callback;

		

		core.template2('entrySearch', function () {

			core.templates.entrySearch.apply(null, function (tplData) {

				$(core.region).hide().html('');

				$(tplData).appendTo($(core.region));

				

				$('<img src="resources/delete.png" '

					+ 'id="clearSearch" />')

						.appendTo('#search');

					

				$('#clearSearch').css({	

					position: "absolute", 

					display: "none"

				});

					

				core.adjustClearSearchPosition();

				

				$(core.region).fadeIn();

				setTimeout(

					core.adjustLensPosition,

					100);

				

				core.attachEventHandlers();

				if (enterCallBack) enterCallBack();

			});

		});

	}