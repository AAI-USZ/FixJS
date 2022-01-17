function(looser){
		Crafty.audio.play("gameOver");
		Crafty.sprite(290, "img/GameOverScreen_VicoryText.png", {
			endTextSpriteVictory: [0, 0],
			endTextSpriteDefeat: [1, 0]
		});
		Crafty.sprite(291, "img/GameOverScreen_RedVictory.png", {
			redSpriteVictory: [0, 0]
		});
		Crafty.sprite(291, "img/GameOverScreen_RedDefeat.png", {
			redSpriteDefeat: [0, 0]
		});
		Crafty.sprite(289, "img/GameOverScreen_BlueVictory.png", {
			blueSpriteVictory: [0, 0]
		});
		Crafty.sprite(289, "img/GameOverScreen_BlueDefeat.png", {
			blueSpriteDefeat: [0, 0]
		});
		
		Crafty.sprite(285, "img/GameOverScreen_StatsText.png", {
			statsText: [0, 0]
		});
		
		if (looser.id == 1) {
			Crafty.e("endText, endTextSpriteVictory").attr({ w: 290, h: 120, x: 630, y: 220});
			Crafty.e("endText, endTextSpriteDefeat").attr({ w: 290, h: 120, x: 90, y: 220});
			Crafty.e("finalTribute, redSpriteDefeat").attr({ w: 290, h: 220, x: 90, y: 0}).finalTribute();
			Crafty.e("finalTribute, blueSpriteVictory").attr({ w: 290, h: 220, x: 620, y: 0}).finalTribute();
		} else {
			Crafty.e("endText, endTextSpriteVictory").attr({ w: 290, h: 120, x: 90, y: 220});
			Crafty.e("endText, endTextSpriteDefeat").attr({ w: 290, h: 120, x: 630, y: 220});
			Crafty.e("finalTribute, redSpriteVictory").attr({ w: 290, h: 220, x: 90, y: 0}).finalTribute();
			Crafty.e("finalTribute, blueSpriteDefeat").attr({ w: 290, h: 220, x: 620, y: 0}).finalTribute();
		}
		
		Crafty.e("endText, endEAT").attr({ w: 220, h: 230, x: 375, y: 0});
		Crafty.e("endText, statsText").attr({ w: 285, h: 240, x: 90, y: 335});
		Crafty.e("endText, statsText").attr({ w: 285, h: 240, x: 620, y: 335});
		
		
		/* Winner */
		Crafty.e("2D, DOM, Text").attr({ w: 50, h: 20, x: 290, y: 352})
				.text("-")
				.css({ "color" : "#FFF", "font-size" : "30px", "text-align": "center", "font-weight" : "bold", "font-family" : "Arial, Helvetica, sans-serif" });
		Crafty.e("2D, DOM, Text").attr({ w: 50, h: 10, x: 290, y: 395})
				.text("-")
				.css({ "color" : "#FFF", "font-size" : "19px", "text-align": "center", "font-weight" : "bold", "font-family" : "Arial, Helvetica, sans-serif" });
		Crafty.e("2D, DOM, Text").attr({ w: 50, h: 10, x: 290, y: 418})
				.text("-")
				.css({ "color" : "#FFF", "font-size" : "19px", "text-align": "center", "font-weight" : "bold", "font-family" : "Arial, Helvetica, sans-serif" });
		Crafty.e("2D, DOM, Text").attr({ w: 50, h: 10, x: 290, y: 441})
				.text("-")
				.css({ "color" : "#FFF", "font-size" : "19px", "text-align": "center", "font-weight" : "bold", "font-family" : "Arial, Helvetica, sans-serif" });
		Crafty.e("2D, DOM, Text").attr({ w: 50, h: 10, x: 290, y: 464})
				.text("-")
				.css({ "color" : "#FFF", "font-size" : "19px", "text-align": "center", "font-weight" : "bold", "font-family" : "Arial, Helvetica, sans-serif" });
				
		/* Looser */
		Crafty.e("2D, DOM, Text").attr({ w: 50, h: 20, x: 820, y: 352})
				.text("-")
				.css({ "color" : "#FFF", "font-size" : "30px", "text-align": "center", "font-weight" : "bold", "font-family" : "Arial, Helvetica, sans-serif" });
		Crafty.e("2D, DOM, Text").attr({ w: 50, h: 10, x: 820, y: 395})
				.text("-")
				.css({ "color" : "#FFF", "font-size" : "19px", "text-align": "center", "font-weight" : "bold", "font-family" : "Arial, Helvetica, sans-serif" });
		Crafty.e("2D, DOM, Text").attr({ w: 50, h: 10, x: 820, y: 418})
				.text("-")
				.css({ "color" : "#FFF",  "font-size" : "19px", "text-align": "center", "font-weight" : "bold", "font-family" : "Arial, Helvetica, sans-serif" });
		Crafty.e("2D, DOM, Text").attr({ w: 50, h: 10, x: 820, y: 441})
				.text("-")
				.css({ "color" : "#FFF", "font-size" : "19px", "text-align": "center", "font-weight" : "bold", "font-family" : "Arial, Helvetica, sans-serif" });
		Crafty.e("2D, DOM, Text").attr({ w: 50, h: 10, x: 820, y: 464})
				.text("-")
				.css({ "color" : "#FFF",  "font-size" : "19px", "text-align": "center", "font-weight" : "bold", "font-family" : "Arial, Helvetica, sans-serif" });
	}