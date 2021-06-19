import { MyMovingObject } from "../others/MyMovingObject.js";
import { MyPyramid } from "../primitives/MyPyramid.js";

export class MyMovingPyramid extends MyMovingObject  {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object 
     * @param  {integer} slices - number of divisions around the Y axis
     * @param  {integer} stacks - number of divisions along the Y axis
     */
    constructor(scene, slices, stacks){
        //Creating an instance of MyMovingObject with Pyramid as the movingObject
        super(new MyPyramid(scene, slices, stacks), {x:0,y:0,z:0});
    }
    
    display(scene){
        scene.pushMatrix();
            scene.translate(this.position.x,this.position.y,this.position.z);
            scene.rotate(this.orientation,0,1,0);
            scene.rotate(Math.PI/2,1,0,0);
            scene.translate(0,-0.25,0);
            super.display(scene);
        scene.popMatrix();
    }

}
