function(){
                var agents = ['Clippy', 'Links', 'Bonzi'];
                var selected_agent = agents[Math.round(Util.random(0, agents.length - 1))];
                clippy.BASE_PATH = 'http://static.tapin.tv/agents/'
                clippy.load(selected_agent, function(agent){
                    agent.show();
                    agent.gestureAt(0,0);
                    agent.speak("You look like you're trying to watch a video. Would you like some help?");
                    Async.every(20000, function(){
                        agent.animate();
                    });
                });
            }