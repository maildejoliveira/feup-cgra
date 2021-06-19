import {CGFobject, CGFappearance} from '../../../lib/CGF.js';

export class MyCylinder extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis
     * @param  {CGFtexture} texture - texture to be applied to the object
     */
	constructor(scene, slices, texture) {
		super(scene);
        this.slices = slices;

        this.material = new CGFappearance(scene);
        this.material.setTexture(texture);
        this.material.setAmbient(0, 0,0, 1.0);
        this.material.setDiffuse(0, 0, 0, 1.0);
        this.material.setSpecular(0, 0, 0, 1.0);
        this.material.setEmission(1,1,1,1);

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
        this.indices = [];
        this.normals = [];
        
        /*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        var counterVertices=0;
        var increment = 1/this.slices;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);  //0
            var saa=Math.sin(ang+alphaAng); //sin(60)
            var ca=Math.cos(ang); //1
            var caa=Math.cos(ang+alphaAng); //1/2 cos(60)

            this.vertices.push(ca,0,-sa);//0
            this.vertices.push(caa, 0, -saa); //1
            this.vertices.push(ca,1,-sa); //2
            
            this.vertices.push(caa, 0, -saa); //3
            this.vertices.push(caa, 1, -saa); //4
            this.vertices.push(ca,1,-sa); //5
            
            this.indices.push(6*i, (6*i+1) , (6*i+2) );
            this.indices.push(6*i+3, (6*i+4) , (6*i+5) );
            
            
            this.normals.push(ca,0,-sa); //0
            this.normals.push(caa,0,-saa); //1
            this.normals.push(ca,0,-sa); //2

            this.normals.push(caa,0,-saa); //3
            this.normals.push(caa,0,-saa); //4
            this.normals.push(ca,0,-sa); //5

            this.texCoords.push(i*increment,1);
            this.texCoords.push((i+1)*increment,1);
            this.texCoords.push(i*increment,0);
            this.texCoords.push((i+1)*increment,1);
            this.texCoords.push((i+1)*increment,0);
            this.texCoords.push(i*increment,0);

            ang+=alphaAng;
        }
        /*
        //Bottom
        ang = 0;
        counterVertices+=this.slices*6;
        for(var i =0; i < this.slices; i++){
            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(0, 0, 0);
            this.vertices.push(caa, 0, -saa);
            this.vertices.push(ca, 0, -sa);
            

            // push normal once for each vertex of this triangle
            this.normals.push(0,-1,0);
            this.normals.push(0,-1,0);
            this.normals.push(0,-1,0);

            this.texCoords.push(i*increment,1);
            this.texCoords.push((i+1)*increment,1);
            this.texCoords.push(i*increment,0);

            this.indices.push(3*i+counterVertices, (3*i+1)+counterVertices , (3*i+2)+counterVertices);

            ang+=alphaAng;
        }
        //Top
        ang=0;
        counterVertices+=this.slices*3;
        for(var i =0; i < this.slices; i++){
            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(ca, 1, -sa);
            this.vertices.push(caa, 1, -saa);
            this.vertices.push(0, 1, 0);
            

            // push normal once for each vertex of this triangle
            this.normals.push(0,1,0);
            this.normals.push(0,1,0);
            this.normals.push(0,1,0);

            this.texCoords.push((i+1)*increment,0);
            this.texCoords.push((i+1)*increment,1);
            this.texCoords.push(i*increment,1);

            this.indices.push(3*i+counterVertices, (3*i+1)+counterVertices , (3*i+2)+counterVertices);

            ang+=alphaAng;
        }*/

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
	}
    display(){
        this.material.apply();
        super.display();
    }
}

