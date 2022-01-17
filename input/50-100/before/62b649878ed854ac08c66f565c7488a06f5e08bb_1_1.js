function () {
            var otherEnv = new Types.Env({"foo": new Types.Int(4)}),
                evalEnv = new Types.Env({"other-env": otherEnv}, [Types.Env.makeGround()]);

            Q.equal(Squim.run('(eval foo other-env)', evalEnv).value, 4);
        }