function createWorkflowStatus(parentElem, noTitleBar) {

	destroyWorkflowStatus();

	

	var maskDiv = $j(document.createElement('div')).attr({id : 'mask'});

	maskDiv.css('z-index', 10000);

	$j('#dataAssociationBody').append(maskDiv);


	

	//Add new modal-dialog

	var progressBarDiv = $j(document.createElement('div')).attr({id : 'progress-bar'});

	var progressStatusSpan = $j(document.createElement('span')).attr({id : 'progress-status'});

	progressStatusSpan.html('Running analysis');

	var progressStatusImg = $j(document.createElement('img')).attr({id : 'progress-img'});

	var progressTextDiv = $j(document.createElement('div')).attr({id : 'progress-text'});

	progressTextDiv.append(progressStatusImg);

	progressTextDiv.append(progressStatusSpan);

		

	var modalDialogDiv = $j(document.createElement('div')).attr({id : 'dialog-modal'});

	modalDialogDiv.append(progressBarDiv);

	modalDialogDiv.append(progressTextDiv);

	

	parentElem.append(modalDialogDiv);
	$j("#progress-img").attr('src','../images/spinner.gif');

	

	$j("#mask").fadeTo(500, 0.25);

	

	var d = $j( "#dialog-modal" ).dialog({

		height: 100

		, minHeight: 90

		, maxHeight: 120

		, width: 300

		, minWidth: 250

		, maxWidth: 350

		, closeOnEscape: false

		, show: { effect: 'drop', direction: "up" }

		, hide: { effect: 'fade', duration: 2500 }

		, dialogClass: 'dialog-modal'

		, title: 'Workflow Status'

		, position: {

			my: 'left top',

			at: 'center',

			of: parentElem

		}

		, buttons: {

			"Stop Analysis": cancelWorkflow

		}

		//To hide the header of the dialog

		, create: function (event, ui) {

	        if (noTitleBar) $j(".ui-widget-header").hide();

	    }

		, close: function (event, ui) {

			$j("#mask").hide();

			$j("#mask").remove();

			$j("#dialog-modal").dialog('destroy');

			//$j('#mask').remove();

		}

		, zIndex: 10001

		//, modal: true

		, autoOpen: false

	});

	d.parent('.ui-dialog').appendTo($j('#dataAssociationBody'));

	$j( "#dialog-modal" ).dialog('open');

	

	$j( "#progress-bar" ).progressbar({

		value: 5 

	});

}