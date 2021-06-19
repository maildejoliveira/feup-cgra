import {CGFobject} from '../../../lib/CGF.js';

export class MyTriangle extends CGFobject {
	/**
	 * @method constructor
	 * @param  {CGFscene} scene - MyScene object
	 */
    constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1, 1, 0,	//0
			-1, -1, 0,	//1
			 1, -1, 0,	//2

			-1, 1, 0,	//3
			-1, -1, 0,	//4
			 1, -1, 0	//5
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			5, 4, 3
			
		];

		this.normals = [];
        for (var i = 0; i < 3; i++) {
			this.normals.push(0,0,1);
        }
		for (var i = 0; i < 3; i++) {
			this.normals.push(0,0,-1);
        }

		this.texCoords = [
			0,0,
			0,1,
			1,1,
			0,0,
			0,1,
			1,1
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}