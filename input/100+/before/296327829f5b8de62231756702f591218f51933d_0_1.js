function runTest() {
  var applet = YAHOO.util.Dom.get('use-nano').checked && document.getElementById('nanoTime');
  time = applet ?
    (function(ns) {
      return function() {
        try {
            return ns.nanoTime() / 1e6;
        } catch(e) {
            ns = new applet.Packages.nano; // reinstantiate
            return ns.nanoTime() / 1e6;
        }
      };
    })(applet) :
    function() {
      return (new Date()).getTime();
    };
  YAHOO.util.Dom.get('results').innerHTML = '<tr><th></th><th>Mean Average</th><th>Std. Deviation</th><th>Discarded samples</th></tr>';

  YAHOO.util.Dom.get('flot-container_parsing').style.visibility =
  YAHOO.util.Dom.get('flot-container_evaluation').style.visibility =
  YAHOO.util.Dom.get('flot-container_whole').style.visibility =
    'hidden';

  runs = parseInt(YAHOO.util.Dom.get('num-runs').value||'3');

  var use_simple = YAHOO.util.Dom.get('checkbox_simple').checked;
  var use_parse = YAHOO.util.Dom.get('checkbox_parse').checked;
  var use_eval = YAHOO.util.Dom.get('checkbox_eval').checked;

  var script_ids = getCheckedBenchmarks();
  var benchmarks = [];
  for(var i=0; i<script_ids.length; i++) {
    var script = parseNLoad.test[script_ids[i]] = {
      id: script_ids[i],
      code: makeCodeVersions(parseNLoad.benchmarks[script_ids[i]]),
      data: new Array(testcases)
    }
    var addBenchmark = function(id) {
      script.data[id] = new Array(runs);
      benchmarks.push({ script: script.code[id], data: script.data[id] });
    }

    if(use_simple) {
      addBenchmark(SIMPLE);
    }
    if(use_parse) {
      addBenchmark(PARSE);
      addBenchmark(PARSE_AND_EVALUATE);
    }
    if(use_eval) {
      addBenchmark(PARSE_AS_STRING);
      addBenchmark(PARSE_AS_STRING_AND_EVALUATE);
    }
  }

  parseNLoad.pointer = new Pointer(benchmarks, runs);

  runTestCases();
}