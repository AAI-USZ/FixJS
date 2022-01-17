function() 												//	DRAW CHART

{	

	var i=0,array,val;

	var ops=new Object();

	var options=this.options;

	var container=this.container;

	var con="#"+container;

	for (o in options) {

		val="";

		if (options[o]) {

			val=options[o].toString();

  			val=ops[o]=val.replace(/~/g,"#")

  			}

		if ((val.indexOf(",") != -1) && (o != "query")) {

			if (val) {

				array=true;

				if (val.indexOf('=') == -1)

 					ops[o]=new Array();

				else{

					ops[o]=new Object();

					array=false;

					}

				var pairs=val.split(',');

				for (j=0;j<pairs.length;++j) {

					if (!pairs[j])

						continue;

					if (array)

						ops[o].push(pairs[j].replace(/ /g,""));

					else{

						v=pairs[j].split("=");

						if (o == "options")

							ops[v[0]]=v[1].replace(/ /g,"");

						else if (v[0].indexOf(".") != -1) {

							ops[o][v[0].split(".")[0]]={};

							ops[o][v[0].split(".")[0]][v[0].split(".")[1]]=v[1];

							}

						else

							ops[o][v[0]]=v[1];

						}

					}

				}

			}

   		if (ops[o] == 'true') 	ops[o]=true;

  		if (ops[o] == 'false') 	ops[o]=false;

   		}

	var innerChartDiv=this.container+"indiv";

	$(con).remove(innerChartDiv);

	$(con).append("<div id="+innerChartDiv+"/>")

	$("#"+innerChartDiv).css('width',options['width']+"px");

	$("#"+innerChartDiv).css('height',options['height']+"px");	

	ops.containerId=innerChartDiv;

	if (!ops.colors)	delete ops.colors;

 	if (ops.dataDataSourceUrl)	

 		ops.dataDataSourceUrl=""+ops.dataSourceUrl.replace(/\^/g,"&");

  	if (ops.query) {

  		var v=ops.query.split(" ");

  		for (i=0;i<v.length;++i) {

  			if (v[i] == "has") {

  				v[i++]="LIKE";

  				v[i]="'%"+v[i]+"%'";

  				}

  			}

 		ops.query="";

 		for (i=0;i<v.length;++i) 

  			ops.query+=v[i]+" ";

 		}

 	var wrap=new google.visualization.ChartWrapper(ops);

	this.map=wrap;

 	wrap.setOptions(ops);

    wrap.draw();

}