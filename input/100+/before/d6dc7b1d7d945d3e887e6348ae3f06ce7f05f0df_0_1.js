function printEmail() {
			/* Original idea taken from Mihai Parparita, http://persistent.info */
            var a = [106, 117, 114, 105, 46, 115, 116, 114, 117, 109, 112, 102, 108, 111,
                    104, 110, 101, 114, 64, 106, 115, 45, 100, 101, 118, 101, 108, 111, 112, 109, 101,
                    110, 116, 46, 99, 111, 109];
            var b = [];
            for (var i = 0; i < a.length; i++) {
                    b.push(String.fromCharCode(a[i]));
            }
            b = b.join('');
            return "mailto:" + b;
        }