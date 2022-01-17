function hashchanged(){

	var hash = location.hash;

	if(hash!=latestHash){

		var el = /^#[\w\-\$_]+$/.test(latestHash) && document.all[latestHash.slice(1)];

		if(el){

			el.className = el.className.replace(/(?:^|\s+|\S+--)target__(\s+|--\S+|$)/,' ')

		}

		latestHash = hash;

		if(el = /^#[\w\-\$_]+$/.test(latestHash)&& document.all[latestHash.slice(1)]){

			el.className += ' target__'

		}

	}

}