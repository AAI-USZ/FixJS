function() {
		//define the categories to group by
		//the higher level categories have to be defined before the lower lever ones
		var categories = [
			//{id: "0",    name: "All Mantis Projects",     css_class: "project-search-category-all-mantis-projects"}
			//{id: "1",    name: "Top Level Category 1",    css_class: "project-search-category-top-level-1"}
			//{id: "1;2",  name: "Lower Level Category 2",  css_class: "project-search-category-lower-level-2"}
			//{id: "1;10", name: "Lower Level Category 10", css_class: "project-search-category-lower-level-10"}
			//{id: "20",   name: "Top Level Category 20",   css_class: "project-search-category-top-level-20"}
		];

		var ac_input = $('<div id="project-select-ac-wrapper" style="display:none"></div>');
		ac_input.append('<input id="project-select-ac" type="text" value="" />');
		ac_input.append('<input id="project-select-hidden" type="hidden" value="" name="project_id" />');
		$('select[name=project_id]').after(ac_input);

		//hide + disable the original dropdown field
		$('select[name=project_id]').hide();
		$('select[name=project_id]').attr("disabled", "disabled");

		//show the autocomplete field
		$('#project-select-ac-wrapper').css('display', 'inline');

		//get the data for the autocompletion
		var data = new Array();

		//loop through items in the original dropdown (which is now hidden)
		$('select[name=project_id] option').each(function(index) {
				if ($(this).text().length != 0) {
						//as a base the current item has the id and a text (plus an empty css class)
						var current = {
							label:     $(this).text(),
							value:     $(this).attr('value'),
							css_class: ""
						};

						//if using categories
						if (categories.length > 0) {
							//find what "category" to put the current mantis project into
							var current_category_name;
							var current_category_css_class;
							var i;
							for (i = 0; i < categories.length; i++) { //goes through all categories defined above
								if ($(this).attr('value') == categories[i].id) { //the value (project_id) equals (so top-level match)
									current_category_name = categories[i].name;
									current_category_css_class = categories[i].css_class;
								} else if ($(this).attr('value').indexOf(categories[i].id) == 0) { //the value (project_id) begins with (so sub-category)
									current_category_name = categories[i].name;
									current_category_css_class = categories[i].css_class;
								}
							}

							//store the category name and css class in the current item
							current.category = current_category_name;
							current.css_class = current_category_css_class;
						}

						//add the current item (id, text and optionally the category information)
						data.push(current);
				}

				//if one of the options in the dropdown was selected then show it in the autocomplete field
				if($(this).attr("selected")) {
					$('#project-select-ac').val($(this).text());
				}

		});

		//when using categories the array has to be reordered slightly to
		//cover cases where one category is split and shows up multiple times
		if (categories.length > 0) {
			//order all mantis projects according to the category first
			var data_reordered = new Array();
			for (i = 0; i < categories.length; i++) { //for each category
				for (j = 0; j < data.length; j++) { //for each mantis project
					if (data[j].category == categories[i].name) { //if the current project is within the current category
						data_reordered.push(data[j]);
					}
				}
			}
			data = data_reordered;
		}

		//when a user selectes the autocomplete field - select the text
		$("#project-select-ac").focus(function(){
			this.select();
		});

		//remove the original mantis "Switch" button (not needed even without the autocompletion)
		$('form[name=form_set_project] input[value=Switch]').hide();

		//initialise auto complete
		$("#project-select-ac").mantiscomplete({
			source: data,
			minLength: 0, //this has to be 0 for the "Show all" toggle to work
			select: function(event, ui) {
				//when an option is selected:
				//put the text in the input field
				$('#project-select-ac').val(ui.item.label);
				//put the value in the hidden field
				$('#project-select-hidden').val(ui.item.value);
				//submit the form
				$('form[name=form_set_project]').submit();
				return false;
			}
		});

		//add a link to show all items (imitate the regular dropdown behaviour)
		//this pretty much makes it into a combobox (could use some more styling though)
		$( "<a>" )
			.attr("tabIndex", -1)
			.attr("title", "Show All Items")
			.appendTo($("#project-select-ac-wrapper"))
			.button({
				icons: {
					primary: "ui-icon-triangle-1-s"
				},
				text: false
			})
			.click(function() {
				var input = $("#project-select-ac");
				// close if already visible
				if (input.mantiscomplete("widget").is(":visible")) {
					input.mantiscomplete("close");
					return;
				}
				$(this).blur();

				// pass empty string as value to search for, displaying all results
				input.mantiscomplete("search", "");
				input.focus();
			});

}