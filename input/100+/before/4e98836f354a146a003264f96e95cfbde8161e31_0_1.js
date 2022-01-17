function compile(template){
	var chunk = template.split(/{%(.*?)%}/gm);
	var body = ['var _O=[];'];
	for (var i=0,l=chunk.length,token;i<l;i++) {
		token = chunk[i];
		if (i%2) {
			token = trim(token);
			switch(true){
			// {%fi%}
			case token == 'fi': body.push('}'); break;
			// {%hcae%}
			case token == 'hcae': body.push('});'); break;
			// {%else%}
			case token == 'else': body.push('}else{'); break;
			// {%if expr%}
			case r_if.test(token):
				body.push("if("+expr(RegExp.$1)+"){");
				break;
			// {%elif expr%}
			case r_elif.test(token):
				body.push("}else if("+expr(RegExp.$1)+"){");
				break;
			// {%each expr as value,key%}
			case r_each.test(token):
				body.push("this.each("+expr(RegExp.$1)+",function("+(RegExp.$3 || "_P") + "," + RegExp.$2 + "){");
				break;
			// {%var=expr%}
			case r_var.test(token):
				body.push("var "+RegExp.$1+"="+expr(RegExp.$2)+";");
				break;
			// {%expr%}
			default:
				body.push("_O.push("+expr(token)+");");
				break;
			}
		} else {
			body.push("_O.push("+q(token)+");");
		}
	}
	body.push('return _O.join("");');
	return body.join('');
}