import {CGFobject} from '../lib/CGF.js';
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

	}

  display(scene){

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
            this.triangleRed.display();
          scene.popMatrix();
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
            this.triangleBlue.display();
          scene.popMatrix();
          scene.pushMatrix();
            scene.multMatrix(trianglePinkTranslate);
            scene.multMatrix(trianglePinkScale);
            this.trianglePink.display();
          scene.popMatrix();
        scene.popMatrix();
  }
}