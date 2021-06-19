import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad .js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.quad = new MyQuad(scene);
	}
	display(scene){
        const translate1 = [
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,0,0.5,1
        ];
        const rotatex = [
            1,0,0,0,
            0, Math.cos(Math.PI/2), Math.sin(Math.PI/2),0,
            0,-Math.sin(Math.PI/2),Math.cos(Math.PI/2),0,
            0,0,0,1
        ];
        const rotatey = [
            Math.cos(Math.PI/2),0,-Math.sin(Math.PI/2),0,
            0,1,0,0,
            Math.sin(Math.PI/2),0,Math.cos(Math.PI/2),0,
            0,0,0,1
        ];
        scene.pushMatrix();
            scene.multMatrix(rotatex);
            scene.multMatrix(translate1);
            this.quad.display();
        scene.popMatrix();
        scene.pushMatrix();
            scene.multMatrix(translate1);
            this.quad.display();
        scene.popMatrix();
        scene.pushMatrix();
            scene.multMatrix(rotatex);
            scene.multMatrix(rotatex);
            scene.multMatrix(translate1);
            this.quad.display();
        scene.popMatrix();
        scene.pushMatrix();
            scene.multMatrix(rotatex);
            scene.multMatrix(rotatex);
            scene.multMatrix(rotatex);
            scene.multMatrix(translate1);
            this.quad.display();
        scene.popMatrix();
        scene.pushMatrix();
            scene.multMatrix(rotatey);
            scene.multMatrix(translate1);
            this.quad.display();
        scene.popMatrix();
        scene.pushMatrix();
            scene.multMatrix(rotatey);
            scene.multMatrix(rotatey);
            scene.multMatrix(rotatey);
            scene.multMatrix(translate1);
            this.quad.display();
        scene.popMatrix();

    }
}

