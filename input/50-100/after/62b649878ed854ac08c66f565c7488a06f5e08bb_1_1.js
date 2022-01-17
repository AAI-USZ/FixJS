function () {
            var result = Squim.run('(eval (list list 1 2) (get-current-environment))');
            Q.equal(result.left.value, 1);
            Q.equal(result.right.left.value, 2);
        }