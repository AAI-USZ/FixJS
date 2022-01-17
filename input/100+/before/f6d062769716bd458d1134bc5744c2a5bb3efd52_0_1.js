function (m) {
                $this.statsd.increment(ks + 'macros_ct', m.macros_ct);
                $this.statsd.increment(ks + 'templates_ct', m.templates_ct);
            }