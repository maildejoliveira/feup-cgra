import {CGFobject, CGFappearance} from '../lib/CGF.js';
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
      this.triangleOrange = new MyTriangle(scene);
      this.trianglePurple = new MyTriangle(scene);
      this.triangleRed = new MyTriangle(scene);
      this.triangleBlue = new MyTriangle(scene);
      this.trianglePink = new MyTriangle(scene);
      this.parallelogram = new MyParallelogram(scene);

      this.materialRed = new CGFappearance(scene);
      this.materialOrange = new CGFappearance(scene);
      this.materialPurple = new CGFappearance(scene);
      this.materialBlue = new CGFappearance(scene);
      this.materialPink = new CGFappearance(scene);
      this.materialYellow = new CGFappearance(scene);
      this.materialGreen = new CGFappearance(scene);


	}

  display(scene){

     //Setup Different materials
     this.materialRed.setAmbient(1,0,0,1.0);
     this.materialRed.setSpecular(1, 1, 1, 1.0);

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
        scene.customMaterial.apply();
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
          this.materialOrange.apply();
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
            this.materialRed.apply();
            this.triangleRed.display();
          scene.popMatrix();
          this.materialPurple.apply();
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
          this.materialYellow.apply();
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
          this.materialBlue.apply();
            this.triangleBlue.display();
          scene.popMatrix();
          scene.pushMatrix();
            scene.multMatrix(trianglePinkTranslate);
            scene.multMatrix(trianglePinkScale);
            this.materialPink.apply();
            this.trianglePink.display();
          scene.popMatrix();
        scene.popMatrix();

        //Show normal vectors
        this.triangleOrange.enableNormalViz();
        this.triangleRed.enableNormalViz();
        this.trianglePink.enableNormalViz();
        this.triangleBlue.enableNormalViz();
        this.trianglePurple.enableNormalViz();
        this.diamond.enableNormalViz();
        this.parallelogram.enableNormalViz();

  }
}