import { CGFappearance } from '../../../lib/CGF.js';
import { MyPyramid } from '../primitives/MyPyramid.js';

export class MySeaweedSet {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {int} nsweeds - number of seaweeds to be created
     */
	constructor(scene, nsweeds) {

        //2D Array with sets of MyPyramid (seaweed) objects
        this.seaweeds = [];

        for (let index = 0; index < nsweeds; index++) {
            this.nSeaWeeds = Math.floor(Math.random()*4+2);
            let set = [];
            const position = this.getNewPos();
            for (let n = 0; n < this.nSeaWeeds; n++){
                let seaWeed = new MyPyramid(scene,4,4);
                seaWeed.setConfigs(position);
                set.push(seaWeed);
            }
            this.seaweeds.push(set);
        }

        //Objects material
        this.appearence = new CGFappearance(scene);
        this.appearence.setEmission(0.29,0.32,0.31,1);
        this.appearence.setSpecular(0.1,0.1,0.1,1);
	}
    /**
     * Called when a new seaweed set is created
     * @returns position as an object with 3 values, x, y and z
     */
    getNewPos(){
        return {
            x: Math.random()*20-10,
            y: Math.random()*0.1+0.3,
            z: Math.random()*20-10
        };
    }
    /**
     * Applies transformations to the scene depending on the seaweed parameter
     * @param {CGFscene} scene - MyScene object
     * @param {MyPyramid} seaweed - object that determines the transformations applied
     */
    seaweedTransform(scene, seaweed){
        scene.translate(seaweed.relativePos.x, seaweed.relativePos.y, seaweed.relativePos.z);
        scene.scale(seaweed.scale.x, seaweed.scale.y, seaweed.scale.z);
    }
    /**
     * Function that displays every seaweed set and its seaweeds from the seaweeds array
     * @param {CGFscene} scene - MyScene object
     */
    displaySeaweeds(scene){
        this.seaweeds.forEach(set=>{
            scene.pushMatrix();
            scene.translate(set[0].position.x,set[0].position.y, set[0].position.z);
            set.forEach(seaweed=>{
                scene.pushMatrix();
                this.seaweedTransform(scene, seaweed);
                this.appearence.setDiffuse(seaweed.color.r,seaweed.color.b,seaweed.color.b,1);
                this.appearence.apply();
                seaweed.display();
                scene.popMatrix();
            });
            scene.popMatrix();
        });
    }
	display(scene){
		this.displaySeaweeds(scene);	
	}
}