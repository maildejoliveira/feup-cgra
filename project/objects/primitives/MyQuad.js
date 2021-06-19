import {CGFobject} from '../../../lib/CGF.js';

export class MyQuad extends CGFobject {
	/**
	 * @method constructor
	 * @param  {CGFscene} scene - MyScene object
	 * @param  {Array} coords - Array of texture coordinates (optional)
	 */
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0,	//0
			0.5, -0.5, 0,	//1
			-0.5, 0.5, 0,	//2
			0.5, 0.5, 0		//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1,
			1, 2, 3
		];

		//Facing Z positive
		this.normals = [
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		];
		
		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

		this.texCoords = [
			0.998, 0.998,
			0.002, 0.998,
			0.998, 0.002,
			0.002, 0.002
		];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}

