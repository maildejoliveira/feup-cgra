import {CGFobject} from '../../../lib/CGF.js';

export class MyMovingObject {
    /**
     * @method constructor
     * @param  {CGFobject} object - object which gets the ability to move
     * @param  {object} position - object with x, y and z properties that defines the initial position of the movingObject
     */
    constructor(object, position) {

        this.movingObject=object;
        
        this.orientation=0;
        this.velocity=0;
        this.actualVelocity=0;
        this.liftVelocity=0;
        this.position=position;
    }
    
    display(scene){
        scene.pushMatrix();
            this.movingObject.display(scene);
        scene.popMatrix();
    }
    /**
     * Called to update the position of the object
     */
    update(){
        this.position.x=this.position.x + Math.sin(this.orientation)*this.actualVelocity;
        this.position.z=this.position.z + Math.cos(this.orientation)*this.actualVelocity;
        this.position.y=this.position.y + this.liftVelocity > 5 ? 5 : this.position.y + this.liftVelocity;
        this.position.y=this.position.y + this.liftVelocity < 1 ? 1 : this.position.y + this.liftVelocity;
    }
    /**
     * Called to update the actual velocity applied to the objects when there is speed factor applied by the user
     * @param {float} speedFactor - quantity of speed applied to the object velocity
     */
    upadateVelocity(speedFactor){
        this.actualVelocity=this.velocity*speedFactor;
    }
    /**
     * Called when the user wants the object to switch direction
     * @param {float} val - delta angle to be applied to the object movement
     */
    turn(val){
        this.orientation-=val;
    }
    /**
     * Called to update velocity of the object
     * @param {float} val - value to increment to velocity 
     */
    accelerate(val){
        this.velocity+=val;
        if(this.velocity<0) this.velocity=0;
        this.upadateVelocity(1);
    }
    /**
     * Special function to increment meaningfully the velocity of the object
     */
    turbo(){
        if(this.velocity!=0){
            this.velocity+=1;
            this.upadateVelocity(1);
        }
    }
    /**
     * Reseting all object configurations to the initial settings
     * @param {object} position - object with x, y and z properties that defines the initial position of the movingObject
     */
    reset(position){
        this.orientation=0;
        this.velocity=0;
        this.actualVelocity=0;
        this.position=position;
        this.liftVelocity=0;
    }
    /**
     * Called to make the object go up and down by giving him lift velocity
     * @param {float} val - value to set the liftVelocity
     */
    lift(val){
        this.liftVelocity=val;
    }
}