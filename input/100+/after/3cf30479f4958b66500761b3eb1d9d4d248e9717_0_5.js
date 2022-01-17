function(props, items, keepData)

{

	var i,j,k,l,o,oo,id,id2;

	var atts=new Array();

	var oldData;

	for (o in props) 

		atts.push(o);

	if (keepData) {

		oldData=new Array()

		for (i=0;i<atts.length;++i) {

			if (atts[i] == "item")

				break;

			oldData.push($("#propInput"+i).val());

			}

		}

	$('#propertyTable tr:gt(0)').remove();

	

	for (i=0;i<atts.length;++i) {

		o=atts[i];

		id="propInput"+i;

   		var str="<tr style='height:26px'><td width='12'></td><td width='200' onClick='ShowHelp(this.innerHTML)'>"+props[o].des.split("::")[0];

		if ((this.drupalMan) && (o == "dataSourceUrl")) 

			str+="&nbsp;&nbsp;<img src='databutton.gif' title='Click to find data set' style='vertical-align:bottom' onclick='shivaLib.GetDataFromManager()'/>";

   		str+="</td><td></td><td>";

   		if (props[o].opt == "query") 

   			str+="<input type='password' size='14' tabIndex='-1' onChange='Draw()' onFocus='shivaLib.QueryEditor(\""+id+"\")' id='"+id+"'/>";

   		else if ((props[o].opt == "color") || (props[o].opt == "colors")) {

   			str+="<div style='max-height:26px'><input size='14' onChange='Draw()' style='position:relative;text-align:center;height:16px;top:2px' id='"+id+"'/>";

   			str+="<div style='position:relative;border:1px solid;height:11px;width:11px;top:-16px;left:6px'"

			if (props[o].opt == "colors")	

  				str+=" onclick='shivaLib.ColorPicker(1,"+i+")' id='"+id+"C'/>";		   			

			else

 				str+=" onclick='shivaLib.ColorPicker(0,"+i+")' id='"+id+"C'/>";		   			

			str+="</div>"

			}				   			

   		else if (props[o].opt == "button") 

   			str+="<button type='button' size='14' onChange='"+o+"' id='"+id+"'>"+props[o].def+"</button>";

   		else if (props[o].opt == "slider")

   			str+="<input style='width:100px' onChange='Draw(\"opacity\")' type='range' id='"+id+"' onFocus='ShowHelp(\""+props[o].des+"\")'/>";

   		else if (props[o].opt == "checkbox") {

   			str+="<input onChange='Draw()' type='checkbox' id='"+id+"' onFocus='ShowHelp(\""+props[o].des+"\")'";

   			if (props[o].def == "true")

   				str+=" checked";

   			str+="/> "+props[o].des.split("::")[1];

   			}

   		else if (props[o].opt == "list")

   			str+="<textarea cols='12' rows='2' onChange='Draw()' id='"+id+"' onFocus='ShowHelp(\""+props[o].des+"\")'/>";

   		else if (props[o].opt == "hidden") 

   			str="<tr><td width='12'></td><td width='200'><input type='hidden' id='"+id+"'/>";

   		else if (props[o].opt.indexOf('|') != -1) {

   			var v=props[o].opt.split("|");

			if (o == 'item') {

				str="<tr><td width='12'></td><td colspan='3'><div id='accord'>";

				for (j=0;j<items.length;++j) {

					str+="<h3><a href='#'><b>"+items[j].name+"</b></a></h3><div id='accord-"+j+"'>";

					for (k=i+1;k<atts.length;++k) {

						id2="itemInput"+j+"-"+(k-i);

						oo=atts[k];

						if (props[oo].opt != "hidden")

							str+="<span onClick='ShowHelp(this.innerText)'>"+props[oo].des+"</span><span style='position:absolute;left:142px;'>";

				   		if (props[oo].opt == "color") {

	   						str+="<input size='14' onChange='Draw()' style='text-align:center' id='"+id2+"'>";

			    			str+="<div style='position:relative;border:1px solid;height:8px;width:9px;top:-14px;left:5px'"

							str+=" onclick='shivaLib.ColorPicker(0,"+((j*100)+100+(k-i))+")' id='"+id2+"C'/>";		   			

							}				   			

				   		else if (props[oo].opt == "colors") 

	   						str+="<input size='14' tabIndex='-1' onChange='Draw()' onFocus='shivaLib.ColorPicker(2,"+((j*100)+100+(k-i))+")' id='"+id2+"'>";

			   			else if (props[oo].opt == "button") 

   							str+="<button type='button' size='12' onChange='"+oo+"' id='"+id+"'>"+props[oo].def+"</button>";

			   			else if (props[oo].opt == "slider")

   							str+="<input style='width:90px' onChange='Draw(\"opacity\")' type='range' id='"+id+"' onFocus='ShowHelp(\""+props[oo].des+"\")'/>";

			   			else if (props[oo].opt == "list")

   							str+="<textarea cols='12' rows='2' onChange='Draw()' id='"+id2+"' onFocus='ShowHelp(\""+props[oo].des+"\")'/>";

				   		else if (props[oo].opt == "hidden") 

   							str+="<input type='hidden' id='"+id2+"'/>";

			   			else if (props[oo].opt.indexOf('|') != -1) {

			   				var v=props[oo].opt.split("|");

							str+="<select id='"+id2+"' onChange='Draw()' onFocus='ShowHelp(\""+props[oo].des+"\")'>";

							for (l=0;l<v.length;++l) {

								if (v[l])

									str+="<option>"+v[l]+"</option>";

								}

							str+="</select>";

				   			}

				   		else

   							str+="<input size='14' onChange='Draw()' type='text' id='"+id2+"' onFocus='ShowHelp(\""+props[oo].des+"\")'/>";

				   		str+="</span></p>";

				   		}

					str+="</div>";

					}

				}

			else{

				str+="<select id='"+id+"' onChange='Draw()' onFocus='ShowHelp(\""+props[o].des+"\")'>";

				for (j=0;j<v.length;++j) {

					if (v[j])

						str+="<option>"+v[j]+"</option>";

					}

				str+="</select>";

	   			}

	   		}

	   		else

   				str+="<input size='14' style='height:16px' onChange='Draw()' type='text' id='"+id+"' onFocus='ShowHelp(\""+props[o].des+"\")'/>";

		str+="<td width='12'></td ></td></tr>";

		$(str).appendTo("#propertyTable tbody")

	  	$("#"+id).val(props[o].def);  

	  	if (keepData)

		  	$("#"+id).val(oldData[i]);  

		else

	  		$("#"+id).val(props[o].def);  

   		if (props[o].opt == "color")

			if (props[o].def.toLowerCase() != 'auto') {

				$("#"+id).css('border-color',"#"+props[o].def); 

				$("#"+id+"C").css('background-color',"#"+props[o].def); 

				}

		if (o == "item")

			break;

		}			

	str="<tr height='8'><td></td></tr>";

	$(str).appendTo("#propertyTable tbody")

	$("#accord").accordion({ collapsible:true, active:false, autoHeight:false, change:this.callback});

	if (items) {

		for (j=0;j<items.length;++j) {

			for (k=i+1;k<atts.length;++k) {

		   		o=atts[k];

		   		id2="itemInput"+j+"-"+(k-i);

		   		if (props[o].opt == "color")

	    			if (props[o].def.toLowerCase() != 'auto') {

						$("#"+id2).css('border-color',"#"+items[j][atts[k]]); 

						$("#"+id2+"C").css('background-color',"#"+items[j][atts[k]]); 

						}

				}

			}

		for (i=0;i<atts.length;++i)

			if (atts[i] == "item") {

				atts[i]="name";

				break;

				}

		for (j=0;j<items.length;++j) 

			for (k=i;k<atts.length;++k)	

				$("#itemInput"+j+"-"+(k-i)).val(items[j][atts[k]]);

		}

}