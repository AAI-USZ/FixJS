function()
{
	// Globals
	var globalFormCounter = 0;
	var customHidden = 'isHidden';
	var customCurrent = 'current';
	var wizardHeight = '400px';
	var wizardHeightNum = 400;
	
	
	//
	// Main
	//
	
	function scrollTo(section)
	{
		$('html, body')
			.stop()
			.animate(
				{
					scrollTop: (section.offset().top - 12)
				}, 
				750,
				'easeInOutExpo'
			);
	}
	
	
	function disableSection(section)
	{
		section.addClass('sectionDisabled');
		/*section.find('.btn, input').each(function()
		{
			$(this).attr('disabled', true);
		});*/
		
		section.siblings('ul').children('li').eq( $(section).index()-1).addClass('sectionDisabled');
	}
	
	function enableSection(section)
	{
		section.removeClass('sectionDisabled');
		/*section.find('.btn, input').each(function()
		{
			$(this).removeAttr('disabled');
		});*/
		
		section.siblings('ul').children('li').eq( $(section).index()-1).removeClass('sectionDisabled');
	}
	
	function gotoNextSection(section)
	{
		var nextSection = section.next();
		disableSection(section);
		enableSection(nextSection);
		scrollTo(nextSection.parent());
		transitionFormWizard(section);
	}
	
	function gotoPrevSection(section)
	{
		var prevSection = section.prev();
		disableSection(section);
		enableSection(prevSection);
		scrollTo(prevSection.parent());
		transitionFormWizardBack(section);
	}
	
	function checkForProducts(container)
	{
		var productList = container.find('#TEST_added_products').children();
		
		if (productList.length > 0)
		{
			container.find('.TEST_no-products').hide();
			container.find('.TEST_next').removeAttr('disabled');
		} else {
			container.find('.TEST_no-products').show();
			container.find('.TEST_next').attr('disabled', true);
		}
	}
	
	
	function resetFormWizard(formWizard)
	{
		var children = formWizard.children();
		
		children.each(function()
		{
			$(this).css('opacity', 0).css('x', formWizard.width());
		});
		
		children.first().css('opacity', 1).css('x', 0);
	}
	
	
	function setVerificationBox(productInfo)
	{
		// Capture the Id and image associated with the selected product, and put them into the
		// verification box
		var verifyBox = $('#wizard_verification');
		verifyBox.children('img').attr('src', productInfo.htmlImg.attr('src'));
		verifyBox.children('#button_verification_yes').attr('data-productId', productInfo.id);
		verifyBox.children('.product_name').html(productInfo.name);
		//console.log(verifyBox);
	}
	
	
	function transitionFormWizard(current)
	{
		var next = current.next();
		var width = current.width();
		
		current.transition(
			{
				x: -width
			},
			400,
			"in-out"
		);
		
		next.css({x: next.parent().width() }).transition
		(
			{
				x: 0,
				opacity: 1
			},
			400,
			"in-out"
		);
	}
	
	function transitionFormWizardBack(current)
	{
		var prev = current.prev();
		var width = current.width();
		var parent = current.parent();
		
		current.transition(
			{
				x: parent.width()
			},
			400,
			"in-out"
		);
		
		prev.css({x: -parent.width() }).transition
		(
			{
				x: 0,
				opacity: 1
			},
			400,
			"in-out"
		);
	}
	
	
	function isDisabled(element)
	{
		return element.attr('disabled');
	}
	
	
	function openWizard(wizard)
	{
		//console.log("openwizard: ", wizard.is(":visible"));
		//if (wizard.is(":visible") == false)
		if (hasAttr(wizard, customHidden))
		{
			wizard
				.css('height', 0)
				.show()
				.transition({height: wizardHeight}, 500, 'in-out')
				.removeAttr(customHidden);
				
			form.height( form.height() + wizardHeightNum );
		}
	}
	
	function closeWizard(wizard)
	{
		//if (wizard.is(":visible") == true)
		if (!hasAttr(wizard, customHidden))
		{
			wizard
				.transition({height: '0'}, 250, 'out', function()
				{
					//console.log("hiding", this);
					$(this)
						.attr(customHidden, customHidden)
						.hide();
				})
				.attr(customHidden, customHidden);
				
			form.height( form.height() - wizardHeightNum );
		}
	}
	
	
	function hasAttr(element, attribute)
	{
		var attr = element.attr(attribute);
		
		//console.log("has attr: ", element, attribute, attr);
		
		if (typeof attr !== 'undefined' && attr !== false)
		{
			return true;
		}
		
		return false;
	}
	
	
	function setButtonStyle(button, text, currentClass, newClass)
	{
		button.html(text);
		button
			.removeClass(currentClass)
			.addClass(newClass);
	}
	
	
	
	
	//
	// onClick events
	//
	
	// Edit a product
	$('#TEST_customize').on('click', '.TEST_edit', function(event)
	{
		event.preventDefault();
		if (isDisabled($(this))) return;
		
		var editWizard = $('#edit_product_wizard');
		var customProduct = $(this).parent();
		
		if (!hasAttr(editWizard, customHidden))
		{	
			// find the empty <li />
			$('#TEST_added_products').children('li').each(function()
			{
				var html = $(this).html();
				if (html == "")
				{
					// Add the product back into its <li> tag
					console.log("Appending custom product: ", customProduct);
					$(this).append(customProduct);
					console.log("After: ", customProduct);
					return false; // break the loop
				}
			});
			
			// Hide the fieldsets
			customProduct.find('.custom_product_details').append( editWizard.find('fieldset').hide() );
			
			// Enable all other edit buttons
			$('#TEST_added_products').find('.TEST_edit').each(function()
			{
				$(this).removeAttr('disabled');
			});
			
			console.log("closing edit wizard");
			closeWizard(editWizard);
			scrollTo($('#TEST_customize').parent());
		}
		else
		{	
			// Copy edit form to edit wizard div
			editWizard.append(customProduct);
			
			// Show the fieldsets
			customProduct.find('fieldset').each(function()
			{	
				// Move fieldsets outside of div and show them
				editWizard.append($(this));
				$(this).removeAttr(customHidden, customHidden);
				$(this).show();
			});
			
			// Disable all other edit buttons
			$('#TEST_added_products').find('.TEST_edit').each(function()
			{
				$(this).attr('disabled', 'disabled');
			});
			
			console.log("opening edit wizard");
			openWizard(editWizard);
			scrollTo(editWizard);
		}
	});
	
	
	$('#TEST_custom_product_inquiry_form').on('click', '.TEST_next', function(event)
	{
		event.preventDefault();
		if (isDisabled($(this))) return;
		
		if ( $(this).attr('id') == "button_user_info" )
		{
			console.log("Going to validate");
		}
		
		gotoNextSection( $(this).parent() );		
	});
	
	
	$('#TEST_custom_product_inquiry_form').on('click', '.TEST_prev', function(event)
	{	
		event.preventDefault();
		if (isDisabled($(this))) return;
		
		gotoPrevSection( $(this).parent() );
	});
	
	
	// "Customize a new Product" button
	$("#TEST_customize").on('click', '#TEST_add_custom_product', function(event)
	{
		event.preventDefault();
		if (isDisabled($(this))) return;
		
		var formWizard = $('#create_product_wizard');
		var button = $(this);
		resetFormWizard(formWizard);
		
		// Make sure our verification button is enabled, since we disable it when it's clicked
		formWizard.find('.btn').removeAttr('disabled');
		
		if (!hasAttr(formWizard, customHidden))
		{
			// Close the wizard
			console.log("closing wizard");
			closeWizard(formWizard);
			
			// Edit the button
			setButtonStyle(
				button,
				"Customize a Product",
				"btn-danger",
				"btn-primary"
			);
			
			scrollTo($('#TEST_customize').parent());
		}
		else
		{
			// Open the wizard
			console.log("opening wizard");
			openWizard(formWizard);
			
			// Edit the button
			setButtonStyle(
				button,
				"Cancel",
				"btn-primary",
				"btn-danger"
			);
			
			scrollTo($('#create_product_wizard'));
		}
	});
	
	
	// Form Wizard - Add product - Update the verification box with the selected product
	/*$("#wizard_selector").on('click', '.add', function(event)
	{		
		event.preventDefault();
		if (isDisabled($(this))) return;
		
		var productInfo = {};
		productInfo.id = $(this).attr('data-productId');
		productInfo.htmlImg = $(this).parent().siblings('img').clone(); // clone the img as well
		productInfo.name = $(this).siblings('.product_name').html();
		setVerificationBox(productInfo);
		
		transitionFormWizard( $('#wizard_selector') );
	});*/
	
	
	// Form Wizard - Product verified, Go to the measurements section
	$('#wizard_selector').on('click', '.add', function(event)
	{	
		event.preventDefault();
		if (isDisabled($(this))) return;
		
		var button = $(this);
		
		// Disable the button, and show the loading gif:
		button.attr('disabled', true);
		
		$.ajax({
			'url': button.attr('data-baseurl') + "/product/getProductCustomForm/" + button.attr('data-productid') + "/" + globalFormCounter++,
			'cache': false,
			complete: function(jqXHR, textStatus)
			{
				if (textStatus == 'success')
				{
					// Add the image and the custom html into the #product_details form
					var html = jqXHR.responseText;
					$('#wizard_details_container').html(html);	
					transitionFormWizard( $('#wizard_selector') );
					
					// Run the init routine for jsColor, Since we are dynamically adding elements into the DOM
					jscolor.init();
				}
			}
		});		
	});
	
	
	// Product not verified, go back to the product selection
	$("#wizard_details").on('click', '.back', function(event)
	{
		event.preventDefault();
		if (isDisabled($(this))) return;
		
		// Make sure our verification button is enabled, since we disable it when it's clicked
		$('#create_product_wizard').find('.btn').removeAttr('disabled');
		
		transitionFormWizardBack( $('#wizard_details') );
	});
	
	
	// Add the customized product to the list
	$('#wizard_details').on('click', '.addProductToList', function(event)
	{
		event.preventDefault();
		if (isDisabled($(this))) return;
		
		console.log("adding product");
		
		// Verify the data
		// ...
		
		// Save the data into local storage
		// ...
		
		// Inject this form data into the main form.
		var original = $('#wizard_details .custom_product_details');
		
		// Make the edit form invisible
		original.find('fieldset').each(function()
		{
			$(this).toggle(); // make invisible
		});
		
		var newProduct = $('<li><div class="custom_product_listing"></div></li>');
		$('<a href="#" class="TEST_edit btn btn-warning btn-small"><i class="icon-pencil"></i>Edit</a>').appendTo(newProduct.find('.custom_product_listing'));
		newProduct.find('.custom_product_listing').append(original);
		newProduct.appendTo( $('#TEST_added_products') );
		
		// fix global form height
		var newHeight = Math.ceil(($('#TEST_added_products').find('li').size()) / 5) * 230;
		console.log("SETTING NEW HEIGHT: ", baseFormHeight, newHeight);
		form.height( baseFormHeight + newHeight );
		console.log("form height: ", form.height());
		
		// Edit the button
		setButtonStyle(
				$("#TEST_add_custom_product"),
				"Customize a Product",
				"btn-danger",
				"btn-primary"
			);
		
		scrollTo($('#TEST_customize').parent());
		closeWizard($('#create_product_wizard'));
			
		checkForProducts($('#TEST_customize'));		
	});
	
	
	/*$('#TEST_review').on('click', '.TEST_submit', function(event)
	{
		// Submit the form!
	});*/
	
	
	
	// TEST
	var form = $('#TEST_custom_product_inquiry_form');
	var baseFormHeight = form.height();
	var sectionCustomize = $('#TEST_customize');
	var sectionUserInfo = $('#TEST_user_info');
	var sectionReview = $('#TEST_review');
	
	$('#create_product_wizard, #edit_product_wizard').each(function()
	{
		$(this)
			.css('position', 'relative')
			.css('overflow', 'hidden')
			.css('width', '100%')
			.attr(customHidden, customHidden)
			.hide();
			
		$(this).children().each(function()
		{
			$(this)
				.css('position', 'absolute')
				.css('opacity', 0);
		});
	});
	
	// Disable all sections except the first one
	form.children('div').each(function()
	{
		var t = $(this);

		t.css({y: 0})
		
		if (t.index() == 1)
		{
			enableSection(t);
		}
		else
		{
			t.css({x: t.parent().width()});
			disableSection(t);
		}
	});
	
	checkForProducts($('#TEST_customize'));	
}