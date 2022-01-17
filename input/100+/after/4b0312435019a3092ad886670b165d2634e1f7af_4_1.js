function(generator) {
        var context, gen, helptpl;
        helptpl = resolve(__dirname, "help");
        if ((generator != null) && typeof generator === 'string') {
          gen = generators[generator];
          if (gen != null) {
            if ((gen.help != null) && typeof gen.help === 'function') {
              return gen.help.apply(null, arguments);
            } else {
              return console.log(render(helptpl, gen));
            }
          } else {
            return error(missing("Generator " + generator));
          }
        } else {
          context = {};
          context.merge(target);
          context.help = render(resolve(__dirname, "help/_list"), listContext);
          return console.log(render(helptpl, context));
        }
      }