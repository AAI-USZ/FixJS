function(roleNo, role) {
            var target = data.spans[role.targetId];
            if (!target) {
              dispatcher.post('messages', [[['<strong>ERROR</strong><br/>"' + role.targetId + '" (referenced from "' + eventDesc.id + '") not found in ' + data.document + '<br/>(please correct the source data)', 'error', 5]]]);
              return;
            }
            var there = target.headFragment.chunk.index;
            var dist = Math.abs(here - there);
            var arc = new Arc(eventDesc, role, dist, eventNo);
            origin.totalDist += dist;
            origin.numArcs++;
            target.totalDist += dist;
            target.numArcs++;
            data.arcs.push(arc);
            target.incoming.push(arc);
            origin.outgoing.push(arc);
          }