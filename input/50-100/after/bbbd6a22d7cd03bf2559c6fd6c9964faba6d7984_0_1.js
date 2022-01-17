function() {
            var fileName;

            fileName = page.evaluate(function() {
                return document.getElementById('file').files[0].fileName;
            });
            expect(fileName).toEqual('README.md');

            fileName = page.evaluate(function() {
                return document.getElementById('file2').files[0].fileName;
            });
            expect(fileName).toEqual('README.md');
        }