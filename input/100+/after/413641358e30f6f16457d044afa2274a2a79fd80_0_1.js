function include_document_or_template(event) {
	/*	Inclui um documento anterior (ou modelo) no corpo do documento. 
		doc_content eh apenas o conteudo do documento. O 2 children()
		sao usados para retirar as divs pais, o que estava
		causando bugs.	
		'body_gdoc' eh o corpo do documento, que recebera o conteudo
		incluido. Essa forma diferente de seleciona-lo eh pelo fato 
		de ele ser um iframe. O .find("#content") seleciona o body
		dentro da iframe gdocument_body_ifr.	
	*/	
	event.preventDefault();
	/* caso tenha algum documento anterior visivel, ele sera incluido.
	 caso contrario, um modelo sera incluido. */
	if ($(".docs_content:visible").length) {
		/* aqui eu pego apenas o conteúdo da div neta. */
		doc_content = $(".docs_content:visible").children().children();
	}
	else {
		/* aqui eu pego apenas o conteúdo da div neta. */
		doc_content = $(".templates_content:visible").children().children();
	}

	/* a selecao abaixo eh diferente porque o elemento 'content' esta dentro
	de um iframe (a richtext widget) */
	body_gdoc = $("#gdocument_body_ifr").contents().find("#content");
	body_gdoc.fadeOut("slow");
	/* se ja existe conteudo na richtext widget, da um append, caso contrario
	utiliza html() para preencher tudo (inclusive o <p> vazio inicial) */
	if(body_gdoc.find("br[mce_bogus]").length) {
        /*existe um bug que impede o atributo 'rows' da RichTextWidget de funcionar quando
        nao se esta na aba Principal (como eh o caso do document_body), por isso o trecho
        a seguir aumenta o tamanho do corpo do documento na marra.*/
        gdoc_iframe = $("#gdocument_body_ifr");
        gdoc_iframe.css("height", "350");        
		body_gdoc.html(doc_content);
	}		
	else {
		doc_content.clone().appendTo(body_gdoc);
	}
	body_gdoc.fadeIn("slow");	
}