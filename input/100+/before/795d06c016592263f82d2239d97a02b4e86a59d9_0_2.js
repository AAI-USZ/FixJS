function(thing,settings)
{
	if(!thing)
		return '';

	if(!settings)
		settings = {};

	if(thing.args)
	{
		var texArgs = [];
		for(var i=0; i<thing.args.length; i++ )
		{
			texArgs[i] = texify(thing.args[i],settings);
		}
	}

	var texNumber = settings.fractionnumbers ? texRationalNumber : texRealNumber;

	var tok = thing.tok || thing;
	switch(tok.type)
	{
	case 'number':
		if(tok.value==Math.E)
			return 'e';
		else if(tok.value==Math.PI)
			return '\\pi';
		else
			return texNumber(tok.value);
	case 'string':
		return '\\textrm{'+tok.value+'}';
		break;
	case 'boolean':
		return tok.value ? 'true' : 'false';
		break;
	case 'range':
		return tok.value[0]+ ' \dots '+tok.value[1];
		break;
	case 'list':
		if(!texArgs)
		{
			texArgs = [];
			for(var i=0;i<tok.vars;i++)
			{
				texArgs[i] = texify(tok.value[i],settings);
			}
		}
		return '\\left[ '+texArgs.join(', ')+' \\right]';
	case 'vector':
		return('\\left( ' 
				+ texVector(tok.value,settings)
				+ ' \\right)' );
	case 'matrix':
		return '\\left( '+texMatrix(tok.value,settings)+' \\right)';
	case 'name':
		return texName(tok.name,tok.annotation);
		break;
	case 'special':
		return tok.value;
		break;
	case 'conc':
		return texArgs.join(' ');
		break;
	case 'op':
		return texOps[tok.name.toLowerCase()](thing,texArgs,settings);
		break;
	case 'function':
		if(texOps[tok.name.toLowerCase()])
		{
			return texOps[tok.name.toLowerCase()](thing,texArgs,settings);
		}
		else
		{
			if(tok.name.replace(/[^A-Za-z]/g,'').length==1)
				var texname=tok.name;
			else
				var texname='\\operatorname{'+tok.name+'}';

			return texName(texname,tok.annotation)+' \\left ( '+texArgs.join(', ')+' \\right )';
		}
		break;
	default:
		throw(new Numbas.Error('jme.display.unknown token type',tok.type));
	}
}