import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			//y
			-0.5, 0.5, 0.5,	 //0
			-0.5, 0.5, -0.5, //1
			0.5, 0.5, -0.5,	 //2
			0.5, 0.5, 0.5,	 //3
            -0.5, -0.5, 0.5, //4
            -0.5, -0.5, -0.5,//5
            0.5, -0.5, -0.5, //6
            0.5, -0.5, 0.5,  //7

			//x
			0.5, 0.5, -0.5,	 //2
			0.5, 0.5, 0.5,	 //3
            0.5, -0.5, -0.5, //6
            0.5, -0.5, 0.5,  //7
			-0.5, 0.5, 0.5,	 //0
			-0.5, 0.5, -0.5, //1
			-0.5, -0.5, 0.5, //4
            -0.5, -0.5, -0.5,//5

			//z
			-0.5, 0.5, 0.5,	 //0
			0.5, 0.5, 0.5,	 //3
            -0.5, -0.5, 0.5, //4
			0.5, -0.5, 0.5,  //7
			-0.5, 0.5, -0.5, //1
			0.5, 0.5, -0.5,	 //2
            -0.5, -0.5, -0.5,//5
            0.5, -0.5, -0.5, //6
            
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 3, 2, //Meia face de cima
			0, 2, 1, //Meia face de cima
            4, 5, 6, //Meia face de baixo
            6, 7, 4, //Meia face de baixo
            6, 2, 3, //Meia face lateral
            3, 7, 6, //Meia face lateral
            3, 0, 4, //Meia face lateral
            4, 7, 3, //Meia face lateral
            0, 1, 5, //Meia face lateral
            5, 4, 0, //Meia face lateral
            1, 2, 6, //Meia face lateral
            6, 5, 1, //Meia face lateral
		];

		this.normals = [];
		var x=0,y=0,z=0;
        for (var i = 0; i < 3; i++) {
			if(i==0) y=1;
			else if(i==1) {x=1; y=0;}
			else {z=1;x=0;}
			for(var j=0;j<4;j++){
				this.normals.push(x,y,z);
			}
			x=-x;y=-y;z=-z;
			for(var j=0;j<4;j++){
				this.normals.push(x,y,z);
			}
        }


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

