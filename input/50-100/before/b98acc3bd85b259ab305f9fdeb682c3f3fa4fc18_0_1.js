function(pipeline) {
          var existing_pipeline = _(self.pipelines()).find(function(p) { return p.name() == pipeline.name; });
          if(existing_pipeline) {
            existing_pipeline.refresh(pipeline);
          } else {
            self.pipelines.push(new Radiator.Pipeline(pipeline));
          }
        }