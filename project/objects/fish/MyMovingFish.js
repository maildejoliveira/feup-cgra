import { MyFish } from "./MyFish.js";
import { MyMovingObject } from "../others/MyMovingObject.js";

export class MyMovingFish extends MyMovingObject  {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     */
    constructor(scene){
        //Creating an instance of MyMovingObject with Fish as the movingObject
        super( new MyFish(scene, 0.25, scene.fishBodyTex, [0.968,0.58,0.149]), {x:0,y:5,z:0});

        //Flag for fish/rock association
        this.associatedRock=false;
    }
    
    display(scene, scaleFactor){
        scene.pushMatrix();
            scene.translate(this.position.x,this.position.y,this.position.z);
            scene.rotate(this.orientation,0,1,0);
            scene.pushMatrix();
                scene.scale(scaleFactor,scaleFactor,scaleFactor);
                super.display(scene);
            scene.popMatrix();
            if(this.associatedRock){
                scene.pushMatrix();
                    const sf = scaleFactor < 1.5 ? 1+scaleFactor*0.5 : scaleFactor;
                    scene.translate(0.16*sf,-0.1*sf,0.16*sf);
                    scene.rotate(this.rock.rotate.y,0,1,0);
                    scene.scale(this.rock.scale.x, this.rock.scale.y, this.rock.scale.z);
                    this.rock.display(scene);
                scene.popMatrix();
            }
        scene.popMatrix();
    }
    /**
     * Called to update both the fish animation and movement
     * @param {int} t - time passed since an Epoch 
     */
    update(t){
        this.movingObject.update(t, this.actualVelocity);
        super.update();
    }
    /**
     * Called when user wants the fish to switch direction
     * @param {float} val - delta angle to be applied to the fish movement
     */
    turn(val){
        if(val>0){
            this.movingObject.movingRightFin=false;
        }
        else{
            this.movingObject.movingLeftFin=false;
        }
        super.turn(val);
    }
    /**
     * Called to activate the animation of a fish's fin
     * @param {char} side - side of the fish's fin which started moving
     */
    endTurn(side){
        if(side=='R'){
            this.movingObject.movingRightFin=true;
        }
        else if(side=='L'){
            this.movingObject.movingLeftFin=true;
        }
    }
    /**
     * Called to reset the fish's movement and return the associated rock to the scene rockSet
     * @param {CGFscene} scene - MyScene object
     */
    reset(scene){
        super.reset({x:0,y:5,z:0});

        if(this.associatedRock){
            this.associatedRock=false;
            scene.rockSet.rocks.push(this.rock);
        }
    }
    /**
     * Called when user wants either to pick up a rock or throw it to the nest
     * Verifies if the fish satisfies the conditions to do such operations
     * @param {CGFscene} scene - MyScene object
     */
    checkRock(scene){
        let rockSet = scene.rockSet;

        //Fish in the lower bound
        if(this.position.y<=1.1){

            if(this.associatedRock){
                //Drop a rock
                this.dropRock(scene);
                return;
            }

            //Catch a rock
            this.catchRock(rockSet);
            return;
        }
        const sf = scene.scaleFactor < 1.5 ? 1+scene.scaleFactor*0.5 : scene.scaleFactor;
        //Fish in the upper bound
        if(this.position.y>=5 && this.associatedRock){
            //Throw a rock
            this.throwRock(scene, sf);
        }
    }
    /**
     * Makes the fish catch a rock available in the scene
     * @param {array} rockSet - array of rocks in the scene
     */
    catchRock(rockSet) {
        let closestRock;
        let dist=2;
        let i;
    
        rockSet.rocks.forEach((rock, index) => {
            const d = Math.sqrt(Math.pow(rock.position.x-this.position.x, 2)+Math.pow(rock.position.y-this.position.y, 2)+Math.pow(rock.position.z-this.position.z, 2));
            if(d<=1.5 && d<dist){
                closestRock=rock;
                dist=d;
                i=index;
            }
        });
    
        //Near a rock
        if(dist!=2){
            rockSet.rocks.splice(i,1);
            this.rock=closestRock;
            this.associatedRock=true;
        }
    }
    /**
     * Makes the fish drop the rock to the nest if it has it
     * @param {CGFscene} scene - MyScene object
     */
    dropRock(scene){
        let dp=[this.position.x-2.879,this.position.z+1.570];
        let ap=[this.position.x-2.1496,this.position.z+4.294];
        let ab=[2.820,-0.755];
        let da=[-0.729,-2.723];
        
        const sp1 = da[0]*dp[0]+da[1]*dp[1];
        const sp2 = da[0]*da[0]+da[1]*da[1];
        const sp3 = ab[0]*ap[0]+ab[1]*ap[1];
        const sp4 = ab[0]*ab[0]+ab[1]*ab[1];
        
        if(sp1>=0 && sp1<=sp2 && sp3>=0 && sp3<=sp4){
            this.rock.nestPosition = {x: this.position.x,y: this.rock.position.y,z: this.position.z};
            this.rock.hasMovement = false;
            scene.nestRocks.push(this.rock);
            this.associatedRock=false;
        }
    }
    /**
     * Makes the fish throw the rock to the nest if it has it
     * @param {CGFscene} scene - MyScene object
     * @param {float} sf - scale factor depending on the fish
     */
    throwRock(scene, sf){
        const dist = Math.sqrt(Math.pow(this.position.x-3.9428,2)+Math.pow(this.position.z+3.326,2));
        if(dist<=5){
            const p1 = [this.position.x- 0.16*sf, this.position.y+0.1*sf, this.position.z-0.16*sf];
            const p4 = [ this.position.x - 0.16*sf+(3.9428-(this.position.x - 0.16*sf))/2, 1.05, this.position.z- 0.16*sf+(-3.326-(this.position.z- 0.16*sf))/2];
            const r1 = [ (p4[0]-p1[0])*3, 0, (p4[2]-p1[2])*3 ];
            const r4 = [0, -2, 0];
            
            this.rock.hermiteAttributes={
                p1:p1,
                p4:p4,
                r1:r1,
                r4:r4
            };
            this.rock.deltaT=0;
            this.rock.nestPosition = { x:p1[0], y:p1[1], z:p1[2]};
            this.rock.hasMovement = true;
            scene.nestRocks.push(this.rock);
            this.associatedRock=false;
        }
    }
}

