function (timestamp, contest_start, contest_stop, valid_phase_end, phase) {
        self.last_notification = timestamp;
        self.server_timestamp = timestamp;
        self.client_timestamp = $.now() / 1000;
        self.contest_start = contest_start;
        self.contest_stop = contest_stop;
        self.valid_phase_end = valid_phase_end;
        self.phase = phase;
        self.remaining_div = null;
        self.unread_count = 0;
    }