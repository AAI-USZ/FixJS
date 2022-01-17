function() {
	    AnimEn.prototype.initialize.call(this);
	    
        ResourceManager.initLocalResources();
        
        ResourceManager.addResource("crown", "crown.png");
        ResourceManager.addResource("leaves", "leaves.png");
        ResourceManager.addResource("trunk", "trunk.png");
        ResourceManager.addResource("rect", "rect.png");
        ResourceManager.addResource("rect2", "rect2.png");
        ResourceManager.addResource("rect3", "rect3.png");
        
        ResourceManager.addResource("island", "island.jpg");
        ResourceManager.addResource("ship", "ship.png");
        ResourceManager.addResource("trunk1", "trunk/trunk1.png");
        ResourceManager.addResource("trunk2", "trunk/trunk2.png");
        ResourceManager.addResource("trunk3", "trunk/trunk3.png");
        ResourceManager.addResource("leaf1", "leaves/leaf1.png");
        ResourceManager.addResource("leaf2", "leaves/leaf2.png");
        ResourceManager.addResource("leaf3", "leaves/leaf3.png");
        ResourceManager.addResource("leaf4", "leaves/leaf4.png");
        ResourceManager.addResource("leaf5", "leaves/leaf5.png");
        ResourceManager.addResource("leaf6", "leaves/leaf6.png");
        ResourceManager.addResource("leaf7", "leaves/leaf7.png");
        
		if (Storage.supportsLocalStorage()) {
			properties = Storage.get("animation");
		}
		if (properties == null) {
			
		properties = {
			"defaultAnim": {
  "name": "",
  "x": 0,
  "y": 0,
  "children": {
    "island": {
      "name": "island",
      "x": 451,
      "y": 279,
      "children": {
        "palm": {
          "name": "palm",
          "x": -170,
          "y": 39,
          "children": {
            "trunk1": {
              "name": "trunk1",
              "x": 32,
              "y": 16,
              "children": {
                "trunk2": {
                  "name": "trunk2",
                  "x": 5,
                  "y": -58,
                  "children": {
                    "trunk3": {
                      "name": "trunk3",
                      "x": -6.261822288496942,
                      "y": -57.80121300495556,
                      "children": {
                        "leaves": {
                          "name": "leaves",
                          "x": -5.738177711503056,
                          "y": -88.19878699504443,
                          "children": {
                            "leaf1": {
                              "name": "leaf1",
                              "x": -1,
                              "y": 23,
                              "children": {},
                              "id": 10,
                              "refX": 0.8957969060384089,
                              "refY": 0.7580890905355233,
                              "rotation": 0.08301309025341697,
                              "width": 154,
                              "height": 49,
                              "resourceKey": "leaf1"
                            },
                            "leaf3": {
                              "name": "leaf3",
                              "x": -6,
                              "y": 23,
                              "children": {},
                              "id": 12,
                              "refX": 0.9001464956216063,
                              "refY": 0.6673458848685847,
                              "width": 118,
                              "height": 32,
                              "resourceKey": "leaf3"
                            },
                            "leaf4": {
                              "name": "leaf4",
                              "x": 0,
                              "y": 21,
                              "children": {},
                              "id": 13,
                              "refX": 0.09912345691991017,
                              "refY": 0.8097271312836375,
                              "rotation": -5.450942080895119,
                              "width": 126,
                              "height": 53,
                              "resourceKey": "leaf4"
                            },
                            "leaf5": {
                              "name": "leaf5",
                              "x": 2,
                              "y": 18,
                              "children": {},
                              "id": 14,
                              "refX": 0.12228349909725346,
                              "refY": 0.23228668032226962,
                              "rotation": 11.693690328766614,
                              "width": 102,
                              "height": 69,
                              "resourceKey": "leaf5"
                            },
                            "leaf6": {
                              "name": "leaf6",
                              "x": 2,
                              "y": 23,
                              "children": {},
                              "id": 15,
                              "refX": 0.1571496784880594,
                              "refY": 0.16794477720827672,
                              "rotation": 19.874412895147657,
                              "width": 80,
                              "height": 71,
                              "resourceKey": "leaf6"
                            },
                            "leaf7": {
                              "name": "leaf7",
                              "x": -12,
                              "y": 21,
                              "children": {},
                              "id": 16,
                              "refX": "0.80",
                              "refY": "0.160",
                              "rotation": 2.25,
                              "width": 104,
                              "height": 90,
                              "resourceKey": "leaf7"
                            },
                            "leaf2": {
                              "name": "leaf2",
                              "x": -6,
                              "y": 24,
                              "children": {},
                              "id": 11,
                              "refX": 0.6819001692069186,
                              "refY": 0.12063920942792247,
                              "width": 51,
                              "height": 121,
                              "resourceKey": "leaf2"
                            }
                          },
                          "id": 7,
                          "refX": 0.5,
                          "refY": 0.5,
                          "width": 100,
                          "height": 100,
                          "animations": {
                              "tween": {
                                "10": {
                                  "1": {
                                    "x": -1,
                                    "y": 23,
                                    "rotation": 2.292342191080762,
                                    "refX": 0.8957969060384089,
                                    "refY": 0.7580890905355233
                                  },
                                  "60": {
                                    "x": -1,
                                    "y": 23,
                                    "rotation": 2.292342191080762,
                                    "refX": 0.8957969060384089,
                                    "refY": 0.7580890905355233
                                  },
                                  "30": {
                                    "x": -1,
                                    "y": 23,
                                    "rotation": -2.1263160105739285,
                                    "refX": 0.8957969060384089,
                                    "refY": 0.7580890905355233
                                  }
                                },
                                "13": {
                                  "1": {
                                    "x": 0,
                                    "y": 21,
                                    "rotation": -8.184510929559421,
                                    "refX": 0.09912345691991017,
                                    "refY": 0.8097271312836375
                                  },
                                  "60": {
                                    "x": 0,
                                    "y": 21,
                                    "rotation": -8.184510929559421,
                                    "refX": 0.09912345691991017,
                                    "refY": 0.8097271312836375
                                  },
                                  "30": {
                                    "x": 0,
                                    "y": 21,
                                    "rotation": -6.38428819193348,
                                    "refX": 0.09912345691991017,
                                    "refY": 0.8097271312836375
                                  },
                                  "45": {
                                    "x": 0,
                                    "y": 21,
                                    "rotation": -5.450942080895119,
                                    "refX": 0.09912345691991017,
                                    "refY": 0.8097271312836375
                                  }
                                },
                                "14": {
                                  "1": {
                                    "x": 2,
                                    "y": 18,
                                    "rotation": 8.648984190591333,
                                    "refX": 0.12228349909725346,
                                    "refY": 0.23228668032226962
                                  },
                                  "30": {
                                    "x": 2,
                                    "y": 18,
                                    "rotation": 14.738396466941897,
                                    "refX": 0.12228349909725346,
                                    "refY": 0.23228668032226962
                                  },
                                  "60": {
                                    "x": 2,
                                    "y": 18,
                                    "rotation": 8.648984190591333,
                                    "refX": 0.12228349909725346,
                                    "refY": 0.23228668032226962
                                  },
                                  "15": {
                                    "x": 2,
                                    "y": 18,
                                    "rotation": 9.485979428988639,
                                    "refX": 0.12228349909725346,
                                    "refY": 0.23228668032226962
                                  }
                                },
                                "15": {
                                  "1": {
                                    "x": 2,
                                    "y": 23,
                                    "rotation": 18.859932706334927,
                                    "refX": 0.1571496784880594,
                                    "refY": 0.16794477720827672
                                  },
                                  "60": {
                                    "x": 2,
                                    "y": 23,
                                    "rotation": 18.859932706334927,
                                    "refX": 0.1571496784880594,
                                    "refY": 0.16794477720827672
                                  },
                                  "20": {
                                    "x": 2,
                                    "y": 23,
                                    "rotation": 21.565213209835537,
                                    "refX": 0.1571496784880594,
                                    "refY": 0.16794477720827672
                                  }
                                },
                                "16": {
                                  "1": {
                                    "x": -12,
                                    "y": 21,
                                    "rotation": 0,
                                    "refX": "0.8",
                                    "refY": "0.16"
                                  },
                                  "60": {
                                    "x": -12,
                                    "y": 21,
                                    "rotation": 0,
                                    "refX": "0.8",
                                    "refY": "0.16"
                                  },
                                  "40": {
                                    "x": -12,
                                    "y": 21,
                                    "rotation": 3,
                                    "refX": "0.8",
                                    "refY": "0.16"
                                  }
                                }
                              }
                          }
                        }
                      },
                      "id": 5,
                      "refX": 0.5175756597976918,
                      "refY": 0.937663579638325,
                      "rotation": 1.8637534392441877,
                      "width": 42,
                      "height": 69,
                      "resourceKey": "trunk3"
                    }
                  },
                  "id": 4,
                  "refX": 0.575,
                  "refY": 0.9166666666666666,
                  "rotation": 1.8328384570831957,
                  "width": 40,
                  "height": 72,
                  "resourceKey": "trunk2"
                }
              },
              "id": 3,
              "refX": 0.4166666666666667,
              "refY": 0.9117647058823529,
              "width": 36,
              "height": 68,
              "resourceKey": "trunk1"
            }
          },
          "id": 2,
          "refX": 0.5,
          "refY": 0.5,
          "width": 100,
          "height": 100,
          "animations": {
              "tween": {
                "4": {
                  "1": {
                    "x": 5,
                    "y": -58,
                    "rotation": 2.1210963966581033,
                    "refX": 0.575,
                    "refY": 0.9166666666666666
                  },
                  "60": {
                    "x": 5,
                    "y": -58,
                    "rotation": 2.1210963966581033,
                    "refX": 0.575,
                    "refY": 0.9166666666666666
                  },
                  "20": {
                    "x": 5,
                    "y": -58,
                    "rotation": 1.3524085577916822,
                    "refX": 0.575,
                    "refY": 0.9166666666666666
                  }
                },
                "5": {
                  "1": {
                    "x": -6.261822288496942,
                    "y": -57.80121300495556,
                    "rotation": 0,
                    "refX": 0.5175756597976918,
                    "refY": 0.937663579638325
                  },
                  "60": {
                    "x": -6.261822288496942,
                    "y": -57.80121300495556,
                    "rotation": 0,
                    "refX": 0.5175756597976918,
                    "refY": 0.937663579638325
                  },
                  "45": {
                    "x": -6.261822288496942,
                    "y": -57.80121300495556,
                    "rotation": 1.8637534392441877,
                    "refX": 0.5175756597976918,
                    "refY": 0.937663579638325
                  }
                }
              }
          }
        },
        "ship": {
          "name": "ship",
          "x": 269,
          "y": 197,
          "children": {},
          "id": 1,
          "refX": 0.4520547945205479,
          "refY": 0.6610169491525424,
          "rotation": 4.037937608301183,
          "width": 146,
          "height": 118,
          "resourceKey": "ship"
        }
      },
      "id": 0,
      "refX": 0.5,
      "refY": 0.5,
      "width": 908,
      "height": 574,
      "resourceKey": "island"
    }
  },
  "refX": 0.5,
  "refY": 0.5,
  "animations": {
      "tween": {
        "1": {
          "1": {
            "x": 269,
            "y": 197,
            "rotation": 1.6267503648447772,
            "refX": 0.4520547945205479,
            "refY": 0.6610169491525424
          },
          "60": {
            "x": 269,
            "y": 197,
            "rotation": 1.6267503648447772,
            "refX": 0.4520547945205479,
            "refY": 0.6610169491525424
          },
          "40": {
            "x": 269,
            "y": 197,
            "rotation": 4.8416666894533185,
            "refX": 0.4520547945205479,
            "refY": 0.6610169491525424
          }
        }
      }
  }
}
};
		}
		
		Storage.set("animation", properties);
        
        
        
        for (var sceneKey in properties) {
        	this.addScene(sceneKey, properties[sceneKey]);
        }
        
        this.activeScene = Storage.getString("activeScene");
        if (this.activeScene == null) {
        	this.activeScene = "defaultAnim";
        }
        this.setActiveScene(this.activeScene);
        
	}