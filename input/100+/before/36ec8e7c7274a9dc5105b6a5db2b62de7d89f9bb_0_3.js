function defineNativeACS() {
        var ACS = {};

        /**
         * @preserve
         * Copyright 2008 Netflix, Inc.
         *
         * Licensed under the Apache License, Version 2.0 (the "License");
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         *     http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */

        /* Here's some JavaScript software for implementing OAuth.

         This isn't as useful as you might hope.  OAuth is based around
         allowing tools and websites to talk to each other.  However,
         JavaScript running in web browsers is hampered by security
         restrictions that prevent code running on one website from
         accessing data stored or served on another.

         Before you start hacking, make sure you understand the limitations
         posed by cross-domain XMLHttpRequest.

         On the bright side, some platforms use JavaScript as their
         language, but enable the programmer to access other web sites.
         Examples include Google Gadgets, and Microsoft Vista Sidebar.
         For those platforms, this library should come in handy.
         */

        // The HMAC-SHA1 signature method calls b64_hmac_sha1, defined by
        // http://pajhome.org.uk/crypt/md5/sha1.js

        /* An OAuth message is represented as an object like this:
         {method: "GET", action: "http://server.com/path", parameters: ...}

         The parameters may be either a map {name: value, name2: value2}
         or an Array of name-value pairs [[name, value], [name2, value2]].
         The latter representation is more powerful: it supports parameters
         in a specific sequence, or several parameters with the same name;
         for example [["a", 1], ["b", 2], ["a", 3]].

         Parameter names and values are NOT percent-encoded in an object.
         They must be encoded before transmission and decoded after reception.
         For example, this message object:
         {method: "GET", action: "http://server/path", parameters: {p: "x y"}}
         ... can be transmitted as an HTTP request that begins:
         GET /path?p=x%20y HTTP/1.0
         (This isn't a valid OAuth request, since it lacks a signature etc.)
         Note that the object "x y" is transmitted as x%20y.  To encode
         parameters, you can call OAuth.addToURL, OAuth.formEncode or
         OAuth.getAuthorization.

         This message object model harmonizes with the browser object model for
         input elements of an form, whose value property isn't percent encoded.
         The browser encodes each value before transmitting it. For example,
         see consumer.setInputs in example/consumer.js.
         */

        /* This script needs to know what time it is. By default, it uses the local
         clock (new Date), which is apt to be inaccurate in browsers. To do
         better, you can load this script from a URL whose query string contains
         an oauth_timestamp parameter, whose value is a current Unix timestamp.
         For example, when generating the enclosing document using PHP:

         <script src="oauth.js?oauth_timestamp=<?=time()?>" ...

         Another option is to call OAuth.correctTimestamp with a Unix timestamp.
         */

        var OAuth;
        if (OAuth == null) OAuth = {};

        OAuth.setProperties = function setProperties(into, from) {
            if (into != null && from != null) {
                for (var key in from) {
                    into[key] = from[key];
                }
            }
            return into;
        };

        OAuth.setProperties(OAuth, // utility functions
            {
                percentEncode: function percentEncode(s) {
                    if (s == null) {
                        return "";
                    }
                    if (s instanceof Array) {
                        var e = "";
                        for (var i = 0; i < s.length; ++s) {
                            if (e != "") e += '&';
                            e += OAuth.percentEncode(s[i]);
                        }
                        return e;
                    }
                    s = encodeURIComponent(s);
                    // Now replace the values which encodeURIComponent doesn't do
                    // encodeURIComponent ignores: - _ . ! ~ * ' ( )
                    // OAuth dictates the only ones you can ignore are: - _ . ~
                    // Source: http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Functions:encodeURIComponent
                    s = s.replace(/\!/g, "%21");
                    s = s.replace(/\*/g, "%2A");
                    s = s.replace(/\'/g, "%27");
                    s = s.replace(/\(/g, "%28");
                    s = s.replace(/\)/g, "%29");
                    return s;
                },
                decodePercent: function decodePercent(s) {
                    if (s != null) {
                        // Handle application/x-www-form-urlencoded, which is defined by
                        // http://www.w3.org/TR/html4/interact/forms.html#h-17.13.4.1
                        s = s.replace(/\+/g, " ");
                    }
                    return decodeURIComponent(s);
                },
                /** Convert the given parameters to an Array of name-value pairs. */
                getParameterList: function getParameterList(parameters) {
                    if (parameters == null) {
                        return [];
                    }
                    if (typeof parameters != "object") {
                        return OAuth.decodeForm(parameters + "");
                    }
                    if (parameters instanceof Array) {
                        return parameters;
                    }
                    var list = [];
                    for (var p in parameters) {
                        list.push([p, parameters[p]]);
                    }
                    return list;
                },
                /** Convert the given parameters to a map from name to value. */
                getParameterMap: function getParameterMap(parameters) {
                    if (parameters == null) {
                        return {};
                    }
                    if (typeof parameters != "object") {
                        return OAuth.getParameterMap(OAuth.decodeForm(parameters + ""));
                    }
                    if (parameters instanceof Array) {
                        var map = {};
                        for (var p = 0; p < parameters.length; ++p) {
                            var key = parameters[p][0];
                            if (map[key] === undefined) { // first value wins
                                map[key] = parameters[p][1];
                            }
                        }
                        return map;
                    }
                    return parameters;
                },
                getParameter: function getParameter(parameters, name) {
                    if (parameters instanceof Array) {
                        for (var p = 0; p < parameters.length; ++p) {
                            if (parameters[p][0] == name) {
                                return parameters[p][1]; // first value wins
                            }
                        }
                    } else {
                        return OAuth.getParameterMap(parameters)[name];
                    }
                    return null;
                },
                formEncode: function formEncode(parameters) {
                    var form = "";
                    var list = OAuth.getParameterList(parameters);
                    for (var p = 0; p < list.length; ++p) {
                        var value = list[p][1];
                        if (value == null) value = "";
                        if (form != "") form += '&';
                        form += OAuth.percentEncode(list[p][0])
                            + '=' + OAuth.percentEncode(value);
                    }
                    return form;
                },
                decodeForm: function decodeForm(form) {
                    var list = [];
                    var nvps = form.split('&');
                    for (var n = 0; n < nvps.length; ++n) {
                        var nvp = nvps[n];
                        if (nvp == "") {
                            continue;
                        }
                        var equals = nvp.indexOf('=');
                        var name;
                        var value;
                        if (equals < 0) {
                            name = OAuth.decodePercent(nvp);
                            value = null;
                        } else {
                            name = OAuth.decodePercent(nvp.substring(0, equals));
                            value = OAuth.decodePercent(nvp.substring(equals + 1));
                        }
                        list.push([name, value]);
                    }
                    return list;
                },
                setParameter: function setParameter(message, name, value) {
                    var parameters = message.parameters;
                    if (parameters instanceof Array) {
                        for (var p = 0; p < parameters.length; ++p) {
                            if (parameters[p][0] == name) {
                                if (value === undefined) {
                                    parameters.splice(p, 1);
                                } else {
                                    parameters[p][1] = value;
                                    value = undefined;
                                }
                            }
                        }
                        if (value !== undefined) {
                            parameters.push([name, value]);
                        }
                    } else {
                        parameters = OAuth.getParameterMap(parameters);
                        parameters[name] = value;
                        message.parameters = parameters;
                    }
                },
                setParameters: function setParameters(message, parameters) {
                    var list = OAuth.getParameterList(parameters);
                    for (var i = 0; i < list.length; ++i) {
                        OAuth.setParameter(message, list[i][0], list[i][1]);
                    }
                },
                /** Fill in parameters to help construct a request message.
                 This function doesn't fill in every parameter.
                 The accessor object should be like:
                 {consumerKey:'foo', consumerSecret:'bar', accessorSecret:'nurn', token:'krelm', tokenSecret:'blah'}
                 The accessorSecret property is optional.
                 */
                completeRequest: function completeRequest(message, accessor) {
                    if (message.method == null) {
                        message.method = "GET";
                    }
                    var map = OAuth.getParameterMap(message.parameters);
                    if (map.oauth_consumer_key == null) {
                        OAuth.setParameter(message, "oauth_consumer_key", accessor.consumerKey || "");
                    }
                    if (map.oauth_token == null && accessor.token != null) {
                        OAuth.setParameter(message, "oauth_token", accessor.token);
                    }
                    if (map.oauth_version == null) {
                        OAuth.setParameter(message, "oauth_version", "1.0");
                    }
                    if (map.oauth_timestamp == null) {
                        OAuth.setParameter(message, "oauth_timestamp", OAuth.timestamp());
                    }
                    if (map.oauth_nonce == null) {
                        OAuth.setParameter(message, "oauth_nonce", OAuth.nonce(6));
                    }
                    OAuth.SignatureMethod.sign(message, accessor);
                },
                setTimestampAndNonce: function setTimestampAndNonce(message) {
                    OAuth.setParameter(message, "oauth_timestamp", OAuth.timestamp());
                    OAuth.setParameter(message, "oauth_nonce", OAuth.nonce(6));
                },
                addToURL: function addToURL(url, parameters) {
                    newURL = url;
                    if (parameters != null) {
                        var toAdd = OAuth.formEncode(parameters);
                        if (toAdd.length > 0) {
                            var q = url.indexOf('?');
                            if (q < 0) newURL += '?';
                            else       newURL += '&';
                            newURL += toAdd;
                        }
                    }
                    return newURL;
                },
                /** Construct the value of the Authorization header for an HTTP request. */
                getAuthorizationHeader: function getAuthorizationHeader(realm, parameters) {
                    var header = 'OAuth realm="' + OAuth.percentEncode(realm) + '"';
                    var list = OAuth.getParameterList(parameters);
                    for (var p = 0; p < list.length; ++p) {
                        var parameter = list[p];
                        var name = parameter[0];
                        if (name.indexOf("oauth_") == 0) {
                            header += ',' + OAuth.percentEncode(name) + '="' + OAuth.percentEncode(parameter[1]) + '"';
                        }
                    }
                    return header;
                },
                /** Generate timestamps starting with the given value. */
                correctTimestamp: function correctTimestamp(timestamp) {
                    OAuth.timeCorrectionMsec = (timestamp * 1000) - (new Date()).getTime();
                },
                /** The difference between the correct time and my clock. */
                timeCorrectionMsec: 0,
                timestamp: function timestamp() {
                    var t = (new Date()).getTime() + OAuth.timeCorrectionMsec;
                    return Math.floor(t / 1000);
                },
                nonce: function nonce(length) {
                    var chars = OAuth.nonce.CHARS;
                    var result = "";
                    for (var i = 0; i < length; ++i) {
                        var rnum = Math.floor(Math.random() * chars.length);
                        result += chars.substring(rnum, rnum + 1);
                    }
                    return result;
                }
            });

        OAuth.nonce.CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

        /** Define a constructor function,
         without causing trouble to anyone who was using it as a namespace.
         That is, if parent[name] already existed and had properties,
         copy those properties into the new constructor.
         */
        OAuth.declareClass = function declareClass(parent, name, newConstructor) {
            var previous = parent[name];
            parent[name] = newConstructor;
            if (newConstructor != null && previous != null) {
                for (var key in previous) {
                    if (key != "prototype") {
                        newConstructor[key] = previous[key];
                    }
                }
            }
            return newConstructor;
        };

        /** An abstract algorithm for signing messages. */
        OAuth.declareClass(OAuth, "SignatureMethod", function OAuthSignatureMethod() {});

        OAuth.setProperties(OAuth.SignatureMethod.prototype, // instance members
            {
                /** Add a signature to the message. */
                sign: function sign(message) {
                    var baseString = OAuth.SignatureMethod.getBaseString(message);
                    var signature = this.getSignature(baseString);
                    OAuth.setParameter(message, "oauth_signature", signature);
                    return signature; // just in case someone's interested
                },
                /** Set the key string for signing. */
                initialize: function initialize(name, accessor) {
                    var consumerSecret;
                    if (accessor.accessorSecret != null
                        && name.length > 9
                        && name.substring(name.length - 9) == "-Accessor") {
                        consumerSecret = accessor.accessorSecret;
                    } else {
                        consumerSecret = accessor.consumerSecret;
                    }
                    this.key = OAuth.percentEncode(consumerSecret)
                        + "&" + OAuth.percentEncode(accessor.tokenSecret);
                }
            });

        /* SignatureMethod expects an accessor object to be like this:
         {tokenSecret: "lakjsdflkj...", consumerSecret: "QOUEWRI..", accessorSecret: "xcmvzc..."}
         The accessorSecret property is optional.
         */
        // Class members:
        OAuth.setProperties(OAuth.SignatureMethod, // class members
            {
                sign: function sign(message, accessor) {
                    var name = OAuth.getParameterMap(message.parameters).oauth_signature_method;
                    if (name == null || name == "") {
                        name = "HMAC-SHA1";
                        OAuth.setParameter(message, "oauth_signature_method", name);
                    }
                    OAuth.SignatureMethod.newMethod(name, accessor).sign(message);
                },
                /** Instantiate a SignatureMethod for the given method name. */
                newMethod: function newMethod(name, accessor) {
                    var impl = OAuth.SignatureMethod.REGISTERED[name];
                    if (impl != null) {
                        var method = new impl();
                        method.initialize(name, accessor);
                        return method;
                    }
                    var err = new Error("signature_method_rejected");
                    var acceptable = "";
                    for (var r in OAuth.SignatureMethod.REGISTERED) {
                        if (acceptable != "") acceptable += '&';
                        acceptable += OAuth.percentEncode(r);
                    }
                    err.oauth_acceptable_signature_methods = acceptable;
                    throw err;
                },
                /** A map from signature method name to constructor. */
                REGISTERED: {},
                /** Subsequently, the given constructor will be used for the named methods.
                 The constructor will be called with no parameters.
                 The resulting object should usually implement getSignature(baseString).
                 You can easily define such a constructor by calling makeSubclass, below.
                 */
                registerMethodClass: function registerMethodClass(names, classConstructor) {
                    for (var n = 0; n < names.length; ++n) {
                        OAuth.SignatureMethod.REGISTERED[names[n]] = classConstructor;
                    }
                },
                /** Create a subclass of OAuth.SignatureMethod, with the given getSignature function. */
                makeSubclass: function makeSubclass(getSignatureFunction) {
                    var superClass = OAuth.SignatureMethod;
                    var subClass = function () {
                        superClass.call(this);
                    };
                    subClass.prototype = new superClass();
                    // Delete instance variables from prototype:
                    // delete subclass.prototype... There aren't any.
                    subClass.prototype.getSignature = getSignatureFunction;
                    subClass.prototype.constructor = subClass;
                    return subClass;
                },
                getBaseString: function getBaseString(message) {
                    var URL = message.action;
                    var q = URL.indexOf('?');
                    var parameters;
                    if (q < 0) {
                        parameters = message.parameters;
                    } else {
                        // Combine the URL query string with the other parameters:
                        parameters = OAuth.decodeForm(URL.substring(q + 1));
                        var toAdd = OAuth.getParameterList(message.parameters);
                        for (var a = 0; a < toAdd.length; ++a) {
                            parameters.push(toAdd[a]);
                        }
                    }
                    return OAuth.percentEncode(message.method.toUpperCase())
                        + '&' + OAuth.percentEncode(OAuth.SignatureMethod.normalizeUrl(URL))
                        + '&' + OAuth.percentEncode(OAuth.SignatureMethod.normalizeParameters(parameters));
                },
                normalizeUrl: function normalizeUrl(url) {
                    var uri = OAuth.SignatureMethod.parseUri(url);
                    var scheme = uri.protocol.toLowerCase();
                    var authority = uri.authority.toLowerCase();
                    var dropPort = (scheme == "http" && uri.port == 80)
                        || (scheme == "https" && uri.port == 443);
                    if (dropPort) {
                        // find the last : in the authority
                        var index = authority.lastIndexOf(":");
                        if (index >= 0) {
                            authority = authority.substring(0, index);
                        }
                    }
                    var path = uri.path;
                    if (!path) {
                        path = "/"; // conforms to RFC 2616 section 3.2.2
                    }
                    // we know that there is no query and no fragment here.
                    return scheme + "://" + authority + path;
                },
                parseUri: function parseUri(str) {
                    /* This function was adapted from parseUri 1.2.1
                     http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
                     */
                    var o = {
                        key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
                        parser: {
                            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/
                        }
                    };
                    var m = o.parser.strict.exec(str);
                    var uri = {};
                    var i = 14;
                    while (i--) uri[o.key[i]] = m[i] || "";
                    return uri;
                },
                normalizeParameters: function normalizeParameters(parameters) {
                    if (parameters == null) {
                        return "";
                    }
                    var list = OAuth.getParameterList(parameters);
                    var sortable = [];
                    for (var p = 0; p < list.length; ++p) {
                        var nvp = list[p];
                        if (nvp[0] != "oauth_signature") {
                            sortable.push([ OAuth.percentEncode(nvp[0])
                                + " " // because it comes before any character that can appear in a percentEncoded string.
                                + OAuth.percentEncode(nvp[1])
                                , nvp]);
                        }
                    }
                    sortable.sort(function (a, b) {
                        if (a[0] < b[0]) return  -1;
                        if (a[0] > b[0]) return 1;
                        return 0;
                    });
                    var sorted = [];
                    for (var s = 0; s < sortable.length; ++s) {
                        sorted.push(sortable[s][1]);
                    }
                    return OAuth.formEncode(sorted);
                }
            });

        OAuth.SignatureMethod.registerMethodClass(["PLAINTEXT", "PLAINTEXT-Accessor"],
            OAuth.SignatureMethod.makeSubclass(
                function getSignature(baseString) {
                    return this.key;
                }
            ));

        OAuth.SignatureMethod.registerMethodClass(["HMAC-SHA1", "HMAC-SHA1-Accessor"],
            OAuth.SignatureMethod.makeSubclass(
                function getSignature(baseString) {
                    b64pad = '=';
                    var signature = b64_hmac_sha1(this.key, baseString);
                    return signature;
                }
            ));

        /**
         * @preserve
         * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
         * in FIPS PUB 180-1
         * Version 2.1a Copyright Paul Johnston 2000 - 2002.
         * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
         * Distributed under the BSD License
         * See http://pajhome.org.uk/crypt/md5 for details.
         */

        /*
         * Configurable variables. You may need to tweak these to be compatible with
         * the server-side, but the defaults work in most cases.
         */
        var b64pad = "";
        /* base-64 pad character. "=" for strict RFC compliance   */
        var chrsz = 8;
        /* bits per input character. 8 - ASCII; 16 - Unicode      */

        /*
         * These are the functions you'll usually want to call
         * They take string arguments and return either hex or base-64 encoded strings
         */
        function b64_hmac_sha1(key, data) { return binb2b64(core_hmac_sha1(key, data));}

        /*
         * Calculate the SHA-1 of an array of big-endian words, and a bit length
         */
        function core_sha1(x, len) {
            /* append padding */
            x[len >> 5] |= 0x80 << (24 - len % 32);
            x[((len + 64 >> 9) << 4) + 15] = len;

            var w = Array(80);
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            var e = -1009589776;

            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;
                var olde = e;

                for (var j = 0; j < 80; j++) {
                    if (j < 16) w[j] = x[i + j];
                    else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                    var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
                        safe_add(safe_add(e, w[j]), sha1_kt(j)));
                    e = d;
                    d = c;
                    c = rol(b, 30);
                    b = a;
                    a = t;
                }

                a = safe_add(a, olda);
                b = safe_add(b, oldb);
                c = safe_add(c, oldc);
                d = safe_add(d, oldd);
                e = safe_add(e, olde);
            }
            return Array(a, b, c, d, e);

        }

        /*
         * Perform the appropriate triplet combination function for the current
         * iteration
         */
        function sha1_ft(t, b, c, d) {
            if (t < 20) return (b & c) | ((~b) & d);
            if (t < 40) return b ^ c ^ d;
            if (t < 60) return (b & c) | (b & d) | (c & d);
            return b ^ c ^ d;
        }

        /*
         * Determine the appropriate additive constant for the current iteration
         */
        function sha1_kt(t) {
            return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 :
                (t < 60) ? -1894007588 : -899497514;
        }

        /*
         * Calculate the HMAC-SHA1 of a key and some data
         */
        function core_hmac_sha1(key, data) {
            var bkey = str2binb(key);
            if (bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);

            var ipad = Array(16), opad = Array(16);
            for (var i = 0; i < 16; i++) {
                ipad[i] = bkey[i] ^ 0x36363636;
                opad[i] = bkey[i] ^ 0x5C5C5C5C;
            }

            var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
            return core_sha1(opad.concat(hash), 512 + 160);
        }

        /*
         * Add integers, wrapping at 2^32. This uses 16-bit operations internally
         * to work around bugs in some JS interpreters.
         */
        function safe_add(x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }

        /*
         * Bitwise rotate a 32-bit number to the left.
         */
        function rol(num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        }

        /*
         * Convert an 8-bit or 16-bit string to an array of big-endian words
         * In 8-bit function, characters >255 have their hi-byte silently ignored.
         */
        function str2binb(str) {
            var bin = Array();
            var mask = (1 << chrsz) - 1;
            for (var i = 0; i < str.length * chrsz; i += chrsz)
                bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i % 32);
            return bin;
        }

        /*
         * Convert an array of big-endian words to a base-64 string
         */
        function binb2b64(binarray) {
            var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var str = "";
            for (var i = 0; i < binarray.length * 4; i += 3) {
                var triplet = (((binarray[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16)
                    | (((binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8 )
                    | ((binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF);
                for (var j = 0; j < 4; j++) {
                    if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
                    else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
                }
            }
            return str;
        }

        function ACSSession(key, secret, baseURL) {
            if (!secret) {
                this.appKey = key;
            } else {
                this.oauthKey = key;
                this.oauthSecret = secret;
            }
            if (baseURL) {
                this.apiBaseURL = baseURL;
            } else {
                this.apiBaseURL = com.acs.sdk.url.baseURL;
            }
            return this;
        }

        ACSSession.prototype.sendRequest = function (url, method, data, useSecure, callback) {
            var authType = com.acs.js.sdk.utils.getAuthType(this);
            if (authType == com.acs.constants.unknown) {
                callback(com.acs.constants.noAppKeyError);
                return;
            }

            //build request url
            var reqURL = '';
            if (useSecure) {
                reqURL += com.acs.sdk.url.https;
            } else {
                reqURL += com.acs.sdk.url.http;
            }
            reqURL += this.apiBaseURL + "/" + com.acs.sdk.url.version + "/" + url;

            if (authType == com.acs.constants.app_key) {
                reqURL += com.acs.constants.keyParam + this.appKey;
            }

            if (!data)
                data = {};

            var apiMethod = method ? method.toUpperCase() : com.acs.constants.get_method;

            data[com.acs.constants.suppressCode] = 'true';
            var sessionId = com.acs.js.sdk.utils.retrieveSessionId();
            if (sessionId) {
                reqURL += formatParam(reqURL, com.acs.constants.sessionId, sessionId);
            }

            injectAnalytics(data, url);
            data = com.acs.js.sdk.utils.cleanInvalidData(data);

            var fileInputObj = com.acs.js.sdk.utils.getFileObject(data);
            if (fileInputObj) {
                //send request with file
                try {
                    var binary;
                    if (fileInputObj.toString().match(/TiFilesystemFile/)) {
                        binary = fileInputObj.read();
                    } else {
                        binary = fileInputObj;
                    }

                    if (!binary) {
                        callback(com.acs.constants.fileLoadError);
                        return;
                    }

                    if (data[com.acs.constants.file]) {
                        delete data[com.acs.constants.file];
                        data[com.acs.constants.file] = binary;
                    } else if (data[com.acs.constants.photo]) {
                        delete data[com.acs.constants.photo];
                        data[com.acs.constants.photo] = binary;
                    }
                } catch (e) {
                    callback(com.acs.constants.fileLoadError);
                    return;
                }
                var header = {};
                if (authType == com.acs.constants.oauth) {
                    reqURL += formatParam(reqURL, com.acs.constants.oauth_consumer_key, this.oauthKey);

                    var message = {
                        method: apiMethod,
                        action: reqURL,
                        parameters: []
                    };
                    com.acs.js.sdk.utils.populateOAuthParameters(message.parameters, this.oauthKey);
                    OAuth.completeRequest(message, {consumerSecret: this.oauthSecret});
                    header['Authorization'] = OAuth.getAuthorizationHeader("", message.parameters);
                }
                //send request
                com.acs.js.sdk.utils.sendAppceleratorRequest(reqURL, apiMethod, data, header, callback);
            } else {
                //send request without file
                var header = {};
                if (authType == com.acs.constants.oauth) {
                    reqURL += formatParam(reqURL, com.acs.constants.oauth_consumer_key, this.oauthKey);

                    var message = {
                        method: apiMethod,
                        action: reqURL,
                        parameters: []
                    };
                    for (var prop in data) {
                        if (!data.hasOwnProperty(prop)) {
                            continue;
                        }
                        message.parameters.push([prop, data[prop]]);
                    }
                    com.acs.js.sdk.utils.populateOAuthParameters(message.parameters, this.oauthKey);
                    OAuth.completeRequest(message, {consumerSecret: this.oauthSecret});
                    header['Authorization'] = OAuth.getAuthorizationHeader("", message.parameters);
                }
                com.acs.js.sdk.utils.sendAppceleratorRequest(reqURL, apiMethod, data, header, callback);
            }
        };
        var com = {};
        com.acs = {};
        com.acs.constants = {};
        com.acs.js = {};
        com.acs.js.sdk = {};
        com.acs.js.sdk.utils = {};

        com.acs.sdk = {};
        com.acs.sdk.url = {};//REST APIs

        //Protocols
        com.acs.sdk.url.http = 'http://';
        com.acs.sdk.url.https = 'https://';

        //URL
        com.acs.sdk.url.baseURL = 'api.cloud.appcelerator.com';
        com.acs.sdk.url.version = 'v1';

        //Authentication Types
        com.acs.constants.app_key = 1;
        com.acs.constants.oauth = 2;
        com.acs.constants.unknown = -1;

        //Others
        com.acs.constants.keyParam = '?key=';
        com.acs.constants.file = 'file';
        com.acs.constants.photo = 'photo';
        com.acs.constants.suppressCode = 'suppress_response_codes';
        com.acs.constants.sessionId = '_session_id';
        com.acs.constants.oauth_consumer_key = 'oauth_consumer_key';
        com.acs.constants.noAppKeyError = {'meta': {'status': 'fail', 'code': 409, 'message': 'Application key is not provided.'}};
        com.acs.constants.fileLoadError = {'meta': {'status': 'fail', 'code': 400, 'message': 'Unable to load file'}};

        //SessionId
        com.acs.js.sdk.utils.sessionId = null;
        com.acs.js.sdk.utils.retrieveSessionId = function () {
            // have we initialized the store yet?
            if (com.acs.js.sdk.utils.sessionId === null) {
                com.acs.js.sdk.utils.sessionId = Ti.App.Properties.getString('ACS-StoredSessionId');
            }
            // have we retrieved it before?
            if (com.acs.js.sdk.utils.sessionId && (com.acs.js.sdk.utils.sessionId != 'undefined')) {
                return com.acs.js.sdk.utils.sessionId;
            }
            // otherwise, return null
            return null;
        };
        com.acs.js.sdk.utils.storeSessionId = function (sessionId) {
            // did we get a valid argument?
            if (!sessionId)
                return;
            // save our results temporarily...
            com.acs.js.sdk.utils.sessionId = sessionId;
            // ... and long term!
            Ti.App.Properties.setString('ACS-StoredSessionId', sessionId);
        };

        com.acs.js.sdk.utils.clearSessionId = function () {
            com.acs.js.sdk.utils.sessionId = false;
            Ti.App.Properties.setString('ACS-StoredSessionId', '');
        };

        com.acs.js.sdk.utils.getAuthType = function (obj) {
            if (obj) {
                if (obj.appKey) {
                    return com.acs.constants.app_key;
                } else if (obj.oauthKey && obj.oauthSecret) {
                    return com.acs.constants.oauth;
                }
            }
            return com.acs.constants.unknown;
        };

        com.acs.js.sdk.utils.getFileObject = function (data) {
            if (data) {
                for (var prop in data) {
                    if (!data.hasOwnProperty(prop)) {
                        continue;
                    }
                    if (prop == com.acs.constants.photo || prop == com.acs.constants.file) {
                        return data[prop];
                    }
                }
            }
            return null;
        };

        com.acs.js.sdk.utils.cleanInvalidData = function (data) {
            if (data) {
                for (var prop in data) {
                    if (!data.hasOwnProperty(prop)) {
                        continue;
                    }
                    if (data[prop] == null) {
                        delete data[prop];
                    }
                    // Check that we haven't received a blob or file.
                    if (typeof(data[prop]) == 'object') {
                        var stringified = JSON.stringify(data[prop]);
                        // Check if we've received a blob on iOS.
                        if (stringified == '{}') {
                            continue;
                        }
                        // Check if we've received a file.
                        if (data[prop].nativePath) {
                            continue;
                        }
                        // Otherwise, carry on with the stringification!
                        data[prop] = stringified;
                    }
                    // If we receive a boolean, convert it to the equivalent integer. This helps Oauth behave itself.
                    if (data[prop] === true || data[prop] === false) {
                        data[prop] = data[prop] ? 1 : 0;
                    }
                }
                return data;
            } else {
                return {};
            }
        };

        com.acs.js.sdk.utils.uploadMessageCallback = function (event) {
            if (event && event.data) {
                return JSON.parse(event.data);
            } else {
                return {};
            }
        };

        com.acs.js.sdk.utils.getOAuthParameters = function (parameters) {
            var urlParameters = '';
            if (parameters) {
                var list = OAuth.getParameterList(parameters);
                for (var p = 0; p < list.length; ++p) {
                    var parameter = list[p];
                    var name = parameter[0];
                    if (name.indexOf("oauth_") == 0 && name != "oauth_token") {
                        urlParameters += '&' + OAuth.percentEncode(name) + '=' + OAuth.percentEncode(parameter[1]);
                    }
                }
            }
            if (urlParameters.length > 0) {
                urlParameters = urlParameters.substring(1);
            }
            return urlParameters;
        };

        com.acs.js.sdk.utils.populateOAuthParameters = function (parameters, oauthKey) {
            if (parameters && oauthKey) {
                parameters.push(["oauth_version", "1.0"]);
                parameters.push(["oauth_consumer_key", oauthKey]);
                parameters.push(["oauth_signature_method", "HMAC-SHA1"]);
                parameters.push(["oauth_nonce", OAuth.nonce(15)]);
            }
        };

        // http://blog.stevenlevithan.com/archives/faster-trim-javascript
        function trim12(str) {
            if (!str || str.length <= 0)
                return false;
            var str = str.replace(/^\s\s*/, ''),
                ws = /\s/,
                i = str.length;
            while (ws.test(str.charAt(--i))) {}
            return str.slice(0, i + 1);
        }

        function formatParam(url, name, value) {
            var sep = (url.indexOf("?") != -1) ? "&" : "?";
            return sep + name + "=" + value;
        }

        com.acs.js.sdk.utils.sendAppceleratorRequest = function (url, method, data, header, callback) {
            var xhr = Ti.Network.createHTTPClient({
                timeout: 60 * 1000,
                onsendstream: function (e) {
                    Cloud.onsendstream && Cloud.onsendstream({
                        url: url,
                        progress: e.progress
                    });
                },
                ondatastream: function (e) {
                    Cloud.ondatastream && Cloud.ondatastream({
                        url: url,
                        progress: e.progress
                    });
                },
                onerror: function (e) {
                    var retVal = {};
                    var json = this.responseText;
                    try {
                        json = trim12(json);
                        if (json && json.length > 0) {
                            retVal = JSON.parse(json);
                        }
                    } catch (err) {
                        retVal = err;
                    }
                    retVal.message || (retVal.message = e.error);
                    retVal.error = true;
                    retVal.statusText = this.statusText;
                    retVal.status = this.status;
                    if (retVal.meta) {
                        retVal.metaString = JSON.stringify(retVal.meta);
                    }
                    callback(retVal);
                },
                onload: function () {
                    var json = this.responseText;
                    var data = JSON.parse(json);
                    if (data && data.meta) {
                        data.metaString = JSON.stringify(data.meta);
                        com.acs.js.sdk.utils.storeSessionId(data.meta.session_id);
                    }
                    callback(data);
                }
            });

            // for GET request only
            var requestURL = url;
            switch (method.toUpperCase()) {
                case 'DELETE':
                case 'GET':
                    var params = '';
                    for (var prop in data) {
                        if (!data.hasOwnProperty(prop)) {
                            continue;
                        }
                        params += '&' + prop + '=' + OAuth.percentEncode(data[prop]);
                    }
                    if (params.length > 0) {
                        if (url.indexOf('?') > 0) {
                            requestURL += params;
                        } else {
                            requestURL += '?' + params.substring(1);
                        }
                        data = {};
                    }
                    break;
            }

            if (Cloud.debug) {
                Ti.API.info(method + ': ' + requestURL);
                Ti.API.info('header: ' + JSON.stringify(header));
                Ti.API.info('data: ' + JSON.stringify(data));
            }

            // open the client
            xhr.open(method, requestURL);

            // set headers
            xhr.setRequestHeader('Accept-Encoding', 'gzip,deflate');
            if (header) {
                for (var prop in header) {
                    if (!header.hasOwnProperty(prop)) {
                        continue;
                    }
                    xhr.setRequestHeader(prop, header[prop]);
                }
            }

            // send the data
            xhr.send(data);
        };
        
        function fetchSetting(key, def) {
            var value;
            var deployType = Ti.App.deployType.toLowerCase() == 'production' ? 'production' : 'development';
            if ((value = Ti.App.Properties.getString(key + '-' + deployType)) && value != 'undefined') {
                return value;
            }
            if ((value = Ti.App.Properties.getString(key)) && value != 'undefined') {
                return value;
            }
            return def;
        }

        function fetchSession() {
            var apiKey = fetchSetting('acs-api-key', null);
            var baseURL = fetchSetting('acs-base-url', 'api.cloud.appcelerator.com');
            var consumerKey = fetchSetting('acs-oauth-key', null);
            var consumerSecret = fetchSetting('acs-oauth-secret', null);
            if (consumerKey && consumerSecret) {
                return new ACSSession(consumerKey, consumerSecret, baseURL);
            }
            if (apiKey) {
                return new ACSSession(apiKey, null, baseURL);
            }

            throw 'ACS CREDENTIALS NOT SPECIFIED!';
        }

        var session = null;
        ACS.send = function (url, method, data, useSecure, callback) {
            if (session == null) {
                session = fetchSession();
            }
            session.sendRequest(url, method, data, useSecure, callback);
        };
        
        ACS.hasStoredSession = function() {
            return !!(com.acs.js.sdk.utils.retrieveSessionId());
        };
        
        ACS.retrieveStoredSession = function() {
            return com.acs.js.sdk.utils.retrieveSessionId();
        };

        ACS.reset = function () {
            com.acs.js.sdk.utils.clearSessionId();
            session = null;
        };

        return ACS;
    }