function(a, b) {
                    if (a.priority < b.priority)
                        return 1;
                    else if (a.priority > b.priority)
                        return -1;
                    else if (a.score < b.score)
                        return 1;
                    else if (a.score > b.score)
                        return -1;
                    else if(a.name < b.name)
                        return -1;
                    else if(a.name > b.name)
                        return 1;
                    else
                        return 0;
                }