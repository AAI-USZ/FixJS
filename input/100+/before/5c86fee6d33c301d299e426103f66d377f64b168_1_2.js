function (global) {
    "use strict";

    var uriArray = pklib.url.get_uri().split("/"),
        PREFIX = "/" + uriArray[1] + "/" + uriArray[2] + "/",
        DIR = PREFIX + "data/",
        msg = function (file) {
            return "File: " + file + ", contain good value";
        };

    pklib.event.add(global, "load", function () {
        /**
         * @type test of library
         */
        var test_with_get_simple_plain_text = function () {
            pklib.ajax.load({
                url: DIR + "data.txt",
                timeout: 2000,
                done: function (txt) {
                    module("pklib.ajax");

                    asyncTest("test_with_get_simple_plain_text", function () {
                        strictEqual(txt, "1", msg("Data.txt"));
                        start();
                    });
                }
            });
        },
        /**
         * @type test of library
         */
        test_with_get_simple_json_file = function () {
            pklib.ajax.load({
                url: DIR + "data.json",
                timeout: 2000,
                done: function (json) {
                    module("pklib.ajax");

                    asyncTest("test_with_get_simple_json_file", function () {
                        json = eval("[" + json + "]")[0];
                        strictEqual(json.data, 1, msg("Data.json"));
                        start();
                    });
                }
            });
        },
        /**
         * @type test of library
         */
        test_with_get_simple_xml = function () {
            pklib.ajax.load({
                url: DIR + "data.xml",
                timeout: 2000,
                done: function (xml) {
                    module("pklib.ajax");

                    asyncTest("test_with_get_simple_xml", function () {
                        var child = xml.getElementsByTagName("child")[0],
                            content = child.text || child.textContent;
                        strictEqual(content, "data", msg("Data.xml"));
                        start();
                    });
                }
            });
        },
        /**
         * @type test of library
         */
        test_usage_all_params = function () {
            pklib.ajax.load({
                type: "GET",
                async: false,
                url: "http://localhost",
                timeout: 2000,
                params: {
                    id: 33
                },
                headers: {
                    "Platform": "tv"
                },
                done: function (response) {
                    module("pklib.ajax");

                    asyncTest("test_usage_all_params", function () {
                        notStrictEqual(response.length, 0, "Content length has no 0 size");
                        start();
                    });
                }
            });
        },
        /**
         * @type test of library
         */
        test_stopping_request = function () {
            var started = 0,
                xhr = pklib.ajax.load({
                    url: "http://www.google.com/",
                    timeout: 2000,
                    done: function (response) {
                        started = response;
                    }
                });
            pklib.ajax.stop(xhr);
            module("pklib.ajax");

            test("test_stopping_request", function () {
                ok(pklib.object.is_object(xhr), "Create XMLHTTPRequest");
                strictEqual(started, 0, "Request is aborting!");
            });
        },
        /**
         * @type test of library
         */
        test_timeout_request = function () {
            var xhr = pklib.ajax.load({
                url: "http://example.org/",
                timeout: 2000
            });
            module("pklib.ajax");

            test("test_timeout_request", function () {
                ok(pklib.object.is_object(xhr), "Create XMLHTTPRequest");
            });
        },
        /**
         * @type test of library
         */
        test_error_request = function () {
            var error = 1,
                xhr = pklib.ajax.load({
                    url: "http://example.org/",
                    error: function () {
                        error = 1;
                    }
                });
            module("pklib.ajax");

            test("test_error_request", function () {
                ok(pklib.object.is_object(xhr), "Create XMLHTTPRequest");
                strictEqual(error, 1, "Error request");
            });
        },
        /**
         * @type test of library
         */
        test_undefined_url = function () {
            module("pklib.ajax");

            test("test_undefined_url", function () {
                try {
                    var xhr = pklib.ajax.load();
                    ok(typeof xhr !== "undefined", "Create XMLHTTPRequest");
                } catch (e) {
                    ok(typeof xhr === "undefined", "Doesn't create XMLHTTPRequest");
                    strictEqual(e.toString(), "Error: pklib.ajax.load: undefined request url", "Error request");
                }
            });
        };

        test_with_get_simple_plain_text();
        test_with_get_simple_json_file();
        test_with_get_simple_xml();
        test_usage_all_params();
        test_stopping_request();
        // test_timeout_request();
        test_error_request();
        test_undefined_url();
    });

}