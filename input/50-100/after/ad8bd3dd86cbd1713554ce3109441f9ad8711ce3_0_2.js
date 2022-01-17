function returnType (type, body, res) {
                     switch (type) {
                            case 'head':
                                 return res.headers||{};
                            case 'json':
                                 try {
                                    return JSON.parse(body);
                                  } catch (e) {
                                    return false;
                                 }
                            case 'xml':
                                 try {
                                    var parser = require('xml2json');
                                    return JSON.parse(parser.toJson(body));
                                  } catch (e) {
                                    return false;
                                 }
                            default:
                                 return body;
                     }
            }