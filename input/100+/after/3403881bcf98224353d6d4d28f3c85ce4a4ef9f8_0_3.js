function cubicvr_loadCollada(meshUrl, prefix, deferred_bin) {

      var clib = cubicvr_parseCollada(meshUrl, prefix, deferred_bin);

      var up_axis = clib.up_axis;

      var materialRef = [];

      var pInterp;

      var m, mMax, c, cMax, l, lMax, t, tMax, mp, mpMax, p, pMax, s, sMax, so, soMax;

      for (m = 0, mMax = clib.materials.length; m < mMax; m++) {

          var material = clib.materials[m];
          var newMaterial = new base.Material(material.mat);
          newMaterial.name = material.name||null;

          for (t = 0, tMax = material.mat.textures_ref.length; t < tMax; t++) {
              var tex = material.mat.textures_ref[t];

              var texObj = null;

              if (base.Textures_ref[tex.image] === undefined) {
                  texObj = new base.Texture(tex.image, GLCore.default_filter, deferred_bin, meshUrl);
              } else {
                  texObj = base.Textures_obj[base.Textures_ref[tex.image]];
              }

              newMaterial.setTexture(texObj, tex.type);
          }

          materialRef[material.id] = newMaterial;
      }


      var meshRef = [];

      for (m = 0, mMax = clib.meshes.length; m < mMax; m++) {

          var meshData = clib.meshes[m];

          var newObj = new base.Mesh({name:meshData.id});

          newObj.points = meshData.points;
          
          var hasNormals = false;

          for (mp = 0, mpMax = meshData.parts.length; mp < mpMax; mp++) {
              var part = meshData.parts[mp];

              if (part.material !== 0) {
                  var mpart = materialRef[part.material];
                  if (!mpart) mpart = new base.Material({name:part.material});
                  newObj.setFaceMaterial(mpart);
              }

              var bNorm = part.normals.length ? true : false;
              var bTex = part.texcoords.length ? true : false;
              var bColor = part.colors.length ? true : false;
              if (bColor) materialRef[part.material].color_map = true;

              for (p = 0, pMax = part.faces.length; p < pMax; p++) {
                  var faceNum = newObj.addFace(part.faces[p]);
                  if (bNorm) newObj.faces[faceNum].point_normals = part.normals[p];
                  if (bTex) newObj.faces[faceNum].uvs = part.texcoords[p];
                  if (bColor) newObj.faces[faceNum].point_colors = part.colors[p];
              }
              
              hasNormals |= bNorm;
          }

          if (newObj.faces.length) {            
            // newObj.calcNormals();
            if (!deferred_bin) {
                if (!hasNormals) newObj.calcNormals();
                newObj.triangulateQuads();
                newObj.compile();
            } else {
                deferred_bin.addMesh(meshUrl, meshUrl + ":" + meshId, newObj);
            }

            meshRef[meshData.id] = newObj;
          }
      }


      var camerasRef = [];

      for (c = 0, cMax = clib.cameras.length; c < cMax; c++) {
          camerasRef[clib.cameras[c].id] = clib.cameras[c];
      }


      var lightsRef = [];

      for (l = 0, lMax = clib.lights.length; l < lMax; l++) {
          lightsRef[clib.lights[l].id] = clib.lights[l];
      }



      var sceneObjectMap = {};
      var sceneLightMap = {};
      var sceneCameraMap = {};

      var scenesRef = {};

      for (s = 0, sMax = clib.scenes.length; s < sMax; s++) {
          var scn = clib.scenes[s];

          var newScene = new base.Scene();

          for (so = 0, soMax = scn.sceneObjects.length; so < soMax; so++) {
              var sceneObj = scn.sceneObjects[so];
              var newSceneObject = new base.SceneObject(sceneObj);
              var srcMesh = (meshRef[sceneObj.meshName]?meshRef[sceneObj.meshName]:meshRef[sceneObj.meshId]) || null;
              newSceneObject.obj = srcMesh;
              
              if (sceneObj.matrix) {
                newSceneObject.setMatrix(sceneObj.matrix);                
              }

              sceneObjectMap[sceneObj.id] = newSceneObject;
              newScene.bindSceneObject(newSceneObject);
          }

          for (l = 0, lMax = scn.lights.length; l < lMax; l++) {
              var lt = scn.lights[l];

              var newLight = new base.Light(lightsRef[lt.source]);
              newLight.position = lt.position;
              newLight.rotation = lt.rotation;

              sceneLightMap[lt.id] = newLight;
              newScene.bindLight(newLight);
          }

          if (scn.cameras.length) { // single camera for the moment until we support it
              var cam = scn.cameras[0];
              var newCam = new base.Camera(camerasRef[cam.source]);
              newCam.position = cam.position;
              newCam.rotation = cam.rotation;

              sceneCameraMap[cam.id] = newCam;
              newScene.camera = newCam;
          }
          for (p = 0, pMax = scn.parentMap.length; p < pMax; p++) {
              var pmap = scn.parentMap[p];
              sceneObjectMap[pmap.parent].bindChild(sceneObjectMap[pmap.child]);
          }

          scenesRef[scn.id] = newScene;
      }



      for (var animId in clib.animations) {
          if (clib.animations.hasOwnProperty(animId)) {
              var anim = clib.animations[animId];

              if (anim.channels.length) {
                  for (cCount = 0, cMax = anim.channels.length; cCount < cMax; cCount++) {
                      var chan = anim.channels[cCount];
                      var sampler = anim.samplers[chan.source];
                      var samplerInput = anim.sources[sampler["INPUT"]];
                      var samplerOutput = anim.sources[sampler["OUTPUT"]];
                      var samplerInterp = anim.sources[sampler["INTERPOLATION"]];
                      var samplerInTangent = anim.sources[sampler["IN_TANGENT"]];
                      var samplerOutTangent = anim.sources[sampler["OUT_TANGENT"]];
                      var hasInTangent = (sampler["IN_TANGENT"] !== undef);
                      var hasOutTangent = (sampler["OUT_TANGENT"] !== undef);
                      var mtn = null;

                      var targetSceneObject = sceneObjectMap[chan.targetName];
                      var targetCamera = sceneCameraMap[chan.targetName];
                      var targetLight = sceneLightMap[chan.targetName];

                      if (targetSceneObject) {
                          if (targetSceneObject.motion === null) {
                              targetSceneObject.motion = new base.Motion();
                          }
                          mtn = targetSceneObject.motion;
                      } else if (targetCamera) {
                          if (targetCamera.motion === null) {
                              targetCamera.motion = new base.Motion();
                          }

                          mtn = targetCamera.motion;
                      } else if (targetLight) {
                          if (targetLight.motion === null) {
                              targetLight.motion = new base.Motion();
                          }

                          mtn = targetLight.motion;
                      }
                      // else
                      // {
                      //   console.log("missing",chan.targetName);
                      //   console.log("missing",chan.paramName);
                      // }
                      if (mtn === null) {
                          continue;
                      }

                      var controlTarget = enums.motion.POS;
                      var motionTarget = enums.motion.X;

                      if (up_axis === 2) {
                          mtn.yzflip = true;
                      }

                      var pName = chan.paramName;

                      if (pName === "rotateX" || pName === "rotationX") {
                          controlTarget = enums.motion.ROT;
                          motionTarget = enums.motion.X;
                      } else if (pName === "rotateY" || pName === "rotationY") {
                          controlTarget = enums.motion.ROT;
                          motionTarget = enums.motion.Y;
                      } else if (pName === "rotateZ" || pName === "rotationZ") {
                          controlTarget = enums.motion.ROT;
                          motionTarget = enums.motion.Z;
                      } else if (pName === "location") {
                          controlTarget = enums.motion.POS;
                          if (chan.typeName === "X") {
                              motionTarget = enums.motion.X;
                          }
                          if (chan.typeName === "Y") {
                              motionTarget = enums.motion.Y;
                          }
                          if (chan.typeName === "Z") {
                              motionTarget = enums.motion.Z;
                          }
                      } else if (pName === "translate") {
                          controlTarget = enums.motion.POS;
                          if (chan.typeName === "X") {
                              motionTarget = enums.motion.X;
                          }
                          if (chan.typeName === "Y") {
                              motionTarget = enums.motion.Y;
                          }
                          if (chan.typeName === "Z") {
                              motionTarget = enums.motion.Z;
                          }
                      } else if (pName === "LENS") {
                          // controlTarget = enums.motion.LENS;
                          // motionTarget = 4;
                          controlTarget = 10;
                          motionTarget = 10;
                          continue; // disabled, only here for temporary collada files
                      } else if (pName === "FOV") {
                          controlTarget = enums.motion.FOV;
                          motionTarget = 3; // ensure no axis fixes are applied
                      } else if (pName === "ZNEAR") {
                          controlTarget = enums.motion.NEARCLIP;
                          motionTarget = 3; // ensure no axis fixes are applied
                      } else if (pName === "ZFAR") {
                          controlTarget = enums.motion.FARCLIP;
                          motionTarget = 3; // ensure no axis fixes are applied
                      } else if (pName === "intensity") {
                          controlTarget = enums.motion.INTENSITY;
                          motionTarget = 3; // ensure no axis fixes are applied
                      }

                      if (targetLight && controlTarget < 3) targetLight.method = enums.light.method.DYNAMIC;

                      // if (up_axis === 2 && motionTarget === enums.motion.Z) motionTarget = enums.motion.Y;
                      // else if (up_axis === 2 && motionTarget === enums.motion.Y) motionTarget = enums.motion.Z;
                      // 
                      var ival;
                      for (mCount = 0, mMax = samplerInput.data.length; mCount < mMax; mCount++) { // in the process of being deprecated
                          k = null;

                          if (typeof(samplerOutput.data[mCount]) === 'object') {
                              for (i = 0, iMax = samplerOutput.data[mCount].length; i < iMax; i++) {
                                  ival = i;

                                  if (up_axis === 2 && i === 2) {
                                      ival = 1;
                                  } else if (up_axis === 2 && i === 1) {
                                      ival = 2;
                                  }

                                  k = mtn.setKey(controlTarget, ival, samplerInput.data[mCount], collada_tools.fixukaxis(clib.up_axis, controlTarget, ival, samplerOutput.data[mCount][i]));

                                  if (samplerInterp) {
                                      pInterp = samplerInterp.data[mCount][i];
                                      if (pInterp === "LINEAR") {
                                          k.shape = enums.envelope.shape.LINE;
                                      } else if (pInterp === "BEZIER") {
                                          if (!(hasInTangent || hasOutTangent)) {
                                              k.shape = enums.envelope.shape.LINEAR;
                                          } else {
                                              k.shape = enums.envelope.shape.BEZI;
                                          }
                                      }
                                  }
                              }
                          } else {
                              ival = motionTarget;
                              ofs = 0;

                              if (targetCamera) {
                                  if (controlTarget === enums.motion.ROT) {
                                      if (up_axis === 2 && ival === 0) {
                                          ofs = -90;
                                      }
                                  }
                              }

                              if (controlTarget === enums.motion.ROT) {
                                  k = mtn.setKey(controlTarget, ival, samplerInput.data[mCount], samplerOutput.data[mCount] + ofs);
                              } else {
                                  if (up_axis === 2 && motionTarget === 2) {
                                      ival = 1;
                                  } else if (up_axis === 2 && motionTarget === 1) {
                                      ival = 2;
                                  }

                                  k = mtn.setKey(controlTarget, ival, samplerInput.data[mCount], collada_tools.fixukaxis(clib.up_axis, controlTarget, ival, samplerOutput.data[mCount]));
                              }

                              if (samplerInterp) {
                                  pInterp = samplerInterp.data[mCount];
                                  if (pInterp === "LINEAR") {
                                      k.shape = enums.envelope.shape.LINE;
                                  } else if (pInterp === "BEZIER") {
                                      if (!(hasInTangent || hasOutTangent)) {
                                          k.shape = enums.envelope.shape.LINEAR;
                                          k.continutity = 1.0;
                                      } else {
                                          k.shape = enums.envelope.shape.BEZ2;

                                          var itx = samplerInTangent.data[mCount][0],
                                              ity;
                                          var otx = samplerOutTangent.data[mCount][0],
                                              oty;

                                          if (controlTarget === enums.motion.ROT) {
                                              ity = samplerInTangent.data[mCount][1];
                                              oty = samplerOutTangent.data[mCount][1];

                                              //  k.value = k.value/10;
                                              //  mtn.rscale = 10;
                                              k.param[0] = itx - k.time;
                                              k.param[1] = ity - k.value + ofs;
                                              k.param[2] = otx - k.time;
                                              k.param[3] = oty - k.value + ofs;
                                          } else {
                                              ity = collada_tools.fixukaxis(clib.up_axis, controlTarget, ival, samplerInTangent.data[mCount][1]);
                                              oty = collada_tools.fixukaxis(clib.up_axis, controlTarget, ival, samplerOutTangent.data[mCount][1]);

                                              k.param[0] = itx - k.time;
                                              k.param[1] = ity - k.value;
                                              k.param[2] = otx - k.time;
                                              k.param[3] = oty - k.value;
                                          }

                                      }
                                  }
                              }
                          }
                      }
                  }
              }
          }
      }



      var sceneRef = null;

      if (clib.scene) {
          sceneRef = scenesRef[clib.scene];
      } else {
          sceneRef = scenesRef.pop();
      }


      return sceneRef;
  }