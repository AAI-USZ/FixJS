function(){
			var tail = new Array();
			tail[0] = $('#addTailNumField').val();
			tail[1] = $('#tailNumModNum').val();
			tail[2] = $('#tailNumAircraftType').val();

			for(i=0;i<2;i++){
				if(tail[i] == ""){
					alert('Please be sure all the Tail Number fields are filled in before finishing.');
					return false;
				}
			}

			if($('.lineRateEntry').length == ''){
				alert('Please add a rate for this Tail Number before finishing');
				return false;
			}

			var plural = '';

			if($('.lineRateEntry').length > 1){
				plural = 's';
			}

			var tailnumbertable = "<table class='table table-condensed table-striped table-bordered'><thead><tr><th>Tail Number</th><th>Mod Number</th><th>Aircraft Type</th></tr></thead><tbody><tr><td>"+tail[0]+"</td><td>"+tail[1]+"</td><td>"+tail[2]+"</td></tr></tbody></table>";

			var ratetableHead = "<table class='table table-condensed table-striped table-bordered'><thead><tr><th>Rate</th><th>Price Per Unit</th><th>Rate Start Date</th><th>Rate End Date</th></tr></thead><tbody>";
			var ratetableBody = '';
			var ratetableTail = "</tbody></table>";

			var ratetable = $('.lineRateEntry').each(function(i){
				ratetableBody = ratetableBody + "<tr>" + $(this).html() + "</tr>";
			})

			var ratetable = ratetableHead + ratetableBody + ratetableTail;

			//var ratetable = "<table class='table table-condensed table-striped table-bordered'><thead><tr><th>Rate</th><th>Price Per Unit</th><th>Rate Start Date</th><th>Rate End Date</th></tr></thead><tbody><tr><td>"+$('.addRateFormFields.open>.cell>select').val()+"</td><td>"+$('.addRateFormFields.open>.cell>#'+contractSection+'PricePerUnit').val()+"</td><td>"+$('.addRateFormFields.open>.cell>#'+contractSection+'RateStart').val()+"</td><td>"+$('.addRateFormFields.open>.cell>#'+contractSection+'RateEnd').val()+"</td></tr></tbody></table>";

			$('#tailnumberlist').append("<li class='btn btn-success'><i class='icon icon-plane icon-white'></i> " + tail[0] + " ( " + $('.lineRateEntry').length + " rate"+ plural +" )</li><div class='addedrates'>" + tailnumbertable + ratetable + "</div>");

			$('#tailNumModalForm').modal('hide');
			$('#addTailNumField').val('');
			$('#tailNumModNum').val('');
			$('#tailNumAircraftType').val('');
			$('.lineRatesTable tbody').empty();
			$('.lineRatesTable').hide();
			$('.addRateFormFields').removeClass('open').hide();
			$('.addRateFormFields .cell select').val('');
			$('.addRateFormFields .cell:nth-child(2) input').val('');
		}