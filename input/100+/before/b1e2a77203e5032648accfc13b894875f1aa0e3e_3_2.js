function () {

			core.templates.entrySearch.apply(null, function (tplData) {

				$(core.region).hide().html('');

				$(tplData).appendTo($(core.region));

				

				$('<img src="resources/delete.png" '

					+ 'id="clearSearch" />')

						.appendTo('#search');

					

				$('#clearSearch')

					.css({	position: "absolute", 

							display: "none"})

					.bind('click', core.handlers.clearSearch);

					

				core.adjustClearSearchPosition();

				

				$(core.region).fadeIn();

				setTimeout(

					core.adjustMagnifyingLensPosition,

					100);

				

				core.attachEventHandlers();

				if (enterCallBack) enterCallBack();

			});

		}