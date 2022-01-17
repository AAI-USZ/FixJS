function getKeywords(signal) {
	  return signal.title.split(" ").concat(signal.text.split(" "));
	}