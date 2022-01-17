function(event, data) {
      var viz = this.viz;
      if (!viz) return;

      var type = event.type;
      var id = data.job.name;
      var job = data.job;
      var $id = function(d) { return document.getElementById(d); };
      var entry;
      var n = viz.graph.getNode(id);

      n.data.status = type;

      if (job.mapProgress) {
        n.data['map progress'] = AMBROSE.util.task_progress_string(job.totalMappers, job.mapProgress);
        entry = $id(job.jobId + '_map progress');
        if (entry) {
          entry.innerHTML = n.data['map progress'];
        }
      }

      if (job.reduceProgress) {
        n.data['reduce progress'] = AMBROSE.util.task_progress_string(job.totalReducers, job.reduceProgress);
        entry = $id(job.jobId + '_reduce progress');
        if (entry) {
          entry.innerHTML = n.data['reduce progress'];
        }
      }

      if (n) {
        var label = viz.fx.labels.getLabel(n.id),
        update = false;

        if (type == 'JOB_FINISHED') {
          label.className = 'node ' + type;
          n.eachAdjacency(function(a) {
            a.setData('color', '#aaa');
          });
          update = true;
        } else if (type == 'JOB_FAILED') {
          label.className = 'node ' + type;
          n.eachAdjacency(function(a) {
            a.setData('color', '#c00');
          });
          update = true;
        } else if (type == 'jobSelected') {
          label.className = 'node ' + type;
        }

        if (update) {
          viz.fx.plot();
        }
      }
    }