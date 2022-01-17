function returnType (type, body) {
                     switch (type.toLowerCase()) {
                            case 'jsdom':
                                 var jsdom = require("jsdom")
                                 var _jsdom = new jsdom.jsdom(body,null,{features:{QuerySelector: true}});
                                 return _jsdom.createWindow();
                            case 'json':
                                 return JSON.parse(body);
                            case 'xml':
                                 var parser = require('xml2json');
                                 return JSON.parse(parser.toJson(body));
                            default:
                                 return body;
                     }
            }