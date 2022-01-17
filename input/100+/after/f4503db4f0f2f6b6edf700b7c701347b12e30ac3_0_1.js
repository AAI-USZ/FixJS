function(data) {
				window.clearTimeout(searchTimer);
				results = new Object();
				results["records"] = new Array();
				var index=1;
				for (var item in data.hits.hits) {
					data.hits.hits[item]._source["id"] = data.hits.hits[item]._id;
					data.hits.hits[item]._source["count"] = index;
					results["records"].push(data.hits.hits[item]._source);
					index++;
				}
				results.hits = data.hits.total;

				var template =
					'{{#records}}' +
					  '<div style="width: 35%;" class="alert alert-info searchresults" data-id="{{id}}" data-consortium="{{consortium}}" '+
					  'data-city="' + '{{contact.street_address.municipality_' + _("locale") + '}}' + '">' +
					  '<strong>' +
					  '{{#name_' + _("locale") + '}}' +
					    '{{name_' + _("locale") + '}}' +
					  '{{/name_' + _("locale") + '}}' +
					  '{{^name_' + _("locale") + '}}' +
					    '{{name_fi}}' +
					  '{{/name_' + _("locale") + '}}' +
					  '</strong>' +
					  '<br>' +
					  '{{#contact.street_address.street_' + _("locale") + '}}' +
					    '{{contact.street_address.street_' + _("locale") + '}}' +
					  '{{/contact.street_address.street_' + _("locale") + '}}' +
					  '{{^contact.street_address.street_' + _("locale") + '}}' +
					    '{{contact.street_address.street_fi}}' +
					  '{{/contact.street_address.street_' + _("locale") + '}}' +
					  ', ' +
					  '{{#contact.street_address.municipality_' + _("locale") + '}}' +
					    '{{contact.street_address.municipality_' + _("locale") + '}}' +
					  '{{/contact.street_address.municipality_' + _("locale") + '}}' +
					  '{{^contact.street_address.municipality_' + _("locale") + '}}' +
					    '{{contact.street_address.municipality_fi}}' +
					  '{{/contact.street_address.municipality_' + _("locale") + '}}' +
					  '</div>' +
					'{{/records}}';

				$('.search_results').empty();
				if (results.hits>0) {
					if (results.hits>10) $('#hits').html(_("Too many search results, showing first 10"));
					else $('#hits').html("");
					$('.search_results').html(Mustache.render(template, results));
					$('.searchresults').bind('click', function(event) {
						event.preventDefault();
						$(this).siblings().remove();
						$(this).removeClass("alert-info");
						$(this).addClass("alert-success");

						$('#widget_library').val($(this).attr("data-id"));
						$('#widget_consortium').val($(this).attr("data-consortium"));
						$('#widget_city').val($(this).attr("data-city"));

						$('.typeselector').first().button('toggle').trigger('click');
						$('.langselector').first().button('toggle').trigger('click');
						$('.filterselector').first().button('toggle').trigger('click');

						$(".langselector").removeProp('disabled');
						$(".typeselector").removeProp('disabled');
						$("#widget_style").removeProp('disabled');
						});
				} else {
					$('.search_results').html("");
					$('#hits').html(_("No search results"));
				}
			}