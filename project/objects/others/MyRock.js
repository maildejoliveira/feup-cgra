import {CGFobject, CGFappearance} from '../../../lib/CGF.js';

export class MyRock extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis
     * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
     * @param  {CGFtexture} texture - texture to be applied to the object
     */
    constructor(scene, slices, stacks, texture) {
      super(scene);
      this.latDivs = stacks * 2;
      this.longDivs = slices;

      this.material = new CGFappearance(scene);
      this.material.setTexture(texture);
      this.material.setEmission(0.4,0.4,0.4,1);
      this.material.setSpecular(0.8,0.8,0.8,1);
      this.material.setDiffuse(0.5,0.5,0.5,1);

      this.initBuffers();
    }
    /**
     * @method initBuffers
     * Initializes the sphere buffers
     */
    initBuffers() {
      this.vertices = [];
      this.indices = [];
      this.normals = [];
      this.texCoords = [];

      var phi = 0;
      var theta = 0;
      var phiInc = Math.PI / this.latDivs;
      var thetaInc = (2 * Math.PI) / this.longDivs;
      var latVertices = this.longDivs + 1;
      var longInc = 1/this.longDivs;
      var latInc = 1/(this.latDivs);

      // build an all-around stack at a time, starting on "north pole" and proceeding "south"
      for (let latitude = 0; latitude <= this.latDivs; latitude++) {
        var sinPhi = Math.sin(phi); //phi=15 -> sen(phi)=0.2588
        var cosPhi = Math.cos(phi); //phi 15 -> cos = 0.96

        // in each stack, build all the slices around, starting on longitude 0
        theta = 0;
        for (let longitude = 0; longitude <= this.longDivs; longitude++) {
          //--- Vertices coordinates
          var x = Math.cos(theta) * sinPhi;
          var y = cosPhi;
          var z = Math.sin(-theta) * sinPhi;
          var vector = [x,y,z];
          var rand = Math.random()*0.25-0.125;
          this.vertices.push(x*rand+x, y*rand+y, z*rand+z);
          

          //--- Indices
          if (latitude < this.latDivs && longitude < this.longDivs) {
            var current = latitude * latVertices + longitude;
            var next = current + latVertices;
            // pushing two triangles using indices from this round (current, current+1)
            // and the ones directly south (next, next+1)
            // (i.e. one full round of slices ahead)
            
            this.indices.push( current + 1, current, next);
            this.indices.push( current + 1, next, next +1);
          }

          //--- Normals
          // at each vertex, the direction of the normal is equal to 
          // the vector from the center of the sphere to the vertex.
          // in a sphere of radius equal to one, the vector length is one.
          // therefore, the value of the normal is equal to the position vectro
          this.normals.push(x, y, z);

          theta += thetaInc;

          //--- Texture Coordinates
          this.texCoords.push(longitude*longInc,latitude*latInc);
        }
        phi += phiInc;
      }

      this.primitiveType = this.scene.gl.TRIANGLES;
      this.initGLBuffers();
    }
    /**
     * Called to update the rocks position, following an hermite curve
     */
    update(){
      const dT3 = Math.pow(this.deltaT, 3);
      const dT2 = Math.pow(this.deltaT, 2);
      //Change position
      this.nestPosition.x = (2*dT3-3*dT2+1)*this.hermiteAttributes.p1[0] + (-2*dT3+3*dT2)*this.hermiteAttributes.p4[0] + (dT3-2*dT2+this.deltaT)*this.hermiteAttributes.r1[0] + (dT3-dT2)*this.hermiteAttributes.r4[0];
      this.nestPosition.y = (2*dT3-3*dT2+1)*this.hermiteAttributes.p1[1] + (-2*dT3+3*dT2)*this.hermiteAttributes.p4[1] + (dT3-2*dT2+this.deltaT)*this.hermiteAttributes.r1[1] + (dT3-dT2)*this.hermiteAttributes.r4[1];
      this.nestPosition.z = (2*dT3-3*dT2+1)*this.hermiteAttributes.p1[2] + (-2*dT3+3*dT2)*this.hermiteAttributes.p4[2] + (dT3-2*dT2+this.deltaT)*this.hermiteAttributes.r1[2] + (dT3-dT2)*this.hermiteAttributes.r4[2];
      
      //Change delta time
      this.deltaT+=0.2;
      
      if(this.nestPosition.y<=1.1){
        this.hasMovement=false;
      }
    }
    display(scene){
      scene.pushMatrix();
        this.material.apply();
        super.display();
      scene.popMatrix();
    }
}