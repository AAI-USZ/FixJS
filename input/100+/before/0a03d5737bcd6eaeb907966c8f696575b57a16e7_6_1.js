function ($, fluid) {
    
    cspace.footer = function (container, options) {
        var that = fluid.initRendererComponent("cspace.footer", container, options);
        that.renderer.refreshView();        
        return that;
    };
    
    cspace.footer.produceTree = function () {
        return {
            text1: {
                messagekey: "footer-text1"
            },
            text2: {
                messagekey: "footer-text2"
            },
            currentRelease: {
                target: "${currentRelease}",
                linktext: {
                    messagekey: "footer-currentRelease",
                    args: ["${version}"]
                }
            },
            about: {
                target: "${about}",
                linktext: {
                    messagekey: "footer-about"
                }
            },
            feedback: {
                target: "${feedback}",
                linktext: {
                    messagekey: "footer-feedback"
                }
            }
        };
    };
    
    fluid.defaults("cspace.footer", {
        gradeNames: "fluid.rendererComponent",
        mergePolicy: {
            model: "preserve"
        },
        selectors: {
            text1: ".csc-footer-text1",
            text2: ".csc-footer-text2",
            currentRelease: ".csc-footer-currentRelease",
            about: ".csc-footer-about",
            feedback: ".csc-footer-feedback"
        },
        model: {
            about: "http://www.collectionspace.org",
            currentRelease: "http://www.collectionspace.org/current_release",
            feedback: "http://wiki.collectionspace.org/display/collectionspace/Release+2.2+Feedback",
            version: "2.2"
        },
        resources: {
            template: {
                expander: {
                    type: "fluid.deferredInvokeCall",
                    func: "cspace.specBuilder",
                    args: {
                        forceCache: true,
                        fetchClass: "fastTemplate",
                        url: "%webapp/html/components/footer.html",
                        options: {
                            dataType: "html"
                        }
                    }
                }
            }
        },
        parentBundle: "{globalBundle}",
        produceTree: cspace.footer.produceTree,
        strings: {}
    });
    
    fluid.fetchResources.primeCacheFromResources("cspace.footer");
    
}