function ieUpdateFilter(resource,cssom,rule,index){

	//添加动画支持

	var style = rule.style;

	var ieversion = resource.prefix.replace(/^-ie(\d)-.*$|.*/,'$1')

	if(ieversion<='8') {

		var htc = resource.cs.htcPath;

		updateBoxStyle(style)

		updateMatrixStyle(style);

		if(ieversion <='6'){//png alpha

			if(updateAlphaPng(resource,style,'background',/url\s*\(\s*(?:'[^]+'|"[^"]"|\S+)\s*\)/)

				||updateAlphaPng(resource,style,'background-image',/.*/)){

				style.setProperty('cs-png-alpha','1')

				appendExpression(style,ieversion,htc);

			}

			if(hasProperty(style,'min-width','max-width','min-height','max-height')){

				style.setProperty('cs-update-mimax','1')

				appendExpression(style,ieversion,htc)

			}

		}

		

		if(hasProperty(style,'transition-property','border-radius',

			'box-shadow','transform','opacity')

			){

			appendExpression(style,ieversion,htc);

		}

		if(updateLinear(style,'background-image') || updateLinear(style,'background')){

			appendExpression(style,ieversion,htc);

		}

		var rgba = updateRgba(style);

		if(rgba){

			appendExpression(style,ieversion,htc);

			style.setProperty('cs-background-rgba',rgba)

		}else if(rgba == ''){

			style.setProperty('cs-background-rgba','')

		}



	}

}