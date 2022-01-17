function next() {
                S.prev = S.token;
                if (S.peeked) {
                        S.token = S.peeked;
                        S.peeked = null;
                } else {
                        S.token = S.input();
                }
                return S.token;
        }