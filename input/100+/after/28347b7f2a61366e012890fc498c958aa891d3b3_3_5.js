function() {
          var name = this.$('select').val();
          var ext = /(^.+)\.((vcf.gz)?(bam)?)$/.exec(name);
          var exts = name.split('.');
          if (exts[ exts.length-1 ] == 'gz')
            exts.pop();
          ext = exts[ exts.length-1 ];
          var url = rover.thousandGUrl + '/json/' + ext + "/" + name;
          this.$('.track-edit-urlInput').val(url);
          this.$('.track-edit-name').val(name);
       }