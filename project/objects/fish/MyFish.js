import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../../../lib/CGF.js';
import { MySphere } from '../primitives/MySphere.js';
import { MyTriangle } from '../primitives/MyTriangle.js';

export class MyFish extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {float} ratio - number representing the percentage of the head in relation to the rest of the fish's body 
   * @param  {CGFtexture} scaleTexture - texture to be applied to the fish
   * @param  {array} color - array with r, g and b values to be applied in the fish's shader 
   */
  constructor(scene, ratio, scaleTexture, color) {
    super(scene);

    //Textures
    this.scalesTexture = scaleTexture;
    this.eyesTexture = new CGFtexture(scene, "images/fisheye.png");

    //Material
    this.fishMaterial = new CGFappearance(scene);
    this.fishMaterial.setDiffuse( color[0], color[1], color[2], 1.0);
  
    //Body elements
    this.body = new MySphere(scene, 50, 50, this.scalesTexture);
    this.leftEye = new MySphere(scene, 50, 50, this.eyesTexture);
    this.rightEye = new MySphere(scene, 50, 50, this.eyesTexture);
    this.tale = new MyTriangle(scene);
    this.dorsalFin = new MyTriangle(scene);
    this.leftFin = new MyTriangle(scene);
    this.rightFin = new MyTriangle(scene);

    //Animation properties
    this.taleRotation = 0;
    this.leftFinRotation = 0;
    this.righFinRotation = 0;
    this.movingLeftFin = true;
    this.movingRightFin = true;
    this.ratio=ratio;
    this.color=color;
    this.lastTime = 0;
    this.taleDir = 1;
    this.initShaders(scene);
  }
  /**
   * Function that initializes the shaders to be applied in display
   * @param {CGFscene} scene - MyScene object
   */
  initShaders(scene){
    this.fishBodyShader = new CGFshader(scene.gl, "shaders/fishBody.vert", "shaders/fishBody.frag");
    this.fishBodyShader.setUniformsValues({ ratio: this.ratio, color:this.color});
  }
  /**
   * Called to update the angle of each fin and tale from the fish
   * @param {int} t - time passed since an Epoch
   * @param {int} velocity - fish's velocity
   */
  update(t, velocity){
    this.deltaTime= (this.lastTime == 0)  ? 50 : t- this.lastTime;
    this.lastTime = t;
    this.deltaAngle = (velocity+0.1)*this.deltaTime*(this.taleDir);
    this.taleRotation += this.deltaAngle*0.01; 
    if(this.taleRotation >= Math.PI/9 ){
      this.taleRotation = Math.PI/9;
     this.taleDir = -1;
    }
    else if (this.taleRotation <= -Math.PI/9){
      this.taleRotation = -Math.PI/9;
      this.taleDir = 1;
    }
    this.leftFinRotation=this.movingLeftFin ? Math.PI/18*Math.sin(t/150) : 0;
    this.righFinRotation=this.movingRightFin ? Math.PI/18*Math.sin(t/150): 0;
  }

  display(scene){
    scene.pushMatrix();
      scene.scale(0.15,0.20,0.25);
      scene.setActiveShader(this.fishBodyShader);
      this.body.display(scene);
      scene.setActiveShader(scene.defaultShader);
    scene.popMatrix();
    scene.pushMatrix();
      scene.translate(0.09,0.065,0.1);
      scene.rotate(Math.PI/12,0,0,1);
      scene.rotate(Math.PI-Math.PI/8,0,1,0);
      scene.scale(0.05,0.05,0.05);
      this.leftEye.display(scene); 
    scene.popMatrix();
    scene.pushMatrix();
      scene.translate(-0.09,0.065,0.1);
      scene.rotate(-Math.PI/12,0,0,1);
      scene.rotate(Math.PI/8,0,1,0);
      scene.scale(0.05,0.05,0.05);
      this.rightEye.display(scene);
    scene.popMatrix();
    scene.pushMatrix();
      scene.translate(0,0,-0.25);
      scene.rotate(this.taleRotation, 0,1,0);
      scene.translate(0,0,-Math.sqrt(2)*0.12);
      scene.scale(0.12,0.12,0.12);
      scene.rotate(-Math.PI/4,1,0,0);
      scene.rotate(Math.PI/2,0,1,0);
      this.fishMaterial.apply();
      this.tale.display(); 
    scene.popMatrix();
    scene.pushMatrix();
      scene.translate(0,0.2,0.06);
      scene.scale(0.12,0.12,0.12);
      scene.rotate(-Math.PI/2,0,1,0);
      this.fishMaterial.apply();
      this.dorsalFin.display();  
    scene.popMatrix();
    scene.pushMatrix();
      scene.translate(0.148,0,0.05);
      scene.scale(0.06,0.06,0.06);
      scene.rotate(this.leftFinRotation,0,0,1);
      scene.rotate(Math.PI/4.5, 0,0,1);
      scene.translate(0,-1,-1);
      scene.rotate(Math.PI/2,0,1,0);
      this.fishMaterial.apply();
      this.leftFin.display();
    scene.popMatrix();
    scene.pushMatrix();
      scene.translate(-0.148,0,0.05);
      scene.scale(0.06,0.06,0.06);
      scene.rotate(-this.righFinRotation,0,0,1);
      scene.rotate(-Math.PI/4.5, 0,0,1);
      scene.translate(0,-1,-1);
      scene.rotate(Math.PI/2,0,1,0);
      this.fishMaterial.apply();
      this.rightFin.display(); 
    scene.popMatrix();
  }
}
