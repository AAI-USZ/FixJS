function compileClicked() {
		var enabledSections = {};
		$('.secCheck').each(function(cb) {
			if (cb.checked)
				enabledSections[cb.id.substr(4)] = 1;
		});
		
		var src = compile(s.sections, s.sectionMap, enabledSections);
		// TODO: add header
		if (EL('#compressionClosure').checked) {
			EL('#compile').disabled = true;
			closureCompile(src, function(closureResult) {
				if (closureResult) {
					EL('#compile').disabled = false;
					$('#gzipRow, #downloadRow').set({$display: 'table-row'});
					EL('#resultSrc').value = closureResult.compiledCode;
					EL('#resultPlain').innerText = (closureResult.statistics.compressedSize/1024).toFixed(2) + 'kb';
					EL('#resultGzipped').innerText = (closureResult.statistics.compressedGzipSize/1024).toFixed(2) + 'kb';
					EL('#resultLink').setAttribute('href', 'http://closure-compiler.appspot.com' +closureResult.outputFilePath);
				}
			});
		}
		else  {
			EL('#resultSrc').value = src;
			EL('#resultPlain').innerText = (src.length/1024).toFixed(2) + 'kb';
			$('#gzipRow, #downloadRow').set({$display: 'none'});
		}
		return false;
	}