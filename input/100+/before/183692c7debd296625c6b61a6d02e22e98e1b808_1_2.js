function(data) {



    			

    			//var data = eval("(" + data + ')');



  				var chartData = new google.visualization.DataTable();

  				

  				var first = true;

  				$.each(data.columns, function(i, item){

  					//console.log(item);

  					if(first){

  						chartData.addColumn("string", item);

  						first = false;

  					}else{

  						chartData.addColumn("number", parseInt(item));

  						colNumber.push(item);

  					}

  				});

  				

  				var sum = [];

  				$.each(data.rows, function(i, item){

  					rowCount++;

  					var miniSum=0;

  					chartData.addRow(item);

  					$.each(item, function(j, qa_i){

  						if(!isNaN(qa_i)) miniSum = miniSum+ qa_i;

  					});

  					sum[i] = miniSum;

  				});

  				//console.log('sum='+sum);

  				var fullColorArray = ['#89CEDE','#F06533','#F2CE3B', '#6DA539', '#4491AB', '#4491AB'];

  				var colorArray = [];

  				$.each(colNumber, function(i, item){

  					colorArray.push(fullColorArray[item]);

  				});

  				



  				



  				//console.log(colorArray);

    			// Create and draw the visualization.

    			var barsVisualization = new google.visualization.BarChart(document.getElementById(status+'_qaview'));

    			//var formatter = new google.visualization.BarFormat({showValue: true});

    			//formatter.format(realData, 0);

			  	

    			var optionTitle = 'Class';

    			var optionHeight = (rowCount * 40);

    			var chartAreaArray = {left:"10%", right:"20%", width:600, top:50, height:optionHeight};

    			if(dsKey=='ALL_DS_ORCA'){

    				optionTitle = 'Data Source Key';

    				chartAreaArray = {left:"30%", right:"20%", width:600, top:50, height:optionHeight};

    			}

    			

    			var optionPercent = {title:status.replace(/_/g," ") + " Records",		        	

		        	vAxis: {title:optionTitle},

		        	height:optionHeight+150,

		        	isStacked:true,

		        	colors:colorArray,

		        	chartArea: chartAreaArray,

  					sliceVisibilityThreshold:0,

  					fontName: '"Arial"',

		        	hAxis: {title: "Quality Levels Percentage",format:'##%'}};

				



		        var view = new google.visualization.DataView(chartData);



		        var theRest = [];

		        theRest.push(0);

		        var colLength = colNumber.length;

		       // console.log('colNumber='+colNumber);

		        $.each(colNumber, function(i, item){

  					var labelValue = 'Gold Standard';

  					if(item < 4)

  					labelValue = 'Quality Level '+item;

  					//if(i!=0){

  						var theThing = {

  	  				        	label:labelValue,

  	  				        	type:'number',

  	  				        	calc:function(dt,row){

  	  				        		var value = dt.getValue(row, i+1);

  	  				        		//console.log('at '+i+' = '+value.toString());

  	  				        		return {v: value/sum[row],f:value.toString()+' record(s)'};

  	  				        	}

  	  				        };

  	  					theRest.push(theThing);

  					//}

  					

  				});

		       //console.log(theRest);

		        

		        view.setColumns(theRest);

		      //  console.log(view);

		        

		      	barsVisualization.draw(view,optionPercent);



		      	/*

			  	function drawThisChart(dataToDraw,optionToDraw){

			  		barsVisualization.draw(dataToDraw,optionToDraw);

			  	}



			  	var dataToDraw = view;		

			  	var optionToDraw = optionPercent;	  	

			  	$('#switchChartType').live('click', function(){

			  		if(dataToDraw==chartDataPercent){

			  			dataToDraw=view;

			  			optionToDraw=option;

			  		}else{

			  			dataToDraw=chartDataPercent;

			  			optionToDraw=optionPercent;

			  		}

			  		drawThisChart(dataToDraw, optionToDraw);

			  	});

			  	drawThisChart(dataToDraw, optionToDraw);*/

        	}