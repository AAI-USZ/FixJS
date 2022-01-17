function() {
        var doc = new EditSession([
			"/*",
			"*/",
			"var juhu"
		]);
		doc.setMode("ace/mode/javascript")  
		
		forceTokenize(doc)
        testStates(doc, ["comment", "start", "start"])
		
		doc.remove(new Range(0,2,1,2))
		testStates(doc, [null, "start"])
		
		forceTokenize(doc)
        testStates(doc, ["comment", "comment"])
		
		doc.insert({row:0, column:2}, "\n*/")
		testStates(doc, [undefined, undefined, "comment"])
		
		forceTokenize(doc)
        testStates(doc, ["comment", "start", "start"])
    }