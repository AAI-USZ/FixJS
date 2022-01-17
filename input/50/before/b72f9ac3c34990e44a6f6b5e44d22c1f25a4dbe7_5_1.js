function () {
        var c;
        S.Env = S.Env || {};
        c = S.Config = S.Config || {};
        // NOTICE: '@DEBUG@' will replace with '' when compressing.
        // So, if loading source file, debug is on by default.
        // If loading min version, debug is turned off automatically.
        c.debug = '@DEBUG@';
        /**
         * The build time of the library
         * @type {String}
         */
        S.__BUILD_TIME = '20120712140345';
    }