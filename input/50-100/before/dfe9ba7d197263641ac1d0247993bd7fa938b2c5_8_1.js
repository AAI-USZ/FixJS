function () {

        expect(detectStrictMode('"use strict";')).to.be(true);

        expect(detectStrictMode('      "use strict";')).to.be(true);

        expect(detectStrictMode('  \n "use strict";')).to.be(true);

    }