function () {

        expect(detectStrictMode('"use strict";') === true).to.be(true);

        expect(detectStrictMode('      "use strict";') === true).to.be(true);

        expect(detectStrictMode('  \n "use strict";') === true).to.be(true);

    }