function view(type, status){

		//console.log('type='+type+' status='+status);

		$('.tab-content').hide();

		$('#toggleSummaryTable, #toggleDetailTables').text('-');

		if(type=='statusview'){

			$('.qaview').hide();

			$('.viewswitch').removeClass('pressed');

			$('.viewswitch[name=statusview]').addClass('pressed');

			if(status=='All'){//open all statuses except for more work required (if there is none)

				$('.statusview').show();

			}else{//is a specific status

				$('.statusview').each(function(){

					if($(this).attr('id')==status){

						$(this).show();

					}

				});

		   //$('#quality_view_explain').show();

			}

		}else if(type=='qaview'){

			$('.statusview').hide();

			$('.viewswitch').removeClass('pressed');

			$('.viewswitch[name=qaview]').addClass('pressed');

			if(dsKey) google.setOnLoadCallback(drawBarChart(status, dsKey));

			//drawBarChart(status, dsKey);

			if(status=='All'){

				$('.qaview[id=All_qaview]').show();

				$('.as_qa_table').parents('.tab-content').show();

			}else{//is a specific status

				$('.qaview[id='+status+'_qaview]').show();

				$('.qa_table[status='+status+']').parents('.tab-content').show();

			}

			$('#quality_view_explain').show();

			$('.qaview[ql=0], .qaview[ql=5]').each(function(){

				if($(this).find('.ftitle').attr('count') == '0') $(this).hide();

			});

		}

	}