function (m) {
                $this.statsd.increment(ks + 'tokens_ct', m.tokens_ct);
                $this.statsd.increment(ks + 'macros_ct', m.macros_ct);
                $this.statsd.increment(ks + 'templates_ct', m.templates_ct);
                $this.statsd.increment(ks + 'errors_ct', m.errors_ct);
                $this.statsd.increment(ks + 'input_chars', m.input_length);
                $this.statsd.increment(ks + 'output_chars', m.output_length);
                if (m.cache_control == 'no-cache') {
                    $this.statsd.increment(ks + 'cache_control.nocache');
                } else if (m.cache_control == 'max-age: 0') {
                    $this.statsd.increment(ks + 'cache_control.max_age_zero');
                }
            }