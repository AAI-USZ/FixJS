function() {
			var data = $(form).serialize();
			var changes = [ ];
			
			$(form).find('input[type!=submit][type!=reset],select').each(function() {
				if (this.tagName.toLowerCase() == 'select') {
					var defaultValue = $(this).find('option').first().val().trim()
					var changedValue = $(this).find('option:checked').first().val().trim()
					var areEqual = (defaultValue == changedValue);
					var deviation = (areEqual ? 0 : 0.10); // 25% deviation.
				} else {
					var defaultValue = this.defaultValue;
					var changedValue = this.value;
					var areEqual = (parseFloat(defaultValue) == parseFloat(changedValue));
					var deviation = Math.abs(Math.log(parseFloat(changedValue) / parseFloat(defaultValue)));
				}
				
				if (!areEqual) {
					var description = this.parentNode.firstChild.nodeValue.trim();
					var heading = $(this.parentNode.parentNode.parentNode).prev('h2').first().text();
					
					changes.push([ heading, description, changedValue, defaultValue, deviation ]);
				};
			});
			
			changes.sort(function(a, b) { return b[4] - a[4]; });
			
			var runTextualDescription = "Run Parameters:";
			
			for (var i = 0; i < changes.length; i++) {
				var change = changes[i];
				
				runTextualDescription += "\n[" + change[0] + "] " + change[1] + ": " + change[2];
			}
			
			if (changes.length == 0)
				runTextualDescription += " (default parameters)";
			
			var createdLI = document.createElement('li');
			var createdLABEL = document.createElement('label');
			var progressIMG = document.createElement('img');
			var textNode = document.createTextNode("Executing run...");
			
			createdLI.setAttribute('title', runTextualDescription);
			
			progressIMG.setAttribute('src', 'images/progress.gif');
			createdLI.appendChild(createdLABEL);
			createdLABEL.appendChild(textNode);
			createdLABEL.appendChild(progressIMG);
			runsUL.appendChild(createdLI);
			
			numberOfRunsInProgress++;
			
			updateRunsListHeight();
			
			$.ajax({
				type : 'POST',
				url : 'index.php',
				data : data,
				success : function(data, textStatus, xhr) {
					var runObject = addRunFromCSV("Run #" + (getNumberOfRuns() + 1),
						generateNextColor(), data, changes);
					
					numberOfRunsInProgress--;
					
					textNode.nodeValue = runObject.description;
					createdLABEL.removeChild(progressIMG);
					
					var visibilityCheckbox = document.createElement('input');
					visibilityCheckbox.setAttribute('type', 'checkbox');
					visibilityCheckbox.setAttribute('checked', 'checked');
					
					visibilityCheckbox.onchange = function() {
						runObject.visible = visibilityCheckbox.checked;
						updateAllData();
					}
					
					createdLABEL.appendChild(visibilityCheckbox);
					
					var colorSlab = document.createElement('span');
					colorSlab.style.backgroundColor = runObject.color;
					colorSlab.style.borderColor = darkenColorSlightly(runObject.color);
					colorSlab.setAttribute('class', 'slab');
					
					createdLABEL.appendChild(colorSlab);
				},
				error : function(xhr, textStatus, errorType) {
					textNode.nodeValue = "Model Run Failed!";
					createdLABEL.removeChild(progressIMG);
					
					$(createdLABEL).css({backgroundColor:'#fe0'});
					
					setTimeout(function() {
						numberOfRunsInProgress--;
						
						$(createdLI).remove();
						updateRunsListHeight();
					}, 5000);
				},
				dataType : 'text',
				timeout : 10000
			});
			
			return false;
		}