function()
            {
                $SS.conf["Mascots"] = Array.isArray($SS.conf["Mascots"]) ?
                    this.defaults.concat($SS.conf["Mascots"]) : this.defaults.slice(0);

                var eMascot = [],
                    mIndex;

                if ($SS.conf["Selected Mascots"] === 0)
                {
                    eMascot = $SS.conf["Mascots"];
                    mIndex  = Math.floor(Math.random() * eMascot.length);
                }
                else
                {
                    for (var i = 0, MAX = $SS.conf["Selected Mascots"].length, j; i < MAX; ++i)
                    {
                        j = $SS.conf["Selected Mascots"][i];

                        if ($SS.conf["Mascots"][j] == undefined)
                        {
                            $SS.conf["Selected Mascots"].splice(i, 1);
                            $SS.Config.set("Selected Mascots", $SS.conf["Selected Mascots"]);
                            continue;
                        }

                        if ($SS.conf["Mascots"][j].boards != null &&
                            $SS.conf["Mascots"][j].boards.split(",").indexOf($SS.location.board) == -1)
                            continue;

                        eMascot.push(j);
                    }

                    if (eMascot.length === 0)
                        return $SS.mascot = new $SS.Mascot(-1);
                    else
                        mIndex = $SS.conf["Selected Mascots"][Math.floor(Math.random() * eMascot.length)];
                }

                $SS.mascot = new $SS.Mascot(mIndex); // Set the active mascot.
            }