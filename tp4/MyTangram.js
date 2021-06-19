import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
      super(scene);
      this.diamond = new MyDiamond(scene);
      this.triangleOrange = new MyTriangle(scene, [1,0,0.5,0.5,1,1,1,0,0.5,0.5,1,1]);
      this.trianglePurple = new MyTriangle(scene, [0,0,0.25,0.25,0,0.5,0,0,0.25,0.25,0,0.5]);
      this.triangleRed = new MyTriangle(scene, [0.25,0.75,0.5,0.5,0.75,0.75,0.25,0.75,0.5,0.5,0.75,0.75]);
      this.triangleBlue = new MyTriangle(scene, [0,0,0.5,0.5,1,0,0,0,0.5,0.5,1,0]);
      this.trianglePink = new MyTriangle(scene, [0,0.5,0,1,0.5,1,0,0.5,0,1,0.5,1]);
      this.parallelogram = new MyParallelogram(scene);

      this.materialRed = new CGFappearance(scene);
      this.materialOrange = new CGFappearance(scene);
      this.materialPurple = new CGFappearance(scene);
      this.materialBlue = new CGFappearance(scene);
      this.materialPink = new CGFappearance(scene);
      this.materialYellow = new CGFappearance(scene);
      this.materialGreen = new CGFappearance(scene);

      //tp4 material
      this.diamondMaterial = new CGFappearance(scene);
      this.diamondTexture = new CGFtexture(scene, 'images/tangram.png');
      this.diamondMaterial.setTexture(this.diamondTexture);

      this.parallelogramMaterial = new CGFappearance(scene);
      this.parallelogramTexture = new CGFtexture(scene, 'images/tangram.png');
      this.parallelogramMaterial.setTexture(this.parallelogramTexture);

      this.triangleOrangeMaterial = new CGFappearance(scene);
      this.triangleOrangeTexture = new CGFtexture(scene, 'images/tangram.png');
      this.triangleOrangeMaterial.setTexture(this.triangleOrangeTexture);

      this.trianglePurpleMaterial = new CGFappearance(scene);
      this.trianglePurpleTexture = new CGFtexture(scene, 'images/tangram.png');
      this.trianglePurpleMaterial.setTexture(this.trianglePurpleTexture);

      this.triangleRedMaterial = new CGFappearance(scene);
      this.triangleRedTexture = new CGFtexture(scene, 'images/tangram.png');
      this.triangleRedMaterial.setTexture(this.triangleRedTexture);

      this.triangleBlueMaterial = new CGFappearance(scene);
      this.triangleBlueTexture = new CGFtexture(scene, 'images/tangram.png');
      this.triangleBlueMaterial.setTexture(this.triangleBlueTexture);

      this.trianglePinkMaterial = new CGFappearance(scene);
      this.trianglePinkTexture = new CGFtexture(scene, 'images/tangram.png');
      this.trianglePinkMaterial.setTexture(this.trianglePinkTexture);

	}

  display(scene){

     //Setup Different materials
     //NOTE: check specular 
     this.materialRed.setAmbient(0.5,0,0,1.0);
     this.materialRed.setSpecular(1, 0, 0, 1.0);

     this.materialOrange.setAmbient(.99,.45,.07,1.0);
     this.materialOrange.setSpecular(1, 1, 1, 1.0);

     this.materialYellow.setAmbient(1,1,0,1.0);
     this.materialYellow.setSpecular(1, 1, 1, 1.0);

     this.materialPurple.setAmbient(.58,0,0.83,1.0);
     this.materialPurple.setSpecular(1, 1, 1, 1.0);

     this.materialGreen.setAmbient(0,1,0,1.0);
     this.materialGreen.setSpecular(1, 1, 1, 1.0);

     this.materialBlue.setAmbient(0,.75,1,1.0);
     this.materialBlue.setSpecular(1, 1, 1, 1.0);

     this.materialPink.setAmbient(1,.41,.71,1.0);
     this.materialPink.setSpecular(1, 1, 1, 1.0);



      const diamondScale = [
          Math.sqrt(0.5), 0, 0, 0,
          0, Math.sqrt(0.5), 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1
        ];
        
        const diamondTranslate = [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0.5, 0, 1
        ];
    
        const diamondRotate = [
          Math.cos(Math.PI/4), Math.sin(Math.PI/4), 0, 0,
          -Math.sin(Math.PI/4), Math.cos(Math.PI/4), 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1
        ];
    
        scene.pushMatrix();
        scene.multMatrix(diamondTranslate);
        scene.multMatrix(diamondScale);
        scene.multMatrix(diamondRotate);
        //this.materialGreen.apply();
        //scene.customMaterial.apply();
        this.diamondMaterial.apply();
        this.diamond.display();
        scene.popMatrix();
    
        /*Triangle Orange*/
        
        const triangleOrangeTranslate1 = [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          1, 1, 0, 1
        ];
    
        const triangleOrangeRotate = [
          Math.cos(Math.PI/2), Math.sin(Math.PI/2), 0, 0,
          -Math.sin(Math.PI/2), Math.cos(Math.PI/2), 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1
        ];
    
        const triangleOrangeTranslate2 = [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 1, 0, 1
        ]
    
        scene.pushMatrix();
          scene.multMatrix(triangleOrangeTranslate2);
          scene.multMatrix(triangleOrangeRotate);  
          scene.multMatrix(triangleOrangeTranslate1);
          //this.materialOrange.apply();
          this.triangleOrangeMaterial.apply();
          this.triangleOrange.display(); 
        scene.popMatrix();
    
    
        const triangleScale = [
          0.5, 0, 0, 0,
          0, 0.5, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1
        ];
    
        const trianglePurpleTranslate = [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          1, 3, 0, 1
        ]
    
        const triangleRedTranslate = [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          2, 0, 0, 1
        ]
    
        scene.pushMatrix();
          scene.multMatrix(triangleScale);
          scene.multMatrix(trianglePurpleTranslate);
          scene.pushMatrix();
            scene.multMatrix(triangleRedTranslate);
            //this.materialRed.apply();
            this.triangleRedMaterial.apply();
            this.triangleRed.display();
          scene.popMatrix();
          //this.materialPurple.apply();
          this.trianglePurpleMaterial.apply();
          this.trianglePurple.display();
        scene.popMatrix();
    
    
      
        const paralellogrameScale = [
          -Math.sqrt(0.5), 0, 0, 0,
          0, Math.sqrt(0.5), 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1
        ];
    
        const paralellogrameRotate = [
          Math.cos(-Math.PI/4), Math.sin(-Math.PI/4), 0, 0,
          -Math.sin(-Math.PI/4), Math.cos(-Math.PI/4), 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1
        ];
    
        const paralellogrameTranslate = [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          1, 1, 0, 1
        ];
    
        scene.pushMatrix(); 
          scene.multMatrix(paralellogrameTranslate);
          scene.multMatrix(paralellogrameRotate);
          scene.multMatrix(paralellogrameScale);
          //this.materialYellow.apply();
          this.parallelogramMaterial.apply();
          this.parallelogram.display();
        scene.popMatrix();
    
    
    
        const trianglePinkScale = [
          Math.sqrt(0.5), 0, 0, 0,
          0, Math.sqrt(0.5), 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1
        ];
    
        const trianglePinkTranslate = [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          -1, -1, 0, 1
        ];
    
        const treetopRotate = [
          Math.cos(-Math.PI/4-Math.PI/2), Math.sin(-Math.PI/4-Math.PI/2), 0, 0,
          -Math.sin(-Math.PI/4-Math.PI/2), Math.cos(-Math.PI/4-Math.PI/2), 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1
        ];
    
        const treetopTranslate = [
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 3, 0, 1
        ];
    
        scene.pushMatrix();
          scene.multMatrix(treetopTranslate);
          scene.multMatrix(treetopRotate);
          scene.pushMatrix();
            //this.materialBlue.apply();
            this.triangleBlueMaterial.apply();
            this.triangleBlue.display();
          scene.popMatrix();
          scene.pushMatrix();
            scene.multMatrix(trianglePinkTranslate);
            scene.multMatrix(trianglePinkScale);
            //this.materialPink.apply();
            this.trianglePinkMaterial.apply();
            this.trianglePink.display();
          scene.popMatrix();
        scene.popMatrix();

        //Show normal vectors
        /*this.triangleOrange.enableNormalViz();
        this.triangleRed.enableNormalViz();
        this.trianglePink.enableNormalViz();
        this.triangleBlue.enableNormalViz();
        this.trianglePurple.enableNormalViz();
        this.diamond.enableNormalViz();
        this.parallelogram.enableNormalViz();*/

  }
}