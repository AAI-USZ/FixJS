function () {
    "use strict";

    module("pklib.ajax");

    var uriArray = pklib.url.get_uri().split("/"),
        PREFIX = "/" + uriArray[1] + "/" + uriArray[2] + "/",
        DIR = PREFIX + "data/",
        msg = function (file) {
            return "File: " + file + ", contain good value";
        };

    function test_with_get_simple_plain_text() {
        asyncTest("test_with_get_simple_plain_text", function () {
            expect(1);

            pklib.ajax.load({
                url: DIR + "data.txt",
                timeout: 2000,
                done: function (txt) {
                    strictEqual(txt, "1", msg("Data.txt"));
                    start();
                }
            });
        });
    }

    function test_with_get_simple_json_file() {
        asyncTest("test_with_get_simple_json_file", function () {
            expect(1);

            pklib.ajax.load({
                url: DIR + "data.json",
                timeout: 2000,
                done: function (json) {
                    json = eval("[" + json + "]")[0];
                    strictEqual(json.data, 1, msg("Data.json"));
                    start();
                }
            });
        });
    }

    function test_with_get_simple_xml() {
        asyncTest("test_with_get_simple_xml", function () {
            expect(1);

            pklib.ajax.load({
                url: DIR + "data.xml",
                timeout: 2000,
                done: function (xml) {
                    var child = xml.getElementsByTagName("child")[0],
                        content = child.text || child.textContent;
                    strictEqual(content, "data", msg("Data.xml"));
                    start();
                }
            });
        });
    }

    function test_usage_all_params() {
        asyncTest("test_usage_all_params", function () {
            expect(1);

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
                    notStrictEqual(response.length, 0, "Content length has no 0 size");
                    start();
                }
            });
        });
    }

    function test_stopping_request() {
        asyncTest("test_stopping_request", function () {
            expect(2);

            var started = 0,
                xhr = pklib.ajax.load({
                    url: "http://example.org/",
                    timeout: 1,
                    done: function (response) {
                        started = response;
                    }
                });
            pklib.ajax.stop(xhr);

            ok(pklib.object.is_object(xhr), "Create XMLHTTPRequest");
            strictEqual(started, 0, "Request is aborting!");
            start();
        });
    }

    function test_timeout_request() {
        test("test_timeout_request", function () {
            expect(1);

            var xhr = pklib.ajax.load({
                url: "http://example.org/",
                timeout: 2000
            });

            ok(pklib.object.is_object(xhr), "Create XMLHTTPRequest");
        });
    }

    function test_error_request() {
        asyncTest("test_error_request", function () {
            expect(2);

            var xhr = pklib.ajax.load({
                timeout: 300,
                url: "http://localhost/error/",
                error: function () {
                    ok(pklib.object.is_object(xhr), "Create XMLHTTPRequest");
                    ok("Error request");
                    start();
                }
            });
        });
    }

    function test_undefined_url() {
        test("test_undefined_url", function () {
            expect(1);

            try {
                pklib.ajax.load();
            } catch (e) {
                strictEqual(e.toString(), "Error: pklib.ajax.load: undefined request url", "Error request");
            }
        });
    }

    test_with_get_simple_plain_text();
    test_with_get_simple_json_file();
    test_with_get_simple_xml();
    test_usage_all_params();
    test_stopping_request();
    test_timeout_request();
    test_error_request();
    test_undefined_url();

}