function (tplData) {

			$(core.region).hide().html('');

			$(tplData).appendTo($(core.region));

			

			for(var index in data) {

				var item = data[index];

				if (item.contents == "") {

					$("#readmore" + item.code).hide();

				}

				

				if (item.tags && item.tags != "") {

					$("#tags" + item.id).html("<div class='tag'>"

						 + item.tags.replace(/,/gi, 

							"</div><div class='tag'>")

						 + "</div");

				}

			}

			

			$(core.region).fadeIn();

			core.handlers.resizeBaseLayout(null, function () {

				$(window).trigger('resize');

			});

			core.attachEventHandlers();

			if (enterCallBack) enterCallBack();

		}