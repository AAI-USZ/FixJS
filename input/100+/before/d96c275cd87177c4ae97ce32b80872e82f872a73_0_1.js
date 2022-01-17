function(row)
            {
                var normal = row.clientHeight;

                // Increase text size and verify
                FW.FBL.$("cmd_increaseTextSize").doCommand();
                FBTest.ok(normal < row.clientHeight,
                    "Increased text size must be bigger than the default value.");

                // Reset text size and verify
                FW.FBL.$("cmd_normalTextSize").doCommand();
                FBTest.ok(normal == row.clientHeight,
                    "Normal text size must correspond to the default value");

                // Decrease text size and verify
                FW.FBL.$("cmd_decreaseTextSize").doCommand();
                FW.FBL.$("cmd_decreaseTextSize").doCommand();  // twice because of rounding error in the font-size-adjust version.
                FBTest.ok(normal > row.clientHeight,
                    "Decreased text size must be smaller than the default value.");

                FW.FBL.$("cmd_normalTextSize").doCommand();

                FBTest.testDone("textSize.DONE");
            }