function(a){this.enterNode(a)!==!1&&(this.nodePath.push(a),a.getViewMatrix?this.applyCamera(a):this.applyNode(a),this.nodePath.pop())},enterNode:function(a){return a.boundingSphere!==
void 0&&!this.intersectSegmentWithSphere?!1:!0}