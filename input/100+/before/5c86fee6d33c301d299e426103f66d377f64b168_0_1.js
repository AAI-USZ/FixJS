function (global) {

    "use strict";



    /**

     * @namespace

     * @type {Object}

     */

    var pklib = global.pklib || {},

        /**

         * Default time what is timeout to use function pklib.ajax

         * @private

         * @constant

         * @type Number

         */

        DEFAULT_TIMEOUT_TIME = 30000,

        /**

         * @private

         * @constant

         * @type Number

         */

        REQUEST_STATE_UNSENT = 0,

        // REQUEST_STATE_OPENED = 1,

        // REQUEST_STATE_HEADERS_RECEIVED = 2,

        // REQUEST_STATE_LOADING = 3,

        /**

         * @private

         * @constant

         * @type Number

         */

        REQUEST_STATE_DONE = 4,

        /**

         * Array contain key as url, value as ajax response

         * @private

         * @type Array

         */

        cache = [],

        /**

         * Use when state in request is changed or if used cache is handler to request.

         * @private

         * @function

         * @param {Object} settings

         * @param {XMLHttpRequest} xhr

         */

        handler = function (settings, xhr) {

            var contentType,

                xmlContentType = ["application/xml", "text/xml"],

                property = "responseText";



            if (xhr.readyState === REQUEST_STATE_DONE && xhr.status !== REQUEST_STATE_UNSENT) {

                if (settings.cache) {

                    cache[settings.url] = xhr;

                }



                contentType = xhr.getResponseHeader("Content-Type");



                if (pklib.array.in_array(contentType, xmlContentType)) {

                    property = "responseXML";

                }



                settings.done.call(null, xhr[property]);



                // clear memory

                xhr = null;

            }

        },

        /**

         * Handler to unusually situation - timeout.

         * @private

         * @function

         * @param {Object} settings

         * @param {XMLHttpRequest} xhr

         * @throws {Error} If exists timeout on request

         */

        timeout_handler = function (settings, xhr) {

            // clear memory

            xhr = null;

            // throw exception

            throw new Error("pklib.ajax.load: timeout on url: " + settings.url);

        },

        /**

         * Method use when request has timeout

         * @private

         * @function

         * @param {Object} settings

         * @param {XMLHttpRequest} xhr

         * @throws {Error} If exists timeout on request

         */

        request_timeout = function (settings, xhr) {

            if (typeof xhr.aborted === "undefined" &&

                    typeof xhr.error === "undefined" &&

                    xhr.readyState === REQUEST_STATE_DONE &&

                    xhr.status === REQUEST_STATE_UNSENT) {

                xhr.abort();

                timeout_handler.call(null, settings, xhr);

            }

        },

        /**

         * Try to create Internet Explorer XMLHttpRequest

         * @private

         * @function

         * @throws {Error} If can not create XMLHttpRequest object

         * @returns {ActiveXObject|Undefined}

         */

        create_microsoft_xhr = function () {

            var xhr;

            try {

                xhr = new global.ActiveXObject("Msxml2.XMLHTTP");

            } catch (ignore) {

                try {

                    xhr = new global.ActiveXObject("Microsoft.XMLHTTP");

                } catch (ignored) {

                    throw new Error("pklib.ajax.load: cannot create XMLHttpRequest object");

                }

            }

            return xhr;

        },

        /**

         * Try to create XMLHttpRequest

         * @private

         * @function

         * @throws {Error} If can not create XMLHttpRequest object

         * @returns {XMLHttpRequest|Undefined}

         */

        create_xhr = function () {

            var xhr;

            try {

                xhr = new global.XMLHttpRequest();

            } catch (ignore) {

                xhr = create_microsoft_xhr();

            }

            return xhr;

        },

        /**

         * Add headers to xhr object

         * @private

         * @function

         * @param {Object} settings

         * @param {XMLHttpRequest} xhr

         */

        add_headers_to_xhr = function (settings, xhr) {

            var header,

                headers = settings.headers;



            if (headers !== null) {

                for (header in headers) {

                    if (headers.hasOwnProperty(header)) {

                        xhr.setRequestHeader(header, headers[header]);

                    }

                }

            }

        },

        /**

         * Add timeout service to xhr object

         * @private

         * @function

         * @param {Object} settings

         * @param {XMLHttpRequest} xhr

         */

        add_timeout_service_to_xhr = function (settings, xhr) {

            if (typeof xhr.ontimeout === "function") {

                xhr.ontimeout = timeout_handler.bind(null, settings, xhr);

            } else {

                pklib.common.defer(request_timeout.bind(null, settings, xhr), settings.timeout);

            }

        },

        /**

         * Add error service to xhr object

         * @private

         * @function

         * @param {Object} settings

         * @param {XMLHttpRequest} xhr

         */

        add_error_service_to_xhr = function (settings, xhr) {

            xhr.onerror = function () {

                xhr.error = true;

                settings.error.bind(null, settings, xhr);

            };

        },

        /**

         * Check is response on this request is in cache

         * @private

         * @function

         * @param {Object} settings

         * @returns {Boolean}

         */

        is_response_in_cache = function (settings) {

            return settings.cache && cache[settings.url];

        },

        /**

         * Return object what is default configuration of request

         * @private

         * @function

         * @returns {Object} Default configuration

         */

        set_default_settings = function () {

            /**

             * Request settings, contain ex. headers, callback when run after request finish.

             * Default timeout on request is 30 seconds. This is default timeout from popular web servers

             * ex. Apache, ngninx.

             * Default request hasn't any headers.

             * Default cache is disabled.

             * Default asynchronous is enable.

             */

            return {

                type: "get",

                async: true,

                cache: false,

                url: null,

                params: null,

                timeout: DEFAULT_TIMEOUT_TIME,

                headers: {},

                /**

                 * Function run after request ended

                 * In params exists only: response

                 */

                done: function () {

                    // do something with response

                },

                error: function () {

                    // do something when appear error in request

                }

            };

        },

        /**

         * Check url in request is defined.

         * Throw error if is undefined

         * @private

         * @function

         * @param {Object} settings

         * @throws {Error} If unset request url

         */

        check_if_url_is_defined = function (settings) {

            pklib.common.assert(settings.url !== null, "pklib.ajax.load: undefined request url");

        };



    /**

     * Service to send request to server.

     * With first param, which is hashmap, define params, ex. request url

     * @namespace

     */

    pklib.ajax = {

        /**

         * Send request to server on url defined in config.url.

         * Method throw exception when request have timeout on server or if url is not set.

         * Also, every response (if config.cache is true) saved to hashmap by key config.url.

         * Method on first try to can create XMLHttpRequest if browser doesn't support, check

         * if browser support object ActiveXObject which is implemented in Internet Explorer.

         * @memberOf pklib.ajax

         * @function

         * @param {Object} config

         * <pre>

         * {

         *      {String} [type="get"]

         *      {Boolean} [async=true]

         *      {Boolean} [cache=false]

         *      {String} url

         *      {Object} [params]

         *      {Object} [headers]

         *      {Function} [done]

         *      {Function} [error]

         * }

         * </pre>

         * @example

         * <pre>

         * pklib.ajax.load({

         *      type: "post",

         *      async: false,

         *      cache:  true,

         *      url: "http://example.org/check-item.php",

         *      params: {

         *          id: 33

         *      },

         *      headers: {

         *          "User-Agent": "tv"

         *      },

         *      done: function (res) {

         *          console.log(res);

         *      }

         * });

         * </pre>

         * @throws {Error} If unset request url

         * @returns {XMLHttpRequest|Null}

         */

        load: function (config) {

            var xhr = null,

                settings = set_default_settings();



            settings = pklib.object.mixin(settings, config);

            settings.type = settings.type.toUpperCase();



            check_if_url_is_defined(settings);



            if (is_response_in_cache(settings)) {

                handler.call(null, settings, cache[settings.url]);

            } else {

                xhr = create_xhr();

                xhr.onreadystatechange = handler.bind(null, settings, xhr);

                xhr.open(settings.type, settings.url, settings.async);



                add_headers_to_xhr(settings, xhr);

                add_timeout_service_to_xhr(settings, xhr);

                add_error_service_to_xhr(settings, xhr);

                xhr.send(settings.params);

            }

            return xhr;

        },

        /**

         * Stop request setting in param

         * @memberOf pklib.ajax

         * @function

         * @param {XMLHttpRequest|ActiveXObject} xhr XMLHttpRequest object, or ActiveXObject object if Internet Explorer

         */

        stop: function (xhr) {

            xhr.abort();

            xhr.aborted = true;

            // clear memory

            xhr = null;

        }

    };



}