import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, top, side, bottom) {
		super(scene);
		this.quad = new MyQuad(scene);

        this.bottomMaterial = new CGFappearance(scene);
        this.bottomMaterial.setTexture(bottom);

        this.sideMaterial = new CGFappearance(scene);
        this.sideMaterial.setTexture(side);

        this.topMaterial = new CGFappearance(scene);
        this.topMaterial.setTexture(top);

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
            this.bottomMaterial.apply();
            if(scene.modifyFiltering)
                scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
            else scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.LINEAR);
            this.quad.display();
        scene.popMatrix();
        scene.pushMatrix();
            scene.multMatrix(translate1);
            this.sideMaterial.apply();
            if(scene.modifyFiltering)
                scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
            else scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.LINEAR);
            this.quad.display();
        scene.popMatrix();
        scene.pushMatrix();
            scene.rotate(Math.PI, 0, 1, 0);
            scene.multMatrix(translate1);
            this.sideMaterial.apply();
            if(scene.modifyFiltering)
                scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
            else scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.LINEAR);
            this.quad.display();
        scene.popMatrix();
        scene.pushMatrix();
            scene.multMatrix(rotatex);
            scene.multMatrix(rotatex);
            scene.multMatrix(rotatex);
            scene.multMatrix(translate1);
            this.topMaterial.apply();
            if(scene.modifyFiltering)
                scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
            else scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.LINEAR);
            this.quad.display();
        scene.popMatrix();
        scene.pushMatrix();
            scene.multMatrix(rotatey);
            scene.multMatrix(translate1);
            this.sideMaterial.apply();
            if(scene.modifyFiltering)
                scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
            else scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.LINEAR);
            this.quad.display();
        scene.popMatrix();
        scene.pushMatrix();
            scene.multMatrix(rotatey);
            scene.multMatrix(rotatey);
            scene.multMatrix(rotatey);
            scene.multMatrix(translate1);
            this.sideMaterial.apply();
            if(scene.modifyFiltering)
                scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
            else scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.LINEAR);
            this.quad.display();
        scene.popMatrix();

    }
}

