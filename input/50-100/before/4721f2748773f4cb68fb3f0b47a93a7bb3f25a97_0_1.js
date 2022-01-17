function(field) {
              var value = rawdoc[field.id];
              if (value !== null) { value = value.toString(); }
              // TODO regexes?
              foundmatch = foundmatch || (value.toLowerCase() === term.toLowerCase());
              // TODO: early out (once we are true should break to spare unnecessary testing)
              // if (foundmatch) return true;
            }