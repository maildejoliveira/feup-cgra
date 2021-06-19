import { CGFtexture } from '../../../lib/CGF.js';
import { MyCylinder } from '../primitives/MyCylinder.js';

export class MyPilar extends MyCylinder {
	/**
	 * @method constructor
	 * @param  {CGFscene} scene - MyScene object
	 * @param  {integer} slices - number of slices around Y axis
	 */
	constructor(scene, slices) {
		super(scene,slices,new CGFtexture(scene, "./images/pilar.jpg"));
		this.material.setEmission(0.5,0.6,0.6,1); 
		this.material.setSpecular(0.5,0.5,0.5,1);       
	}
	display(scene){
		scene.pushMatrix();
			scene.translate(-10,0,0);
			scene.scale(0.3,10,0.3);
			super.display();
		scene.popMatrix();
		scene.pushMatrix();
			scene.translate(-10,0,1.5);
			scene.scale(0.3,10,0.3);
			super.display();
		scene.popMatrix();	
		scene.pushMatrix();
			scene.translate(-2.5,0,0);
			scene.scale(0.3,10,0.3);
			super.display();
		scene.popMatrix();	
		scene.pushMatrix();
			scene.translate(-2.5,0,1.5);
			scene.scale(0.3,10,0.3);
			super.display();
		scene.popMatrix();		
	}
}