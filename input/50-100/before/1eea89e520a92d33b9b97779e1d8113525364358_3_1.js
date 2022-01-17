function (err, p, expectedCss, expectedProblems) {
			assert.ifError(err);
			var aStr = p.toString() + "\n";  // Pretty printing removes the last newline
			var dStr = diff.createPatch(null, aStr, expectedCss);
			assert.deepEqual(aStr, expectedCss, "Pretty CSS did not match\nDiff:" + dStr);
		}