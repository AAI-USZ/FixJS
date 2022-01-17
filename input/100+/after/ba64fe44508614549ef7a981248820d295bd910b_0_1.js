function() {
			it("should bind span", function() {
				var firstNameSpan = $('#firstNameSpan');
				var firstNameSpanText = firstNameSpan.text();

				expect(firstNameSpanText).toBe("Nathan");
			});

			it("should change span when model is updated", function() {
				Person.firstName = "Eric";
				if (!Watch) Person.save();
				var firstNameSpan = $('#firstNameSpan');
				var firstNameSpanText = firstNameSpan.text();

				expect(firstNameSpanText).toBe("Eric");
			});

			it("should bind div", function() {
				var firstNameDiv = $('#firstNameDiv');
				var firstNameDivText = firstNameDiv.text();

				expect(firstNameDivText).toBe("Nathan");
			});

			it("should change div when model is updated", function() {
				Person.firstName = "Eric";
				if (!Watch) Person.save();
				var firstNameDiv = $('#firstNameDiv');
				var firstNameDivText = firstNameDiv.text();

				expect(firstNameDivText).toBe("Eric");
			});

			it("should bind on input", function() {
				var firstNameInput = $('#firstName');
				var firstNameInputText = firstNameInput.val();

				expect(firstNameInputText).toBe("Nathan");
			});

			it("should change input when model is updated", function() {
				Person.firstName = "Eric";
				if (!Watch) Person.save();
				var firstNameInput = $('#firstName');
				var firstNameInputText = firstNameInput.val();

				expect(firstNameInputText).toBe("Eric");
			});

			it("should change model when changed on input", function() {
				var firstNameInput = $('#firstName');
				firstNameInput.val("Eric");
				firstNameInput.trigger("change");

				expect(Person.firstName).toBe("Eric");	
			});

			it("should bind on textarea", function() {
				var firstNameInput = $('#firstNameTextArea');
				var firstNameInputText = firstNameInput.val();

				expect(firstNameInputText).toBe("Nathan");
			});

			it("should change model when changed on textarea", function() {
				var firstNameInput = $('#firstNameTextArea');
				firstNameInput.val("Eric");
				firstNameInput.trigger("change");

				expect(Person.firstName).toBe("Eric");	
			});

			it("should change textarea when model is updated", function() {
				Person.firstName = "Eric";
				if (!Watch) Person.save();
				var firstNameInput = $('#firstNameTextArea');
				var firstNameInputText = firstNameInput.val();

				expect(firstNameInputText).toBe("Eric");
			});

			it("should bind on select", function() {
				var firstNameInput = $('#firstNameSelect');
				var firstNameInputText = firstNameInput.find("option:selected").val();

				expect(firstNameInputText).toBe("Nathan");
			});

			it("should change model when changed on select", function() {
				expect(Person.firstName).toBe("Nathan");

				var firstNameInput = $('#firstNameSelect');
				firstNameInput.find("option[value='Eric']").attr("selected", "selected");
				firstNameInput.trigger("change");

				expect(Person.firstName).toBe("Eric");
			});

			it("should change select when model is updated", function() {
				Person.firstName = "Eric";
				if (!Watch) Person.save();				

				var firstNameInput = $('#firstNameSelect');
				var firstNameInputAttr = firstNameInput.find("option[value='Eric']").attr("selected");

				expect(firstNameInputAttr).toBe("selected");
			});

			it("ui should reflect model prototype", function() {
				// First you must set the value in the ui
				var firstNameInput = $('#firstName');
				firstNameInput.val('Nathan');
				firstNameInput.trigger('change');

				// Then pull out the value from the colletion
				var person = PersonCollection.first();
				person.firstName = "Eric";
				if (!Watch) person.save();

				var firstNameInputText = firstNameInput.val();
				expect(firstNameInputText).toBe("Eric");
			});
		}