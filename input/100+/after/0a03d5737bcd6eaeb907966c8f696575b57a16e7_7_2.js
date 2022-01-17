function ($, fluid) {
    
    "use strict";
    
    fluid.registerNamespace("cspace.listView");
    
    cspace.listView.sorter = function (overallThat, model) {
        return null;
    };
    
    fluid.defaults("cspace.listView", {
        gradeNames: ["autoInit", "fluid.rendererComponent"],
        model: {
            columns: [{
                sortable: true,
                id: "",
                name: ""
            }],
            pagerModel: {
                pageCount: 1,
                pageIndex: 0,
                pageSize: 5,
                sortDir: 1,
                sortKey: "",
                totalRange: 0
            },
            pageSizeList: ["1", "5", "10", "20", "50"],
            list: []
        },
        selectors: {
            pager: ".fl-pager",
            headers: ".csc-listView-headers",
            row: ".csc-listView-row",
            show: ".csc-listView-show",
            perPage: ".csc-listView-perPage",
            pageSize: ".csc-listView-page-size",
            previous: ".csc-listView-previous",
            next: ".csc-listView-next",
            rows: ".csc-listView-rows"
        },
        selectorsToIgnore: ["pager", "rows"],
        styles: {
            row: "cs-listView-row",
            selected: "cs-selected",
            selecting: "cs-selecting"
        },
        protoTree: {
            headers: {
                decorators: [{
                    type: "fluid",
                    func: "cspace.listView.headers",
                    options: {
                        model: {
                            columns: "${columns}"
                        }
                    }
                }, {
                    type: "attrs",
                    attributes: {
                        "rsf:id": "header:"                        
                    }
                }]
            },
            row: {
                decorators: [{
                    "addClass": "{styles}.row"
                }, {
                    type: "attrs",
                    attributes: {
                        "rsf:id": "row:"                        
                    }
                }, {
                    type: "fluid",
                    func: "cspace.listView.columns",
                    options: {
                        model: {
                            columns: "${columns}"
                        }
                    }
                }]
            },
            show: {
                messagekey: "listView-show"
            },
            perPage: {
                messagekey: "listView-perPage"
            },
            pageSize: {
                optionlist: "${pageSizeList}",
                optionnames: "${pageSizeList}",
                selection: "${pagerModel}.pageSize"
            },
            next: {
                messagekey: "listView-next"
            },
            previous: {
                messagekey: "listView-previous"
            }
        },
        components: {
            dataSource: {
                type: "cspace.listView.dataSource"
            },
            permissionsResolver: "{permissionsResolver}",
            listNavigator: {
                type: "cspace.listView.listNavigator",
                createOnEvent: "pagerAfterRender",
                container: "{cspace.listView}.dom.rows",
                options: {
                    selectors: {
                        row: "{cspace.listView}.options.selectors.row"
                    },
                    list: "{cspace.listView}.model.list"
                }
            },
            listPermissionStyler: {
                type: "cspace.listView.listPermissionStyler",
                createOnEvent: "pagerAfterRender",
                options: {
                    offset: "{cspace.listView}.model.offset",
                    rows: "{cspace.listView}.dom.row",
                    list: "{cspace.listView}.model.list"
                }
            },
            workflowStyler: {
                type: "cspace.util.workflowStyler",
                createOnEvent: "pagerAfterRender",
                options: {
                    offset: "{cspace.listView}.model.offset",
                    rows: "{cspace.listView}.dom.row",
                    list: "{cspace.listView}.model.list"
                }
            },
            pager: {
                type: "fluid.pager",
                createOnEvent: "afterRender",
                options: {
                    dataModel: "{cspace.listView}.model",
                    model: "{cspace.listView}.model.pagerModel",
                    dataOffset: "list",
                    sorter: cspace.listView.sorter,
                    columnDefs: {
                        expander: {
                            type: "fluid.deferredCall",
                            func: "cspace.listView.colDefsGenerator",
                            args: ["{cspace.listView}.model.columns", "{cspace.listView}.options.parentBundle"]
                        }
                    },
                    annotateColumnRange: {
                        expander: {
                            type: "fluid.deferredCall",
                            func: "cspace.listView.getColumnRange",
                            args: "{cspace.listView}.model.columns"
                        }
                    },
                    bodyRenderer: {
                        type: "fluid.pager.selfRender",
                        options: {
                            renderOptions: {
                                autoBind: true
                            }
                        }
                    },
                    pagerBar: {
                        type: "fluid.pager.pagerBar",
                        options: {
                            pageList: {
                                type: "fluid.pager.renderedPageList"
                            }
                        }
                    },
                    events: {
                        onModelChange: "{cspace.listView}.events.onModelChange"
                    },
                    listeners: {
                        afterRender: [{
                            listener: "{cspace.listView}.events.pagerAfterRender.fire"
                        }, {
                            listener: "{cspace.listView}.bindEvents"
                        }]
                    }
                }
            }
        },
        invokers: {
            select: "cspace.listView.select"
        },
        resources: {
            template: cspace.resourceSpecExpander({
                fetchClass: "fastTemplate",
                url: "%webapp/html/components/ListViewTemplate.html",
                options: {
                    dataType: "html"
                }
            })
        },
        events: {
            onModelChange: null,
            afterUpdate: null,
            ready: null,
            onSelect: null,
            pagerAfterRender: null
        },
        strings: {},
        parentBundle: "{globalBundle}",
        preInitFunction: "cspace.listView.preInit",
        finalInitFunction: "cspace.listView.finalInit",
        urls: cspace.componentUrlBuilder({
            listUrl: "%tenant/%tname/%recordType?pageNum=%pageNum&pageSize=%pageSize&sortDir=%sortDir&sortKey=%sortKey",
            navigate: "%webapp/html/%recordType.html?csid=%csid",
            navigateLocal: "%webapp/html/record.html?recordtype=%recordType&csid=%csid"
        }),
        elPath: "items",
        recordType: ""
    });
    
    fluid.demands("fluid.pager", "cspace.listView", ["{cspace.listView}.dom.pager", fluid.COMPONENT_OPTIONS]);

    cspace.listView.preInit = function (that) {
        that.bindEvents = function () {
            $("a", that.locate("rows")).focus(function () {
                $(that.options.selectors["row"]).removeClass(that.options.styles.selected + " " + that.options.styles.selecting);
                $(this).parents("tr").addClass(that.options.styles.selecting);
            }).hover(function () {
                $(that.options.selectors["row"]).removeClass(that.options.styles.selecting);
            });
            that.locate("row").click(function () {
                $(that.options.selectors["row"]).removeClass(that.options.styles.selected + " " + that.options.styles.selecting);
                that.styleAndActivate($(this), that.locate("row"));
            });
        };
        that.updateList = function (list) {
            var pagerModel = that.pager.model;
            var offset = pagerModel.pageIndex * pagerModel.pageSize;
            that.applier.requestChange("offset", offset);
            fluid.each(list, function (row, index) {
                var fullIndex = offset + index;
                that.applier.requestChange(fluid.model.composeSegments("list", fullIndex), row);
            });
        };
        that.updateModel = function (model) {
            var initialUpdate;
            if (!model) {
                initialUpdate = true;
                model = that.pager.model;
            }
            var directModel = {
                recordType: that.options.recordType,
                pageNum: model.pageIndex,
                pageSize: model.pageSize,
                sortDir: model.sortDir,
                sortKey: model.sortKey || cspace.listView.getColumnRange(that.model.columns)
            };
            that.dataSource.get(directModel, function (data) {
                that.updateList(fluid.get(data, that.options.elPath));
                that.pager.applier.requestChange("totalRange", parseInt(fluid.get(data, "pagination.totalItems"), 10));
                that.pager.events.initiatePageChange.fire({pageIndex: model.pageIndex, forceUpdate: true});
                that.events[initialUpdate ? "ready" : "afterUpdate"].fire(that);
            }, cspace.util.provideErrorCallback(that, that.dataSource.resolveUrl(directModel), "errorFetching"));
        };
        that.styleAndActivate = function (row, rows) {
            var index = that.model.offset + rows.index(row),
                record = that.model.list[index];
            if (!cspace.permissions.resolve({
                permission: "read",
                target: record.recordtype || record.sourceFieldType,
                resolver: that.permissionsResolver
            })) {
                return;
            }
            row.addClass(that.options.styles.selected);
            that.applier.requestChange("selectonIndex", index);
            that.events.onSelect.fire();
        };
    };

    fluid.demands("cspace.listView.listNavigator", ["cspace.listView", "cspace.localData"], {
        options: {
            url: "{cspace.listView}.options.urls.navigateLocal"
        }
    });

    fluid.demands("cspace.listView.listNavigator", "cspace.listView", {
        options: {
            url: "{cspace.listView}.options.urls.navigate"
        }
    });

    cspace.listView.finalInit = function (that) {
        that.refreshView();
        that.updateModel();
        that.pager.events.onModelChange.addListener(function (model, oldModel) {
            if (model.pageCount !== oldModel.pageCount || model.pageIndex !== oldModel.pageIndex || model.pageSize !== oldModel.pageSize ||
                model.sortDir !== oldModel.sortDir || model.sortKey !== oldModel.sortKey || model.totalRange !== oldModel.totalRange) {
                that.updateModel(model);
            }
        });
    };

    fluid.defaults("cspace.listView.listNavigator", {
        gradeNames: ["fluid.viewComponent", "autoInit"],
        finalInitFunction: "cspace.listView.listNavigator.finalInit",
        typePath: "recordtype",
        selectors: {
            column: ".csc-listView-column"
        }
    });

    cspace.listView.listNavigator.finalInit = function (that) {
        var rows = that.locate("row");
        fluid.each(that.options.list, function (record, index) {
            that.locate("column", rows.eq(index)).wrapInner($("<a/>").attr("href", fluid.stringTemplate(that.options.url, {
                recordType: record[that.options.typePath].toLowerCase(),
                csid: record.csid
            })));
        });
    };

   fluid.defaults("cspace.listView.listPermissionStyler", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        finalInitFunction: "cspace.listView.listPermissionStyler.finalInit",
        components: {
            permissionsResolver: "{permissionsResolver}"
        },
        styles: {
            disabled: "cs-disabled"
        },
        offset: 0
    });

    cspace.listView.listPermissionStyler.finalInit = function (that) {
        fluid.each(that.options.rows, function (row, index) {
            var record = that.options.list[that.options.offset + index];
            if (!cspace.permissions.resolve({
                permission: "read",
                target: record.recordtype || record.sourceFieldType,
                resolver: that.permissionsResolver
            })) {
                that.options.rows.eq(index).addClass(that.options.styles.disabled);
            }
        });
    };

    cspace.listView.colDefsGenerator = function (columns, globalBundle) {
        return fluid.transform(columns, function (column) {
            var key = column.id;
            return {
                key: key,
                valuebinding: "*." + key,
                components: {
                    value: "${" + fluid.model.composeSegments("*", key) + "}"
                },
                sortable: column.sortable,
                label: globalBundle.resolve(column.name)
            };
        });
    };

    cspace.listView.getColumnRange = function (columns) {
        return fluid.find(columns, function (column) {
            return column.id;
        });
    };
    
    fluid.demands("cspace.listView.dataSource",  ["cspace.localData", "cspace.listView"], {
        funcName: "cspace.listView.testDataSource",
        args: {
            targetTypeName: "cspace.listView.testDataSource",
            termMap: {
                recordType: "%recordType"
            }
        }
    });
    fluid.demands("cspace.listView.dataSource", ["cspace.listView"], {
        funcName: "cspace.URLDataSource",
        args: {
            url: "{cspace.listView}.options.urls.listUrl",
            termMap: {
                recordType: "%recordType",
                pageNum: "%pageNum",
                pageSize: "%pageSize",
                sortDir: "%sortDir",
                sortKey: "%sortKey"
            },
            targetTypeName: "cspace.listView.dataSource"
        }
    });

    fluid.defaults("cspace.listView.testDataSource", {
        url: "%test/data/%recordType/records.json"
    });
    cspace.listView.testDataSource = cspace.URLDataSource;

    fluid.demands("cspace.listView.columns", "cspace.listView", {
        container: "{arguments}.0",
        mergeAllOptions: [{}, "{arguments}.1"]
    });

    fluid.defaults("cspace.listView.columns", {
        gradeNames: ["autoInit", "fluid.rendererComponent"],
        selectors: {
            column: ".csc-listView-column"
        },
        repeatingSelectors: ["column"],
        protoTree: {
            expander: {
                repeatID: "column",
                type: "fluid.renderer.repeat",
                pathAs: "column",
                valueAs: "columnValue",
                controlledBy: "columns",
                tree: {
                    decorators: {
                        type: "attrs",
                        attributes: {
                            "rsf:id": "${{column}.id}"                        
                        }
                    }
                }
            }
        },
        renderOnInit: true
    });
    
    fluid.demands("cspace.listView.headers", "cspace.listView", {
        container: "{arguments}.0",
        mergeAllOptions: [{}, "{arguments}.1"]
    });
    
    fluid.defaults("cspace.listView.headers", {
        gradeNames: ["autoInit", "fluid.rendererComponent"],
        selectors: {
            header: ".csc-listView-header"
        },
        repeatingSelectors: ["header"],
        protoTree: {
            expander: {
                repeatID: "header",
                type: "fluid.renderer.repeat",
                pathAs: "column",
                valueAs: "columnValue",
                controlledBy: "columns",
                tree: {
                    decorators: [{
                        type: "fluid",
                        func: "cspace.listView.headers.header",
                        options: {
                            model: "{columnValue}"
                        }
                    }, {
                        type: "fluid",
                        func: "cspace.listView.headers.sortable",
                        options: {
                            model: {
                                sortable: "${{column}.sortable}"
                            }
                        }
                    }]
                }
            }
        },
        renderOnInit: true
    });
    
    fluid.defaults("cspace.listView.headers.sortable", {
        gradeNames: ["autoInit", "fluid.viewComponent"],
        styles: {
            sortable: "flc-pager-sort-header"
        },
        finalInitFunction: "cspace.listView.headers.sortable.finalInit"
    });
    cspace.listView.headers.sortable.finalInit = function (that) {
        if (!that.model.sortable) {
            return;
        }
        that.container.addClass(that.options.styles.sortable);
    };
    
    fluid.demands("cspace.listView.headers.header", "cspace.listView.headers", {
        container: "{arguments}.0",
        mergeAllOptions: [{}, "{arguments}.1"]
    });
    
    fluid.defaults("cspace.listView.headers.header", {
        gradeNames: ["autoInit", "fluid.rendererComponent"],
        selectors: {
            text: ".csc-listView-header-text",
            link: ".csc-listView-header-link"
        },
        styles: {
            link: "cs-listView-header-link"
        },
        protoTree: {
            expander: {
                type: "fluid.renderer.condition",
                condition: "${sortable}",
                trueTree: {
                    link: {
                        target: "#",
                        linktext: {
                            messagekey: "${name}"
                        },
                        decorators: [{
                            type: "attrs",
                            attributes: {
                                "rsf:id": "${id}"                        
                            }
                        }, {"addClass": "{styles}.link"}]
                    }
                },
                falseTree: {
                    text: {
                        messagekey: "${name}",
                        decorators: [{
                            type: "attrs",
                            attributes: {
                                "rsf:id": "${id}"                        
                            }
                        }]
                    }
                }
            }
        },
        strings: {},
        parentBundle: "{globalBundle}",
        renderOnInit: true
    });
    
    fluid.fetchResources.primeCacheFromResources("cspace.listView");
    
}