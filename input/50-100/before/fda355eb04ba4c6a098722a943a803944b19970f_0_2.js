function() {
        	var dom = fragment(
        		element("p",
        			a("TestPage", "label"),
        			a("TestPage", "läbel"),
        			a("TestPage", "TestPage"),
        			a("FrontPage?edit", "Edit"),
        			" button and add a ",
        			a("FitNesse.UserGuide.WikiWord", "!-WikiWord-!")
        		));
        		
        	var wikitext = "[[label][TestPage]]"
        		+ "[[läbel][TestPage]]"
        		+ "[[TestPage][TestPage]]"
        		+ "[[Edit][FrontPage?edit]] button and add a [[!-WikiWord-!][FitNesse.UserGuide.WikiWord]]";
        	
        	// should go both ways (wiki2html and html2wiki)
        	generateWikitext.call(this, dom, wikitext);
        	generateFragment.call(this, dom, wikitext);
        }