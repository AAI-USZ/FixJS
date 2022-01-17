function (timestamp, contest_start, contest_stop, phase) {
        self.last_notification = timestamp;
        self.timestamp = timestamp;
        self.contest_start = contest_start;
        self.contest_stop = contest_stop;
        self.phase = phase;
        self.remaining_div = null;
        self.unread_count = 0;
    }