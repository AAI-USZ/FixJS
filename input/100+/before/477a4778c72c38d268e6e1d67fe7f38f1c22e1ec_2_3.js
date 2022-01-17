function (value, key) {
            var q = expander.queued;
            expander.pathOp.push(key.toString());
            for (var i = 0; i < q.length; ++ i) {
                var expandSpec = q[i].expandSpec;
                if (fluid.pathUtil.matchPath(expandSpec.inputPath, expander.path, true)) {
                    var esCopy = fluid.copy(expandSpec);
                    esCopy.inputPath = expander.path;
                    // TODO: allow some kind of interpolation for output path
                    esCopy.outputPath = expander.path;
                    fluid.model.transform.expandExpander(esCopy, expander);
                }
            }
            if (!fluid.isPrimitive(value)) {
                fluid.model.transform.expandWildcards(expander, value);
            }
            expander.pathOp.pop();
        }