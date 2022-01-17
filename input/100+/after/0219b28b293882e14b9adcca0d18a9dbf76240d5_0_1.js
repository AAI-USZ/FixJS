function setupObjectMenu(editor) {
    var viewer = editor.getViewer(),
        selectionUpTool,
        selectionDownTool,
        selectionToTopTool,
        selectionToBottomTool,
        alignLeftTool,
        alignRightTool,
        alignCenterTool,
        alignTopTool,
        alignBottomTool,
        alignMiddleTool,
        moveUpTool,
        moveDownTool,
        moveLeftTool,
        moveRightTool,
        unsetContentTool,
        clearTransformationTool,
        menus = editor.menus;

    function selectionNotEmpty() {
        return !viewer.selectionIsEmpty();
    }
    function selectionTwoOrMore() {
        return viewer.getSelectionLength() > 1;
    }
    function selectionHasNonEmptyPositions() {
        var group = viewer.getGroup(),
            documentData = group.documentData,
            children = documentData.children,
            selection = viewer.getSelection(),
            cmdGroup = group.cmdCommandGroup('unsetContent', 'Unset Content'),
            ret = false;
        forEachProperty(children, function (c, n) {
            var p = c.config.position;
            if (selection[p]) {
                ret = true;
            }
        });
        return ret;
    }

    function normalizeDepths(orders) {
        var d = [], res = {}, i, l, di;
        // collect
        forEachProperty(orders, function (o, name) {
            d.push({name: name, order: o});
        });
        // sort
        d.sort(function (o1, o2) {
            return o1.order - o2.order;
        });
        // redistribute
        l = d.length;
        for (i = 0; i < l; i += 1) {
            di = d[i];
            res[di.name] = i;
        }
        return res;
    }
    // selection up
    selectionUpTool = new MenuItem(
        'Decrease Depth',
        function () {
            var group = viewer.getGroup(),
                dd = getDocumentData(viewer),
                newOrders = {},
                no;
            // compute new depths
            forEachProperty(dd.positions, function (c, name) {
                no = c.order;
                if (viewer.positionIsSelected(name)) {
                    no += 1.5;
                }
                newOrders[name] = no;
            });
            // normalize depths
            newOrders = normalizeDepths(newOrders);
            // apply orders
            group.doCommand(group.cmdSetVisualOrder(newOrders, 'Decrease Depth'));
        },
        null,
        null,
        null,
        selectionNotEmpty
    );
    // selection down
    selectionDownTool = new MenuItem(
        'Increase Depth',
        function () {
            var group = viewer.getGroup(),
                dd = getDocumentData(viewer),
                newOrders = {},
                no;
            // compute new depths
            forEachProperty(dd.positions, function (c, name) {
                no = c.order;
                if (viewer.positionIsSelected(name)) {
                    no -= 1.5;
                }
                newOrders[name] = no;
            });
            // normalize depths
            newOrders = normalizeDepths(newOrders);
            // apply orders
            group.doCommand(group.cmdSetVisualOrder(newOrders, 'Increase Depth'));
        },
        null,
        null,
        null,
        selectionNotEmpty
    );
    // selection to top
    selectionToTopTool = new MenuItem(
        'To Topmost Depth',
        function () {
            var group = viewer.getGroup(),
                dd = getDocumentData(viewer),
                numpos = group.getNumberOfPositions(),
                newOrders = {},
                no;
            // compute new depths
            forEachProperty(dd.positions, function (c, name) {
                no = c.order;
                if (viewer.positionIsSelected(name)) {
                    no += numpos;
                }
                newOrders[name] = no;
            });
            // normalize depths
            newOrders = normalizeDepths(newOrders);
            // apply orders
            group.doCommand(group.cmdSetVisualOrder(newOrders, 'To Topmost Depth'));
        },
        null,
        null,
        null,
        selectionNotEmpty
    );
    // selection to bottom
    selectionToBottomTool = new MenuItem(
        'To Bottommost Depth',
        function () {
            var group = viewer.getGroup(),
                dd = getDocumentData(viewer),
                numpos = group.getNumberOfPositions(),
                newOrders = {},
                no;
            // compute new depths
            forEachProperty(dd.positions, function (c, name) {
                no = c.order;
                if (viewer.positionIsSelected(name)) {
                    no -= numpos;
                }
                newOrders[name] = no;
            });
            // normalize depths
            newOrders = normalizeDepths(newOrders);
            // apply orders
            group.doCommand(group.cmdSetVisualOrder(newOrders, 'To Bottommost Depth'));
        },
        null,
        null,
        null,
        selectionNotEmpty
    );
    // align left tool
    alignLeftTool = new MenuItem(
        'Align Left',
        function () {
            var group = viewer.getGroup(),
                dd = getDocumentData(viewer),
                selection = viewer.getSelection(),
                selectionRect = viewer.getSelectionRect(),
                positionRect,
                transform,
                cmdGroup = group.cmdCommandGroup('alignLeft', 'Align Left');

            // for everything in the selection
            forEachProperty(selection, function (p, n) {
                positionRect = viewer.getPositionRect(n);
                transform = mat4.translate(
                    mat4.identity(),
                    [selectionRect[0][0] - positionRect[0][0], 0, 0]
                );

                cmdGroup.add(group.cmdTransformPosition(n, transform));
            });
            // do the combined command
            group.doCommand(cmdGroup);
        },
        null,
        null,
        null,
        selectionTwoOrMore
    );
    // align left tool
    alignRightTool = new MenuItem(
        'Align Right',
        function () {
            var group = viewer.getGroup(),
                dd = getDocumentData(viewer),
                selection = viewer.getSelection(),
                selectionRect = viewer.getSelectionRect(),
                positionRect,
                transform,
                cmdGroup = group.cmdCommandGroup('alignRight', 'Align Right');

            // for everything in the selection
            forEachProperty(selection, function (p, n) {
                positionRect = viewer.getPositionRect(n);
                transform = mat4.translate(
                    mat4.identity(),
                    [selectionRect[1][0] - positionRect[1][0], 0, 0]
                );

                cmdGroup.add(group.cmdTransformPosition(n, transform));
            });
            // do the combined command
            group.doCommand(cmdGroup);
        },
        null,
        null,
        null,
        selectionTwoOrMore
    );
    // align left tool
    alignCenterTool = new MenuItem(
        'Align Center',
        function () {
            var group = viewer.getGroup(),
                dd = getDocumentData(viewer),
                selection = viewer.getSelection(),
                selectionRect = viewer.getSelectionRect(),
                positionRect,
                mid = (selectionRect[0][0] + selectionRect[1][0]) / 2,
                transform,
                cmdGroup = group.cmdCommandGroup('alignCenter', 'Align Center');

            // for everything in the selection
            forEachProperty(selection, function (p, n) {
                positionRect = viewer.getPositionRect(n);
                var m = (positionRect[0][0] + positionRect[1][0]) / 2;
                transform = mat4.translate(
                    mat4.identity(),
                    [mid - m, 0, 0]
                );

                cmdGroup.add(group.cmdTransformPosition(n, transform));
            });
            // do the combined command
            group.doCommand(cmdGroup);
        },
        null,
        null,
        null,
        selectionTwoOrMore
    );
    // align top tool
    alignTopTool = new MenuItem(
        'Align Top',
        function () {
            var group = viewer.getGroup(),
                dd = getDocumentData(viewer),
                selection = viewer.getSelection(),
                selectionRect = viewer.getSelectionRect(),
                positionRect,
                transform,
                cmdGroup = group.cmdCommandGroup('alignTop', 'Align Top');

            // for everything in the selection
            forEachProperty(selection, function (p, n) {
                positionRect = viewer.getPositionRect(n);
                transform = mat4.translate(
                    mat4.identity(),
                    [0, selectionRect[0][1] - positionRect[0][1], 0]
                );

                cmdGroup.add(group.cmdTransformPosition(n, transform));
            });
            // do the combined command
            group.doCommand(cmdGroup);
        },
        null,
        null,
        null,
        selectionTwoOrMore
    );
    // align bottom tool
    alignBottomTool = new MenuItem(
        'Align Bottom',
        function () {
            var group = viewer.getGroup(),
                dd = getDocumentData(viewer),
                selection = viewer.getSelection(),
                selectionRect = viewer.getSelectionRect(),
                positionRect,
                transform,
                cmdGroup = group.cmdCommandGroup('alignBottom', 'Align Bottom');

            // for everything in the selection
            forEachProperty(selection, function (p, n) {
                positionRect = viewer.getPositionRect(n);
                transform = mat4.translate(
                    mat4.identity(),
                    [0, selectionRect[1][1] - positionRect[1][1], 0]
                );

                cmdGroup.add(group.cmdTransformPosition(n, transform));
            });
            // do the combined command
            group.doCommand(cmdGroup);
        },
        null,
        null,
        null,
        selectionTwoOrMore
    );
    // align left tool
    alignMiddleTool = new MenuItem(
        'Align Middle',
        function () {
            var group = viewer.getGroup(),
                dd = getDocumentData(viewer),
                selection = viewer.getSelection(),
                selectionRect = viewer.getSelectionRect(),
                positionRect,
                mid = (selectionRect[0][1] + selectionRect[1][1]) / 2,
                transform,
                cmdGroup = group.cmdCommandGroup('alignMiddle', 'Align Middle');

            // for everything in the selection
            forEachProperty(selection, function (p, n) {
                positionRect = viewer.getPositionRect(n);
                var m = (positionRect[0][1] + positionRect[1][1]) / 2;
                transform = mat4.translate(
                    mat4.identity(),
                    [0, mid - m, 0]
                );

                cmdGroup.add(group.cmdTransformPosition(n, transform));
            });
            // do the combined command
            group.doCommand(cmdGroup);
        },
        null,
        null,
        null,
        selectionTwoOrMore
    );

    // move tools
    moveUpTool = new MenuItem(
        'Move Up',
        function () {
            var group = viewer.getGroup(),
                selectionRect = viewer.getSelectionRect(),
                transform,
                selection,
                cmdGroup;
            // we want to move the selection.
            transform = getTransform(
                viewer,
                [0, -group.documentData.gridSize, 0],
                false,
                selectionRect
            );
            selection = viewer.getSelection();
            cmdGroup = group.cmdCommandGroup('moveUp', 'Move Up');

            // for everything in the selection
            forEachProperty(selection, function (p, n) {
                cmdGroup.add(group.cmdTransformPosition(n, transform));
            });
            // do the combined command
            group.doCommand(cmdGroup);
        },
        null,
        new Accelerator('VK_UP', true),
        null,
        selectionNotEmpty
    );
    moveDownTool = new MenuItem(
        'Move Down',
        function () {
            var group = viewer.getGroup(),
                selectionRect = viewer.getSelectionRect(),
                transform,
                selection,
                cmdGroup;
            // we want to move the selection.
            transform = getTransform(
                viewer,
                [0, group.documentData.gridSize, 0],
                false,
                selectionRect
            );
            selection = viewer.getSelection();
            cmdGroup = group.cmdCommandGroup('moveDown', 'Move Down');

            // for everything in the selection
            forEachProperty(selection, function (p, n) {
                cmdGroup.add(group.cmdTransformPosition(n, transform));
            });
            // do the combined command
            group.doCommand(cmdGroup);
        },
        null,
        new Accelerator('VK_DOWN', true),
        null,
        selectionNotEmpty
    );
    moveLeftTool = new MenuItem(
        'Move Left',
        function () {
            var group = viewer.getGroup(),
                selectionRect = viewer.getSelectionRect(),
                transform,
                selection,
                cmdGroup;
            // we want to move the selection.
            transform = getTransform(
                viewer,
                [-group.documentData.gridSize, 0, 0],
                false,
                selectionRect
            );
            selection = viewer.getSelection();
            cmdGroup = group.cmdCommandGroup('moveLeft', 'Move Left');

            // for everything in the selection
            forEachProperty(selection, function (p, n) {
                cmdGroup.add(group.cmdTransformPosition(n, transform));
            });
            // do the combined command
            group.doCommand(cmdGroup);
        },
        null,
        new Accelerator('VK_LEFT', true),
        null,
        selectionNotEmpty
    );
    moveRightTool = new MenuItem(
        'Move Right',
        function () {
            var group = viewer.getGroup(),
                selectionRect = viewer.getSelectionRect(),
                transform,
                selection,
                cmdGroup;
            // we want to move the selection.
            transform = getTransform(
                viewer,
                [group.documentData.gridSize, 0, 0],
                false,
                selectionRect
            );
            selection = viewer.getSelection();
            cmdGroup = group.cmdCommandGroup('moveRight', 'Move Right');

            // for everything in the selection
            forEachProperty(selection, function (p, n) {
                cmdGroup.add(group.cmdTransformPosition(n, transform));
            });
            // do the combined command
            group.doCommand(cmdGroup);
        },
        null,
        new Accelerator('VK_RIGHT', true),
        null,
        selectionNotEmpty
    );

    unsetContentTool = new MenuItem(
        'Unset Content',
        function () {
            var group = viewer.getGroup(),
                documentData = group.documentData,
                children = documentData.children,
                selection = viewer.getSelection(),
                cmdGroup = group.cmdCommandGroup('unsetContent', 'Unset Content');

            // for everything in the selection
            forEachProperty(children, function (c, n) {
                var p = c.config.position;
                if (selection[p]) {
                    cmdGroup.add(group.cmdRemoveVisual(p));
                }
            });
            // do the combined command
            group.doCommand(cmdGroup);
        },
        null,
        new Accelerator('VK_U', true),
        'editor/img/plugin/unsetcontent.png'
    );

    clearTransformationTool = new MenuItem(
        'Clear Transformations',
        function () {
            viewer.untransformSelection();
        },
        null,
        null,
        null,
        selectionNotEmpty
    );

    // setup auto update of some tools
    (function () {
        var group = viewer.getGroup(),
            documentData = group.documentData,
            commandChain = group.getCommandChain();
        function signalChange() {
            unsetContentTool.emit('change');
            unsetContentTool.setEnabled(selectionHasNonEmptyPositions());
        }
        commandChain.on('command', signalChange);
        viewer.on('selectionChanged', signalChange);
    }());

    menus.object.push(
        selectionUpTool,
        selectionDownTool,
        selectionToTopTool,
        selectionToBottomTool,
        null,
        alignLeftTool,
        alignRightTool,
        alignCenterTool,
        null,
        alignTopTool,
        alignBottomTool,
        alignMiddleTool,
        null,
        moveUpTool,
        moveDownTool,
        moveLeftTool,
        moveRightTool,
        null,
        unsetContentTool,
        clearTransformationTool
    );

}