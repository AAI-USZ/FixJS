function() {
		out('/Producer (jsPDF ' + version + ')')
		if(documentProperties.title != undefined) {
			out('/Title (' + pdfEscape(documentProperties.title) + ')')
		}
		if(documentProperties.subject != undefined) {
			out('/Subject (' + pdfEscape(documentProperties.subject) + ')')
		}
		if(documentProperties.author != undefined) {
			out('/Author (' + pdfEscape(documentProperties.author) + ')')
		}
		if(documentProperties.keywords != undefined) {
			out('/Keywords (' + pdfEscape(documentProperties.keywords) + ')')
		}
		if(documentProperties.creator != undefined) {
			out('/Creator (' + pdfEscape(documentProperties.creator) + ')')
		}		
		var created = new Date()
		out('/CreationDate (D:' + 
			[
				created.getFullYear()
				, padd2(created.getMonth() + 1)
				, padd2(created.getDate())
				, padd2(created.getHours())
				, padd2(created.getMinutes())
				, padd2(created.getSeconds())
			].join('')+
			')'
		)
	}