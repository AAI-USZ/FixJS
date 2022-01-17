function () {
            var result;

            result = Squim.run('($lambda x x)');

            Q.equal(result.operative.formals.value, 'x');
            Q.equal(result.operative.expr.value, 'x');

            result = Squim.run('(($lambda (x) x) 2)');
            Q.equal(result.value, 2);

            result = Squim.run('(($lambda x x) 2)');
            Q.equal(result.left.value, 2);
        }