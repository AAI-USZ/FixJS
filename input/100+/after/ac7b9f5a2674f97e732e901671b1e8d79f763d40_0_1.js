function() {

	ok(window.Modernizr, 'global modernizr object created');

  // this comes from kangax's detect-global.js

    var globArr = Object.keys(__globals);

    // remove Modernizr and html5
    var leakedGlobArr = [''].concat(globArr).concat([''])
                            .join(',')
                            .replace(',Modernizr','').replace(',html5','')
                            .replace('URL','') // lazily added in Opera it seems.
                            .replace(/,script\w+/,'') // placed by jQuery
                            .split(',');

    equal('', leakedGlobArr.pop(), 'retrieved my empty item from the end');
    equal('', leakedGlobArr.shift(), 'retrieved my empty item from the front');

	equal(leakedGlobArr.toString(), [].toString(), 'no global variables should leak (other than Modernizr and iepp)');

}