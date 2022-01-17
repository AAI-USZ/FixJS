function () {
    it("parses standard elements in a config.xml", function () {
        configParser.parse(configPath, session, function (configObj) {
            expect(configObj.content).toEqual("local:///startPage.html");
            expect(configObj.id).toEqual("My WidgetId");
            expect(configObj.version).toEqual("1.0.0");
            expect(configObj.license).toEqual("My License");
            expect(configObj.licenseURL).toEqual("http://www.apache.org/licenses/LICENSE-2.0");
            expect(configObj.icon).toEqual(["test.png"]);
            expect(configObj.configXML).toEqual("config.xml");
            expect(configObj.author).toEqual("Research In Motion Ltd.");
            expect(configObj.authorURL).toEqual("http://www.rim.com/");
            expect(configObj.copyright).toEqual("No Copyright");
            expect(configObj.authorEmail).toEqual("author@rim.com");
            expect(configObj.name).toEqual("Demo");
            expect(configObj.description).toEqual("This app does everything.");
            expect(configObj.permissions).toContain('access_shared');
            expect(configObj.permissions).toContain('read_geolocation');
            expect(configObj.permissions).toContain('use_camera');
        });
    });
    
    it("parses Feature elements in a config.xml", function () {
        var localAccessList,
            accessListFeature;

        configParser.parse(configPath, session, function (configObj) {
            //validate WIDGET_LOCAL accessList
            localAccessList = testUtilities.getAccessListForUri(configObj.accessList, "WIDGET_LOCAL");
            expect(localAccessList).toBeDefined();
            expect(localAccessList.uri).toEqual("WIDGET_LOCAL");
            expect(localAccessList.allowSubDomain).toEqual(true);
            
            //validate WIDGET_LOCAL feature [blackberry.app]
            accessListFeature = testUtilities.getFeatureByID(localAccessList.features, "blackberry.app");
            expect(accessListFeature).toBeDefined();
            expect(accessListFeature.id).toEqual("blackberry.app");
            expect(accessListFeature.required).toEqual(true);
            expect(accessListFeature.version).toEqual("1.0.0.0");
            
            //validate WIDGET_LOCAL feature [blackberry.system]
            accessListFeature = testUtilities.getFeatureByID(localAccessList.features, "blackberry.system");
            expect(accessListFeature).toBeDefined();
            expect(accessListFeature.id).toEqual("blackberry.system");
            expect(accessListFeature.required).toEqual(true);
            expect(accessListFeature.version).toEqual("1.0.0.3");
        });
    });
    
    it("parses Access elements a config.xml", function () {
        var customAccessList,
            accessListFeature;

        configParser.parse(configPath, session, function (configObj) {
            //validate http://www.somedomain1.com accessList
            customAccessList = testUtilities.getAccessListForUri(configObj.accessList, "http://www.somedomain1.com");
            expect(customAccessList).toBeDefined();
            expect(customAccessList.uri).toEqual("http://www.somedomain1.com");
            expect(customAccessList.allowSubDomain).toEqual(true);
            
            //validate http://www.somedomain1.com feature [blackberry.app]
            accessListFeature = testUtilities.getFeatureByID(customAccessList.features, "blackberry.app");
            expect(accessListFeature).toBeDefined();
            expect(accessListFeature.id).toEqual("blackberry.app");
            expect(accessListFeature.required).toEqual(true);
            expect(accessListFeature.version).toEqual("1.0.0.0");
            
            //validate http://www.somedomain1.com feature [blackberry.app.event]
            accessListFeature = testUtilities.getFeatureByID(customAccessList.features, "blackberry.app.event");
            expect(accessListFeature).toBeDefined();
            expect(accessListFeature.id).toEqual("blackberry.app.event");
            expect(accessListFeature.required).toEqual(false);
            expect(accessListFeature.version).toEqual("2.0.0.0");
        });
    });

    it("parses a bare minimum config.xml without error", function () {
        var bareMinimumConfigPath = path.resolve("test/config-bare-minimum.xml");

        configParser.parse(bareMinimumConfigPath, session, function (configObj) {
            expect(configObj.content).toEqual("local:///startPage.html");
            expect(configObj.version).toEqual("1.0.0");
        });
    });

    it("license url is set even if license body is empty", function () {
        var licenseConfigPath = path.resolve("test/config-license.xml");

        configParser.parse(licenseConfigPath, session, function (configObj) {
            expect(configObj.license).toEqual("");
            expect(configObj.licenseURL).toEqual("http://www.apache.org/licenses/LICENSE-2.0");
        });
    });
    
    it("fails when id is undefined", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data["@"].id = undefined;
        
        mockParsing(data);
        
        //Should throw an EXCEPTION_INVALID_ID error
        expect(function () {
            configParser.parse(configPath, session, {});
        }).toThrow(localize.translate("EXCEPTION_INVALID_ID"));
    });
    
    it("fails when id begins with a number", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data["@"].id = "1abcdefghijk";
        
        mockParsing(data);
        
        //Should throw an EXCEPTION_INVALID_ID error
        expect(function () {
            configParser.parse(configPath, session, {});
        }).toThrow(localize.translate("EXCEPTION_INVALID_ID"));
    });
    
    it("fails when id contains a non [a-zA-Z0-9] character", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data["@"].id = "abcde#fghijk";
        
        mockParsing(data);
        
        //Should throw an EXCEPTION_INVALID_ID error
        expect(function () {
            configParser.parse(configPath, session, {});
        }).toThrow(localize.translate("EXCEPTION_INVALID_ID"));
    });

    it("fails when id starts with a space", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data["@"].id = " abcdefghijk";
        
        mockParsing(data);
        
        //Should throw an EXCEPTION_INVALID_ID error
        expect(function () {
            configParser.parse(configPath, session, {});
        }).toThrow(localize.translate("EXCEPTION_INVALID_ID"));
    });

    it("fails when id ends with a space", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data["@"].id = "abcdefghijk ";
        
        mockParsing(data);
        
        //Should throw an EXCEPTION_INVALID_ID error
        expect(function () {
            configParser.parse(configPath, session, {});
        }).toThrow(localize.translate("EXCEPTION_INVALID_ID"));
    });

    it("Fails when missing content error is not shown", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data.content = "";
        mockParsing(data);
        
        expect(function () {
            configParser.parse(configPath, session, {});
        }).toThrow(localize.translate("EXCEPTION_INVALID_CONTENT"));
    });
    
    it("Fails when missing feature error is not shown", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data.feature = {}; 
        mockParsing(data);

        expect(function () {
            configParser.parse(configPath, session, {});
        }).toThrow(localize.translate("EXCEPTION_INVALID_FEATURE_ID"));
    });

    
    it("adds local:/// protocol to urls", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data.content["@"].src = "localFile.html";
        
        mockParsing(data);
        
        configParser.parse(configPath, session, function (configObj) {
            expect(configObj.content).toEqual("local:///localFile.html");
        });
    });
    
    it("cleans source folder on error", function () {
        mockParsing({}, "ERROR");

        spyOn(logger, "error");
        spyOn(fileManager, "cleanSource");

        configParser.parse(configPath, session, function () {});
        
        expect(fileManager.cleanSource).toHaveBeenCalled();
    });
    
    it("adds the access_internet permission if unprovided", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data['rim:permit'] = [];
        
        mockParsing(data);
        
        configParser.parse(configPath, session, function (configObj) {
            //access_internet permission was set
            expect(configObj.permissions).toContain('access_internet');
        });
    });
    
    it("does not add unwanted local features to custom access rules", function () {
        var customAccessList,
            data = testUtilities.cloneObj(testData.xml2jsConfig);
        
        //Add a local feature element and a custom access list
        data['feature'] = {'@': {id: 'blackberry.app', required: 'true', version: '1.0.0.0'}};//local feature
        data['access'] = {'@': {uri: 'http://ci0000000094448.rim.net', subdomains: 'true'}};//custom access rule
        
        mockParsing(data);

        configParser.parse(configPath, session, function (configObj) {
            customAccessList = testUtilities.getAccessListForUri(configObj.accessList, 'http://ci0000000094448.rim.net');
            
            //The custom access list features should only contain global features
            expect(customAccessList.features).toEqual(configParser.getGlobalFeatures());
        });
    });
        
    it("does not throw an exception with empty permit tags", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data['rim:permit'] = ['read_geolocation', {}, 'access_internet' ];
        
        mockParsing(data);
        
        expect(function () {
            configParser.parse(configPath, session, function (configObj) {});
        }).not.toThrow();
    });

    it("multi access should be false if no access", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);

        mockParsing(data);

        configParser.parse(configPath, session, function (configObj) {
            //hasMultiAccess was set to false
            expect(configObj.hasMultiAccess).toEqual(false);
            expect(configObj.accessList).toEqual([ {
                features : configParser.getGlobalFeatures(),
                uri : 'WIDGET_LOCAL',
                allowSubDomain : true
            } ]);
        });
    });

    it("multi access should be false if no uri is equal to *", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data['access'] = {"@" : {"uri" : "http://www.somedomain1.com"}};

        mockParsing(data);

        configParser.parse(configPath, session, function (configObj) {
            //hasMultiAccess was set to false
            expect(configObj.hasMultiAccess).toEqual(false);
            expect(configObj.accessList).toEqual([ {
                features : configParser.getGlobalFeatures(),
                uri : 'WIDGET_LOCAL',
                allowSubDomain : true
            }, {
                "features" : configParser.getGlobalFeatures(),
                "uri" : "http://www.somedomain1.com"
            } ]);
        });
    });

    it("multi access should be true with the uri being equal to *", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data['access'] = {"@" : {"uri" : "*"}};

        mockParsing(data);

        configParser.parse(configPath, session, function (configObj) {
            //hasMultiAccess was set to true
            expect(configObj.hasMultiAccess).toEqual(true);
            expect(configObj.accessList).toEqual([ {
                features : configParser.getGlobalFeatures(),
                uri : 'WIDGET_LOCAL',
                allowSubDomain : true
            } ]);
        });
    });

    it("multi access should be true with one uri being equal to *", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data['access'] = [{"@" : {"uri" : "*"}}, {"@" : {"uri" : "http://www.somedomain1.com"}}];

        mockParsing(data);

        configParser.parse(configPath, session, function (configObj) {
            //hasMultiAccess was set to true
            expect(configObj.hasMultiAccess).toEqual(true);
            expect(configObj.accessList).toEqual([ {
                features : configParser.getGlobalFeatures(),
                uri : 'WIDGET_LOCAL',
                allowSubDomain : true
            }, {
                "features" : configParser.getGlobalFeatures(),
                "uri" : "http://www.somedomain1.com"
            } ]);
        });
    });

    it("should fail when feature is defined with the uri being equal to *", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data['access'] = {"@" : {"uri" : "*"}, "feature" : {"@": {"id": "blackberry.app"}}};

        mockParsing(data);

        expect(function () {
            configParser.parse(configPath, session, function (configObj) {});
        }).toThrow(localize.translate("EXCEPTION_FEATURE_DEFINED_WITH_WILDCARD_ACCESS_URI"));
    });

    it("should fail when multi features are defined with the uri being equal to *", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data['access'] = {"@" : {"uri" : "*"}, "feature" : [{"@": {"id": "blackberry.app"}}, {"@": {"id": "blackberry.system"}}, {"@": {"id": "blackberry.invoke"}}]};

        mockParsing(data);

        expect(function () {
            configParser.parse(configPath, session, function (configObj) {});
        }).toThrow(localize.translate("EXCEPTION_FEATURE_DEFINED_WITH_WILDCARD_ACCESS_URI"));
    });

    it("should fail when the access uri attribute does not specify a protocol", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);

        //Add an access element with one feature
        data['access'] = {
            '@': {
                uri: 'rim.net',
                subdomains: 'true'
            },
            feature: {
                '@': { id: 'blackberry.system' }
            }
        };

        mockParsing(data);

        expect(function () {
            configParser.parse(configPath, session, function (configObj) {});
        }).toThrow(localize.translate("EXCEPTION_INVALID_ACCESS_URI_NO_PROTOCOL", data['access']['@'].uri));
    });

    it("should fail when the access uri attribute does not specify a URN", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);

        //Add an access element with one feature
        data['access'] = {
            '@': {
                uri: 'http://',
                subdomains: 'true'
            },
            feature: {
                '@': { id: 'blackberry.system' }
            }
        };

        mockParsing(data);

        expect(function () {
            configParser.parse(configPath, session, function (configObj) {});
        }).toThrow(localize.translate("EXCEPTION_INVALID_ACCESS_URI_NO_URN", data['access']['@'].uri));
    });

    it("does not fail when there is a single feature element in the access list", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        
        //Add an access element with one feature
        data['access'] = {
            '@': {
                uri: 'http://rim.net',
                subdomains: 'true'
            },
            feature: {
                '@': { id: 'blackberry.system' }
            }
        };
        
        mockParsing(data);
        
        expect(function () {
            configParser.parse(configPath, session, function (configObj) {});
        }).not.toThrow();
    });
    
    it("supports 4 digit version [build id]", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data["@"].version = "1.0.0.50";
        
        mockParsing(data);
        
        configParser.parse(configPath, session, function (configObj) {
            expect(configObj.version).toEqual("1.0.0");
            expect(configObj.buildId).toEqual("50");
        });
    });
    
    it("uses --buildId when set", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        
        //--buildId 100
        session.buildId = "100";
        
        mockParsing(data);
        
        configParser.parse(configPath, session, function (configObj) {
            expect(configObj.buildId).toEqual("100");
        });
    });
    
    it("overides the build id specified in version with --buildId flag", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data["@"].version = "1.0.0.50";
        
        //--buildId 100
        session.buildId = "100";
        
        mockParsing(data);
        
        configParser.parse(configPath, session, function (configObj) {
            expect(configObj.version).toEqual("1.0.0");
            expect(configObj.buildId).toEqual("100");
        });
    });
    
    it("throws a proper error when author tag is empty", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data.author = {};
        
        mockParsing(data);
        
        //Should throw an EXCEPTION_INVALID_AUTHOR error
        expect(function () {
            configParser.parse(configPath, session, {});
        }).toThrow(localize.translate("EXCEPTION_INVALID_AUTHOR"));
    });

    it("can parse a standard rim:invoke-target element", function () {

        configParser.parse(configPath, session, function (configObj) {
            var invokeTarget = configObj["invoke-target"][0];

            expect(invokeTarget).toBeDefined();
            expect(invokeTarget["@"]).toBeDefined();
            expect(invokeTarget["@"]["id"]).toBeDefined();
            expect(invokeTarget["@"]["id"]).toEqual("com.domain.subdomain.appname.app1");
            expect(invokeTarget.type).toBeDefined();
            expect(invokeTarget.type).toEqual("APPLICATION");
            expect(invokeTarget["require-source-permissions"]).toBeDefined();
            expect(invokeTarget["require-source-permissions"]).toEqual("invoke_accross_perimeters,access_shared");
            expect(invokeTarget.filter).toBeDefined();
            expect(invokeTarget.filter[0].action).toBeDefined();
            expect(invokeTarget.filter[0].action).toContain("bb.action.VIEW");
            expect(invokeTarget.filter[0].action).toContain("bb.action.SET");
            expect(invokeTarget.filter[0].action).toContain("bb.action.OPEN");
            expect(invokeTarget.filter[0]["mime-type"]).toBeDefined();
            expect(invokeTarget.filter[0]["mime-type"]).toContain("image/*");
            expect(invokeTarget.filter[0]["mime-type"]).toContain("text/*");
            expect(invokeTarget.filter[0].property).toBeDefined();

            invokeTarget.filter[0].property.forEach(function (property) {
                expect(property["@"]).toBeDefined();
                expect(property["@"]["var"]).toBeDefined();
                expect(property["@"]["var"]).toMatch("^(exts|uris)$");
                if (property["@"]["var"] === "uris") {
                    expect(property["@"]["value"]).toMatch("^(ftp|http|https):\/\/$");
                } else if (property["@"]["var"] === "exts") {
                    expect(property["@"]["value"]).toMatch("^(jpg|png|txt|doc)$");
                }
            });
        });
    });
    
    it("can parse multiple filters in one element", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data["rim:invoke-target"] = {
            "@": {
                "id": "com.domain.subdomain.appName.app"
            },
            "type": "application",
            "filter":  [{
                    "action":  "bb.action.OPEN",
                    "mime-type": ["text/*", "image/*"]
                }, {
                    "action": "bb.action.SET",
                    "mime-type": "image/*"
                }]
            };

        mockParsing(data);

        expect(function () {
            configParser.parse(configPath, session, function (configObj) {});
        }).not.toThrow();
    });

    it("can parse multiple invoke targets", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data["rim:invoke-target"] = [{
                "@": {
                    "id": "com.domain.subdomain.appName.app"
                },
                "type": "application",
            }, {
                "@": {
                    "id": "com.domain.subdomain.appName.viewer"
                },
                "type": "viewer"
            }];

        mockParsing(data);

        expect(function () {
            configParser.parse(configPath, session, function (configObj) {});
        }).not.toThrow();

    });

    it("throws an error when an invoke target doesn't specify an invocation id", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data["rim:invoke-target"] = {
            type: "APPLICATION"
        };

        mockParsing(data);

        expect(function () {
            configParser.parse(configPath, session, function (configObj) {});
        }).toThrow(localize.translate("EXCEPTION_INVOKE_TARGET_INVALID_ID"));
    });

    it("throws and error when an invoke target xml doesn't specify an invocation type", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data["rim:invoke-target"] = {
            "@": {
                "id": "com.domain.subdomain.appName.app"
            },
            type: {}
        };
        
        mockParsing(data);

        expect(function () {
            configParser.parse(configPath, session, function (configObj) {});
        }).toThrow(localize.translate("EXCEPTION_INVOKE_TARGET_INVALID_TYPE"));
    });

    it("throws an error when an invoke target doesn't specify an invocation type", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data["rim:invoke-target"] = {
            "@": {
                "id": "com.domain.subdomain.appName.app"
            }
        };

        mockParsing(data);

        expect(function () {
            configParser.parse(configPath, session, function (configObj) {});
        }).toThrow(localize.translate("EXCEPTION_INVOKE_TARGET_INVALID_TYPE"));
    });

    it("throws an error when an invoke target specifies an invalid invocation type", function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data["rim:invoke-target"] = {
            "@": {
                "id": "com.domain.subdomain.appName.app"
            },
            "type": "myInvokeType"
        };

        mockParsing(data);

        expect(function () {
            configParser.parse(configPath, session, function (configObj) {});
        }).toThrow(localize.translate("EXCEPTION_INVOKE_TARGET_INVALID_TYPE"));
    });

    it("throws an error when an invoke target filter doesn't contain an action",  function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data["rim:invoke-target"] = {
            "@": {
                "id": "com.domain.subdomain.appName.app"
            },
            "type": "APPLICATION",
            "filter": {
                "mime-type": "text/*",
                "property": [{
                    "@": {
                        "var": "uris",
                        "value": "https://"
                    }
                }, {
                    "@": {
                        "var": "exts",
                        "value": "html"
                    }
                }, {
                    "@": {
                        "var": "exts",
                        "value": "htm"
                    }
                }]
            }
        };

        mockParsing(data);

        expect(function () {
            configParser.parse(configPath, session, function (configObj) {});
        }).toThrow(localize.translate("EXCEPTION_INVOKE_TARGET_ACTION_INVALID"));
    });

    it("throws an error when a filter doesn't contain a mime-type",  function () {
        var data = testUtilities.cloneObj(testData.xml2jsConfig);
        data["rim:invoke-target"] = {
            "@": {
                "id": "com.domain.subdomain.appName.app"
            },
            "type": "application",
            "filter": {
                "action": "bb.action.OPEN",
                "property": [{
                    "@": {
                        "var": "uris",
                        "value": "https://"
                    }
                }, {
                    "@": {
                        "var": "exts",
                        "value": "html"
                    }
                }]
            }
        };

        mockParsing(data);

        expect(function () {
            configParser.parse(configPath, session, function (configObj) {});
        }).toThrow(localize.translate("EXCEPTION_INVOKE_TARGET_MIME_TYPE_INVALID"));
    });

    describe("splash screen", function () {
        it("throws error when rim:splash element does not contain src attribute", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["rim:splash"] = {};

            mockParsing(data);

            expect(function () {
                configParser.parse(configPath, session, function (configObj) {});
            }).toThrow(localize.translate("EXCEPTION_INVALID_SPLASH_SRC"));
        });

        it("throws error when rim:splash element contains empty src attribute", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["rim:splash"] = {
                "@": {
                    "src": ""
                }
            };

            mockParsing(data);

            expect(function () {
                configParser.parse(configPath, session, function (configObj) {});
            }).toThrow(localize.translate("EXCEPTION_INVALID_SPLASH_SRC"));
        });

        it("throws error when one of many rim:splash elements does not contain attribute", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["rim:splash"] = [{
                    "@": {
                        "src": "a.jpg"
                    }
                }, {
                    "#": "blah"
                }];

            mockParsing(data);

            expect(function () {
                configParser.parse(configPath, session, function (configObj) {});
            }).toThrow(localize.translate("EXCEPTION_INVALID_SPLASH_SRC"));
        });

        it("allow one rim:splash element that contains non-empty src attribute", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["rim:splash"] = {
                "@": {
                    "src": "a.jpg"
                }
            };

            mockParsing(data);

            expect(function () {
                configParser.parse(configPath, session, function (configObj) {});
            }).not.toThrow();
        });

        it("allow multiple rim:splash elements that contain non-empty src attribute", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["rim:splash"] = [{
                    "@": {
                        "src": "a.jpg"
                    }
                }, {
                    "@": {
                        "src": "b.jpg"
                    }
                }];

            mockParsing(data);

            expect(function () {
                configParser.parse(configPath, session, function (configObj) {});
            }).not.toThrow();
        });

        it("throws error when rim:splash src starts with 'locales' subfolder", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["rim:splash"] = [{
                    "@": {
                        "src": "a.jpg"
                    }
                }, {
                    "@": {
                        "src": "locales/en/b.jpg"
                    }
                }];

            mockParsing(data);

            expect(function () {
                configParser.parse(configPath, session, function (configObj) {});
            }).toThrow(localize.translate("EXCEPTION_INVALID_SPLASH_SRC_LOCALES"));
        });
    });

    describe("icon", function () {
        it("throws error when icon element does not contain src attribute", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["icon"] = {};

            mockParsing(data);

            expect(function () {
                configParser.parse(configPath, session, function (configObj) {});
            }).toThrow(localize.translate("EXCEPTION_INVALID_ICON_SRC"));
        });

        it("throws error when icon element contains empty src attribute", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["icon"] = {
                "@": {
                    "src": ""
                }
            };

            mockParsing(data);

            expect(function () {
                configParser.parse(configPath, session, function (configObj) {});
            }).toThrow(localize.translate("EXCEPTION_INVALID_ICON_SRC"));
        });

        it("throws error when one of many icon elements does not contain attribute", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["icon"] = [{
                    "@": {
                        "src": "a.jpg"
                    }
                }, {
                    "#": "blah"
                }];

            mockParsing(data);

            expect(function () {
                configParser.parse(configPath, session, function (configObj) {});
            }).toThrow(localize.translate("EXCEPTION_INVALID_ICON_SRC"));
        });

        it("allow one icon element that contains non-empty src attribute", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["icon"] = {
                "@": {
                    "src": "a.jpg"
                }
            };

            mockParsing(data);

            expect(function () {
                configParser.parse(configPath, session, function (configObj) {});
            }).not.toThrow();
        });

        it("allow multiple icon elements that contain non-empty src attribute", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["icon"] = [{
                    "@": {
                        "src": "a.jpg"
                    }
                }, {
                    "@": {
                        "src": "b.jpg"
                    }
                }];

            mockParsing(data);

            expect(function () {
                configParser.parse(configPath, session, function (configObj) {});
            }).not.toThrow();
        });

        it("throws error when icon src starts with 'locales' subfolder", function () {
            var data = testUtilities.cloneObj(testData.xml2jsConfig);
            data["icon"] = [{
                    "@": {
                        "src": "a.jpg"
                    }
                }, {
                    "@": {
                        "src": "locales/en/b.jpg"
                    }
                }];

            mockParsing(data);

            expect(function () {
                configParser.parse(configPath, session, function (configObj) {});
            }).toThrow(localize.translate("EXCEPTION_INVALID_ICON_SRC_LOCALES"));
        });
    });
}