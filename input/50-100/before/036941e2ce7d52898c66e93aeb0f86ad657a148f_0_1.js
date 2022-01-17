function(pipeline) {
            _(self.pipelines()).each(function(existing_pipeline) {
              if(existing_pipeline.name() == pipeline.name) {
                existing_pipeline.refresh(pipeline);
              }
            });
          }