import { CGFtexture } from '../../../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {int} nRocks - number of rocks to be created
     * @param  {CGFtexture} tex - texture to be applied to the created objects
     */
	constructor(scene, nRocks, tex) {
		
        //Array with MyRock objects
        this.rocks = [];

        for (let index = 0; index < nRocks; index++) {
            this.rocks.push(new MyRock(scene,20,20,tex));
            this.setPosition(this.rocks[index]);
        }
	}
    /**
     * Called to set a random position to the rock
     * @param {MyRock} rock - object to which position is set 
     */
    setPosition(rock){
        rock.position = {
            x: Math.random()*20-10,
            y: Math.random()*0.2+0.5,
            z: Math.random()*20-10
        };
        rock.scale =  {
            x: Math.random()*0.1+0.1,
            y: Math.random()*0.1+0.1,
            z: Math.random()*0.1+0.1,
        }
        rock.rotate = {
            y: Math.random()*Math.PI
        }

    }
    /**
     * Applies transformations to the scene depending on the rock parameter
     * @param {CGFscene} scene - MyScene object
     * @param {MyRock} rock - object that determines the transformations applied
     */
    rockTransform(scene, rock){
        scene.translate(rock.position.x, rock.position.y, rock.position.z);
        scene.rotate(rock.rotate.y,0,1,0);
        scene.scale(rock.scale.x, rock.scale.y, rock.scale.z);
    }
    /**
     * Function that displays every rock from the rocks array
     * @param {CGFscene} scene - MyScene object
     */
    displayRocks(scene){
        this.rocks.forEach(rock=>{
            scene.pushMatrix();
            this.rockTransform(scene, rock);
            scene.rotate(-Math.PI/2,0,0,1);
            rock.display(scene);
            scene.popMatrix();
        });
    }
	display(scene){
		this.displayRocks(scene);	
	}
}