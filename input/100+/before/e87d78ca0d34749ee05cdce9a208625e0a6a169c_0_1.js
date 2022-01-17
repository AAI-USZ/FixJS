function initStorage() {
	if(!stash.get('Identifiers')) {
		initDate = Date.parse(new Date());
		firstEntry = '{"headline":"Wrote my first mobile application", "body":"Today I wrote my first mobile application. It was great! I had huge amounts of fun, it was a lot easier than I expected, and I was so happy I spent the rest of the day celebrating.","time":' + initDate + ',"address":"' + stash.get('address') + '"}';
		alert(firstEntry);
		stash.set(initDate.toString(), firstEntry);
		stash.set('Identifiers', initDate.toString() + " ");
		
		secondDate = initDate + 1000;
		secondEntry = '{"headline":"Wrote another mobile application", "body":"I am on such a roll with these mobile Web applications that I went crazy and wrote a second one. I am so happy I cannot stop singing at the top of my lungs. My cat seems worried that I\'ve finally lost it completely, but I don\'t care — it\'s mobile Web all the way from now on!","time":' + secondDate + ',"address":"' + stash.get('address') + '"}';
		stash.set(secondDate.toString(), secondEntry);
		stash.add('Identifiers', secondDate.toString() + " ");
		
		thirdDate = initDate + 2000;
		thirdEntry = '{"headline":"Must stop writing mobile application", "body":"My fingers are sore from writing so many great mobile Web applications. I know that I should stop and take a break, but there are so many great things to do with this technology that I really don\'t know how to stop!","time":' + thirdDate + ',"address":"' + stash.get('address') + '"}';
		stash.set(thirdDate.toString(), thirdEntry);
		stash.add('Identifiers', thirdDate.toString());
	}
}