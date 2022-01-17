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
		// Fix for the old animationformat. If in the properties there is an object at first this is the old animation format
		if (properties != null) {
			for (var key in properties) {
				if (key == "x" && (typeof properties[key] == Number)) {
					properties = null;
					break;
				}
			}
		}
		if (properties == null) {
			
		properties = {
  "defaultAnim": {
    "x": 0,
    "y": 0,
    "name": "",
    "refX": 0.5,
    "refY": 0.5,
    "children": {
      "island": {
        "x": 451,
        "y": 279,
        "width": 908,
        "height": 574,
        "id": 0,
        "name": "island",
        "refX": 0.5,
        "refY": 0.5,
        "children": {
          "palm": {
            "x": -170,
            "y": 39,
            "width": 100,
            "height": 100,
            "id": 2,
            "name": "palm",
            "refX": 0.5,
            "refY": 0.5,
            "children": {
              "trunk1": {
                "x": 32,
                "y": 16,
                "width": 36,
                "height": 68,
                "id": 3,
                "name": "trunk1",
                "refX": 0.4166666666666667,
                "refY": 0.9117647058823529,
                "children": {
                  "trunk2": {
                    "x": 5,
                    "y": -58,
                    "rotation": 2.1210963966581033,
                    "width": 40,
                    "height": 72,
                    "id": 4,
                    "name": "trunk2",
                    "refX": 0.575,
                    "refY": 0.9166666666666666,
                    "children": {
                      "trunk3": {
                        "x": -6.261822288496942,
                        "y": -57.80121300495556,
                        "rotation": 0,
                        "width": 42,
                        "height": 69,
                        "id": 5,
                        "name": "trunk3",
                        "refX": 0.5175756597976918,
                        "refY": 0.937663579638325,
                        "children": {
                          "leaves": {
                            "x": -5,
                            "y": -88,
                            "width": 100,
                            "height": 100,
                            "id": 7,
                            "name": "leaves",
                            "refX": 0.5,
                            "refY": 0.5,
                            "children": {
                              "leaf1": {
                                "x": -1,
                                "y": 23,
                                "rotation": 2.292342191080762,
                                "width": 154,
                                "height": 49,
                                "id": 10,
                                "name": "leaf1",
                                "refX": 0.8957969060384089,
                                "refY": 0.7580890905355233,
                                "children": {},
                                "resourceKey": "leaf1"
                              },
                              "leaf3": {
                                "x": -6,
                                "y": 23,
                                "width": 118,
                                "height": 32,
                                "id": 12,
                                "name": "leaf3",
                                "refX": 0.9001464956216063,
                                "refY": 0.6673458848685847,
                                "children": {},
                                "resourceKey": "leaf3"
                              },
                              "leaf4": {
                                "x": 0,
                                "y": 21,
                                "rotation": -8.184510929559421,
                                "width": 126,
                                "height": 53,
                                "id": 13,
                                "name": "leaf4",
                                "refX": 0.09912345691991017,
                                "refY": 0.8097271312836375,
                                "children": {},
                                "resourceKey": "leaf4"
                              },
                              "leaf5": {
                                "x": 5.086243722412251,
                                "y": 15.580102824645568,
                                "rotation": 8.648984190591333,
                                "width": 102,
                                "height": 69,
                                "id": 14,
                                "name": "leaf5",
                                "refX": 0.12228349909725346,
                                "refY": 0.23228668032226962,
                                "children": {},
                                "resourceKey": "leaf5"
                              },
                              "leaf6": {
                                "x": 2,
                                "y": 23,
                                "rotation": 18.859932706334927,
                                "width": 80,
                                "height": 71,
                                "id": 15,
                                "name": "leaf6",
                                "refX": 0.1571496784880594,
                                "refY": 0.16794477720827672,
                                "children": {},
                                "resourceKey": "leaf6"
                              },
                              "leaf7": {
                                "x": -12,
                                "y": 21,
                                "rotation": 0,
                                "width": 104,
                                "height": 90,
                                "id": 16,
                                "name": "leaf7",
                                "refX": "0.8",
                                "refY": "0.16",
                                "children": {},
                                "resourceKey": "leaf7"
                              },
                              "leaf2": {
                                "x": -6,
                                "y": 24,
                                "width": 51,
                                "height": 121,
                                "id": 11,
                                "name": "leaf2",
                                "refX": 0.6819001692069186,
                                "refY": 0.12063920942792247,
                                "children": {},
                                "resourceKey": "leaf2"
                              }
                            },
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
                                    "x": 5.086243722412251,
                                    "y": 15.580102824645568,
                                    "rotation": 8.648984190591333,
                                    "refX": 0.12228349909725346,
                                    "refY": 0.23228668032226962,
                                    "width": 102,
                                    "height": 69
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
                        "resourceKey": "trunk3"
                      }
                    },
                    "resourceKey": "trunk2"
                  }
                },
                "resourceKey": "trunk1"
              }
            },
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
            "x": 269,
            "y": 197,
            "rotation": 1.6267503648447772,
            "width": 146,
            "height": 118,
            "id": 1,
            "name": "ship",
            "refX": 0.4520547945205479,
            "refY": 0.6610169491525424,
            "children": {},
            "resourceKey": "ship"
          }
        },
        "resourceKey": "island"
      }
    },
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
  },
  "pendulum": {
    "x": 0,
    "y": 0,
    "name": "",
    "refX": 0.5,
    "refY": 0.5,
    "children": {
      "new17": {
        "x": 309,
        "y": 3,
        "rotation": 45.29950474459515,
        "width": 10,
        "height": 179,
        "id": 17,
        "name": "new17",
        "refX": 0.5,
        "refY": 0.01,
        "children": {
          "new19": {
            "x": 0,
            "y": 213,
            "width": 100,
            "height": 100,
            "id": 19,
            "name": "new19",
            "refX": 0.5,
            "refY": 0.5,
            "children": {},
            "resourceKey": "rect3"
          }
        },
        "resourceKey": "rect"
      }
    },
    "animations": {
      "tween": {
        "17": {
          "1": {
            "x": 309,
            "y": 3,
            "rotation": 45.29950474459515,
            "refX": 0.5,
            "refY": 0.01,
            "width": 10,
            "height": 179,
            "timingFunc": "ease-in-out"
          },
          "30": {
            "x": 309,
            "y": 3,
            "rotation": -44.8891744181293,
            "refX": 0.5,
            "refY": 0.01,
            "width": 10,
            "height": 179,
            "timingFunc": "ease-in-out"
          },
          "60": {
            "x": 309,
            "y": 3,
            "rotation": 45.05605388229702,
            "refX": 0.5,
            "refY": 0.01,
            "width": 10,
            "height": 179
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