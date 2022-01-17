function ack() {
        endTime = new Date();
        elapsed = (endTime.getTime() - startTime.getTime()) / 1000;
        graylog("ACK: " + message_id + " elapsed: " + elapsed + " seconds");
        client.ack(message.headers['message-id']);
    }