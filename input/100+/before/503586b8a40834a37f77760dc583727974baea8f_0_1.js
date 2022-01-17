function (opts, args) {

            if (opts.outputLevel && opts.block) {
                if (opts.outputName) return Q.reject('You must specify one of --output-level ' +
                    'plus --{block,elem,mod} or --output-name options');

                opts.outputName = opts.outputLevel.getByObj(opts);
            }

            var context = new Context(opts.level, opts);

            return Q.all(context.getTechs().map(function(techIdent) {

                return context.getTech(techIdent)
                    .buildByDecl(opts.declaration, context.getLevels(),
                        PATH.resolve(opts.outputDir, opts.outputName));

            })).get(0);

        }