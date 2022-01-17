function(content,before){

		var el = document.getElementById(this.id);

		content = window.eval(content.replace(/\r\n?|\n/g,'\\r\\n'));

		el = before?

				addition(el,'cs-addition-before',beforeHTML,true):

				addition(el,'cs-addition-after',afterHTML);

		el.onselectstart = returnFalse;

		//el.oncopy = function(){return false}

		try{

			while(el.firstChild){el.removeChild(el.firstChild);}

			el.appendChild(document.createTextNode(content))

		}catch(e){

			el.innerHTML = content;

		}

	}