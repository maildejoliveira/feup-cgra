import { CGFtexture } from "../../../lib/CGF.js";
import { MyFish } from "./MyFish.js";


export class MyAnimatedFish {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {object} centerPosition - object with x, y and z properties, concerning the center of rotation of the fish's movement 
     * @param  {float} period - time the fish takes to complete a 360 degree rotation  
     * @param  {float} headRatio - number representing the percentage of the head in relation to the rest of the fish's body 
     * @param  {CGFtexture} bodyTexture - texture to be applied to the fish
     * @param  {array} color - array with r, g and b values to be applied in the fish's shader 
     */
    constructor(scene, centerPosition, period, headRatio, bodyTexture, color){
        this.myFish = new MyFish(scene, headRatio, bodyTexture, color);
        this.myFish.movingLeftFin=false;
        this.centerPosition=centerPosition;
        this.angularVel=2*Math.PI/period;
        this.radius = 5;
        this.lastTime=0;
        this.orientation=0;
    }
    display(scene){
        scene.pushMatrix();
            scene.translate(this.centerPosition.x, this.centerPosition.y, this.centerPosition.z);
            scene.rotate(this.orientation-Math.PI/2, 0,1,0);
            scene.translate(-this.radius,0,0);
            this.myFish.display(scene);
        scene.popMatrix();
    }
    /**
     * Called to update fish animation and orientation
     * @param {int} t - time passed since an Epoch
     */
    update(t){
        this.myFish.update(t, this.angularVel*this.radius*0.01);
        this.deltaTime= (this.lastTime == 0)  ? 50 : t- this.lastTime;
        this.lastTime = t;
        this.orientation += this.angularVel/this.deltaTime;
    }
}