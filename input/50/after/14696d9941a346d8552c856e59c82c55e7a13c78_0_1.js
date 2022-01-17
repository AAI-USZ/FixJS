function(_, h, title) {
          // Slugify the title text.
          var slug = grunt.utils._.slugify(title.replace(/\./g, '-'));
          // Put everything back together.
          return h + ' ' + title + ' <a name="' + slug + '" href="#' + slug +
            '" title="Link to this section">⚑</a>\n';
        }