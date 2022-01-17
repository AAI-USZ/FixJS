function(detail){
  /* TODO: these values will be thrown away?
{
  "groups": {
    "FileSystemCounters": {
      "FILE_BYTES_WRITTEN": 12654144,
      "HDFS_BYTES_READ": 1395562717,
      "HDFS_BYTES_WRITTEN": 212242870
    },
    "Job Counters ": {
      "Data-local map tasks": 166,
      "Failed map tasks": 1,
      "Launched map tasks": 176,
      "Rack-local map tasks": 10,
      "SLOTS_MILLIS_MAPS": 945952,
      "SLOTS_MILLIS_REDUCES": 0,
      "Total time spent by all maps waiting after reserving slots (ms)": 0,
      "Total time spent by all reduces waiting after reserving slots (ms)": 0
    },
    "Map-Reduce Framework": {
      "Map input bytes": 1395511589,
      "Map input records": 4061894,
      "Map output records": 0,
      "SPLIT_RAW_BYTES": 51128,
      "Spilled Records": 0
    },
    "org.apache.hadoop.hive.ql.exec.FileSinkOperator$TableIdEnum": {"TABLE_ID_1_ROWCOUNT": 4061894},
    "org.apache.hadoop.hive.ql.exec.FilterOperator$Counter": {
      "FILTERED": 0,
      "PASSED": 4061894
    },
    "org.apache.hadoop.hive.ql.exec.MapOperator$Counter": {"DESERIALIZE_ERRORS": 0},
    "org.apache.hadoop.hive.ql.exec.Operator$ProgressCounter": {"CREATED_FILES": 166}
  },
}
*/
  /*
   jobid, name, priority, state, jobSetup, status, jobCleanup,
   trackingURL, startTime, mapComplete, reduceComplete,
   hiveQueryId, hiveQueryString
   */
  if (detail === undefined || detail['data'] === undefined) {
    return null;
  }
  var data = detail.data;
  var status = {};
  var attrs = ['jobid','name','priority','state','jobSetup','status','jobCleanup','trackingURL','startTime','mapComplete','reduceComplete'];
  attrs.forEach(function(attr){
    status[attr] = data[attr];
  });
  status['hiveQueryId'] = data['configuration']['hive.query.id'];
  status['hiveQueryString'] = data['configuration']['hive.query.string'];
  return status;
}