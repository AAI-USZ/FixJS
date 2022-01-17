function(){

		var status = $(this).attr('status');

		var ql = $(this).attr('ql');

		if(ql==0) ql="0";



		var count = $(this).attr('count');

		var buttons = [];



		var table_type='status_table';

		if($(this).hasClass('as_qa_table')) table_type='as_qa_table';

		if($(this).hasClass('qa_table')) table_type='qa_table';





		var tableTitle ='';

		if(table_type=='status_table'){

			theTableTitle=status.replace(/_/g," ");

		}else if(table_type=='as_qa_table' || table_type=='qa_table'){

			theTableTitle='Quality Level '+ql;

		}



		var tClass = status+'_table';

		if(table_type=='as_qa_table' || table_type=='qa_table'){

			tClass='';

		}



		if(table_type=='status_table'){

			if(status!='MORE_WORK_REQUIRED') buttons.push({name: 'Select All', bclass: 'button', onpress : selectAll});

		}



		if(status=="DRAFT"){

			if(!DS_QA_flag){

				if(MANUAL_PUBLISH){//is manual

					buttons.push({name: 'Approve', bclass: 'approve', onpress : doCommand});

				}else{//auto publish

					buttons.push({name: 'Publish', bclass: 'publish', onpress : doCommand});

				}

			}else{//required assessment

				buttons.push({name: 'Submit for Assessment', bclass: 'submit_for_assessment', onpress : doCommand});

			}

			buttons.push({name: 'Delete Draft', bclass: 'delete', onpress : doCommand});

		}else if(status=="SUBMITTED_FOR_ASSESSMENT"){

			if(orcaQA){

				buttons.push({name: 'Start Assessment', bclass: 'start_assessment', onpress : doCommand});

			}

			if(orcaLIASON){

				buttons.push({name: 'Revert to Draft', bclass: 'revert_to_draft', onpress : doCommand});

			}

		}else if(status=="ASSESSMENT_IN_PROGRESS"){

			if(orcaQA){

				if(MANUAL_PUBLISH){

					buttons.push({name: 'Approve', bclass: 'approve', onpress : doCommand});

				}else{//auto publish

					buttons.push({name: 'Publish', bclass: 'publish', onpress : doCommand});

				}

				buttons.push({name: 'More Work Required', bclass: 'more_work_required', onpress : doCommand});

			}

		}else if(status=="APPROVED"){

			buttons.push({name: 'Publish', bclass: 'publish', onpress : doCommand});

			buttons.push({name: 'Delete Record', bclass: 'delete', onpress : doCommand});

		}else if(status=="PUBLISHED"){

			if(orcaQA){

				buttons.push({name: 'Mark as Gold Standard', bclass: 'mark_gold_standard', onpress : doCommand});	

				buttons.push({name: 'Remove Gold Standard', bclass: 'unset_gold_standard', onpress : doCommand});

			}

			buttons.push({name: 'Delete Record', bclass: 'delete', onpress : doCommand});

		}

		//buttons.push({separator:true});



		if(dsKey=='ALL_DS_ORCA') buttons = [];



		var table_type='status_table';

		if($(this).hasClass('as_qa_table')) table_type='as_qa_table';

		if($(this).hasClass('qa_table')) table_type='qa_table';





		var tableTitle ='';

		if(table_type=='status_table'){

			theTableTitle=status.replace(/_/g," ");;

		}else if(table_type=='as_qa_table' || table_type=='qa_table'){

			buttons = [];

			theTableTitle = 'Quality Level '+ ql;

			if(ql == 5){

				theTableTitle = 'Gold Standard ';

				buttons.push({name: 'Select All', bclass: 'button', onpress : selectAll});

				buttons.push({name: 'Remove Gold Standard', bclass: 'unset_gold_standard', onpress : doCommand});

			}

				

		}



		var tClass = status+'_table';

		if(table_type=='as_qa_table' || table_type=='qa_table'){

			tClass='';

		}



		//service URL

		var viewURL = 'get_view.php?view='+table_type+'&status='+status+'&ds='+dsKey+'&ql='+ql;

		

		$(this).flexigrid({

			striped:true,

			title:status,

			showTableToggleBtn: true,



			showToggleBtn: false,

            url: viewURL,

			dataType: 'json',

			usepager: true,

			colModel : [

				{display: '', name:'check_box', width:20, sortable: false, align:'left',hide:true},

				{display: 'recordKey', name:'key', width:120, sortable: true, align:'left'},

                {display: 'Name/Title', name : 's_list_title', width : 350, sortable : true, align: 'left'},

                {display: 'Last Modified', name : 'date_modified', width : 150, sortable : true, align: 'left'},

                {display: 'Class', name : 'class', width : 70, sortable : true, align: 'left'},

                {display: 'Errors', name : 'error_count', width : 35, sortable : true, align: 'center'},

                {display: 'Quality Level', name : 'quality_level', width : 70, sortable : true, align: 'center'},

                {display: 'Flag', name : 'flag', width : 30, sortable : true, align: 'left'},

                {display: 'Options', name : 'buttons', width : 100, sortable : false, align: 'left'},

                {display: 'Status', name : 'status', width : 200, sortable : true, align: 'left'},

                {display: 'Feed Type', name : 'feed_type', width : 50, sortable : true, align: 'left', hide:false},

                {display: 'Manually Assessed', name : 'manually_assessed_flag', width : 50, sortable : true, align: 'left', hide:false}

            ],

            sortname:'date_modified',

            sortorder:'desc',

            buttons:buttons,

            height: 'auto',

            resizable:true,

            useRp: true,

			rp: 10,

			pagestat: 'Displaying {from} to {to} of {total} records',

			nomsg: 'No records found',



            additionalClass:tClass,

            tableTitle:theTableTitle,

            searchitems : [

            		{display: 'Name/Title', name : 'list_title'},

            		{display: 'Key', name:'key'}

            ],

            onSuccess: formatTable,

            cookies: true,

            tableId:theTableTitle

		});

	}