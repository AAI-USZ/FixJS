function () {
            var result;

            result = Squim.run('($lambda x x)');

            Q.equal(result.operative.formals.value, 'x');
            Q.equal(result.operative.expr.value, 'x');

            result = Squim.run('(apply ($lambda x x) 2)');
            Q.equal(result.value, 2);
        }