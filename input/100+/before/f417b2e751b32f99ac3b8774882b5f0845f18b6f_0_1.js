function compileClicked() {
		EL('#compile').disabled = true;
		var enabledSections = {};
		$('.secCheck').each(function(cb) {
			if (cb.checked)
				enabledSections[cb.id.substr(4)] = 1;
		});
		
		var src = compile(s.sections, s.sectionMap, enabledSections);
		closureCompile(src, function(closureResult) {
			EL('#compile').disabled = false;
			EL('#resultSrc').value = closureResult.compiledCode;
			EL('#resultPlain').innerText = (closureResult.statistics.compressedSize/1024).toFixed(2) + 'kb';
			EL('#resultGzipped').innerText = (closureResult.statistics.compressedGzipSize/1024).toFixed(2) + 'kb';
			EL('#resultLink').setAttribute('href', 'http://closure-compiler.appspot.com' +closureResult.outputFilePath);
		});
	}