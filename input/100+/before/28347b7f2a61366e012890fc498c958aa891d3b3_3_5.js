function() {
          var name = this.$('select').val();
          var ext = /(^.+)\.((vcf.gz)?(bam)?)$/.exec(name);
          ext = ext[ ext.length-1 ];
          var url = rover.thousandGUrl + '/json/' + ext + "/" + name;
          this.$('.track-edit-urlInput').val(url);
          this.$('.track-edit-name').val(name);
       }