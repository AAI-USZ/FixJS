function () {
        var TreeNode = b.struct({
            left: {}, right: {},
            value: {}
        }), eg1, eg2;

        eg1 = new TreeNode({
            value: '',
            left: new TreeNode({
                value: 'l',
                right: new TreeNode({
                    value: 'l.r'
                }),
                left: new TreeNode({
                    value: 'l.l',
                })
            })
        });

        eg2 = new Path('left.right.left').replace(eg1, new TreeNode({ value: 'new' }));

        equal(eg2.left.right.left.value, 'new', 'replaced value should be at the property we expect');
        strictEqual(eg2.left.left, eg1.left.left, 'Properties that are not mentioned should be identical');
    }