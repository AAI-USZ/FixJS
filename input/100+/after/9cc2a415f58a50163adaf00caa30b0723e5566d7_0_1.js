function send_stats(endTime, elapsed, job_status) {
        var stats_msg = JSON.stringify({
            job_id: "",
            txn_id: txn_id,
            site_id: message.headers["site_id"],
            pod: podName,
            host: os.hostname,
            process: process.pid,
            label: json_data.action,
            status: job_status,
            job_enqueue_time: dateToString(job_enqueue_timestamp),
            start_time: dateToString(startTime),
            end_time: dateToString(endTime),
            elapsed: elapsed
        });

        graylog("publishing stats: " + stats_msg);
        var send_headers = {
            destination: '/topic/jobstats',
            body: stats_msg,
            "amq-msg-type": "text"
        };
        client.send(send_headers, false);
    }