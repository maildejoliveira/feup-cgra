import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./objects/primitives/MySphere.js";
import { MyCylinder } from "./objects/primitives/MyCylinder.js";
import { MyPyramid } from "./objects/primitives/MyPyramid.js";

import { MyCubeMap } from "./objects/others/MyCubeMap.js";
import { MyWaterSurface } from "./objects/others/MyWaterSurface.js";

import { MyRock } from "./objects/others/MyRock.js";
import { MyRockSet } from "./objects/others/MyRockSet.js";

import { MyPilar } from "./objects/others/MyPilar.js";

import { MySeaweedSet } from "./objects/others/MySeaweedSet.js";
import { MySeaFloor } from "./objects/others/MySeaFloor.js";

import { MyFish } from "./objects/fish/MyFish.js";
import { MyMovingFish } from "./objects/fish/MyMovingFish.js";
import { MyAnimatedFish } from "./objects/fish/MyAnimatedFish.js";
import { MyMovingPyramid } from "./objects/others/MyMovingPyramid.js";

/**
* MyScene
*/
export class MyScene extends CGFscene {
    /**
     * @method constructor
     */
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        // set the scene update period 
		// (to invoke the update() method every 50ms or as close as possible to that )
        this.updatePeriod=50;
        this.setUpdatePeriod(this.updatePeriod);
        
        this.enableTextures(true);

        //textures
        this.earthTex = new CGFtexture(this, 'images/earth.jpg');
        this.rockTex = new CGFtexture(this, 'images/rock.png');
        
        this.tnx = new CGFtexture(this, 'images/test_cubemap/nx.png');
        this.tny = new CGFtexture(this, 'images/test_cubemap/ny.png');
        this.tnz = new CGFtexture(this, 'images/test_cubemap/nz.png');
        this.tpx = new CGFtexture(this, 'images/test_cubemap/px.png');
        this.tpy = new CGFtexture(this, 'images/test_cubemap/py.png');
        this.tpz = new CGFtexture(this, 'images/test_cubemap/pz.png');

        this.nx = new CGFtexture(this, 'images/demo_cubemap/left.png');
        this.ny = new CGFtexture(this, 'images/demo_cubemap/bottom.png');
        this.nz = new CGFtexture(this, 'images/demo_cubemap/front.png');
        this.px = new CGFtexture(this, 'images/demo_cubemap/right.png');
        this.py = new CGFtexture(this, 'images/demo_cubemap/top.png');
        this.pz = new CGFtexture(this, 'images/demo_cubemap/back.png');

        this.wnx = new CGFtexture(this, 'images/underwater_cubemap/left.jpg');
        this.wny = new CGFtexture(this, 'images/underwater_cubemap/bottom.jpg');
        this.wnz = new CGFtexture(this, 'images/underwater_cubemap/front.jpg');
        this.wpx = new CGFtexture(this, 'images/underwater_cubemap/right.jpg');
        this.wpy = new CGFtexture(this, 'images/underwater_cubemap/top.jpg');
        this.wpz = new CGFtexture(this, 'images/underwater_cubemap/back.jpg');

        this.fishBodyTex = new CGFtexture(this, "images/fishscales.png");
        
        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8, this.earthTex);
        this.myPyramid = new MyMovingPyramid(this, 4, 2);
        this.myCube = new MyCubeMap(this,this.wnx,this.wny,this.wnz,this.wpx,this.wpy,this.wpz); /* Same texture as selected */
        this.myCylinder = new MyCylinder(this, 10, this.earthTex);
        this.myFish = new MyFish(this, 0.25,this.fishBodyTex, [0.968,0.58,0.149]);
        this.seaFloor = new MySeaFloor(this, 60, 2.0, 0.6);
        this.waterSurface = new MyWaterSurface(this, 20);
        this.rockSet = new MyRockSet(this,50, this.rockTex);
        this.rock = new MyRock(this, 20,20, this.rockTex);
        this.pilar = new MyPilar(this,30);
        this.seaWeedSets = new MySeaweedSet(this,50,this.earthTex);
        this.movingFish = new MyMovingFish(this);
        this.nestRocks = [];
        this.animatedFishes = [];

        for (let index = 0; index < 2; index++) {
            this.animatedFishes.push(new MyAnimatedFish(this,
                { x:Math.random()*8-4, y:Math.random()*4+2, z:Math.random()*8-4},
                Math.random()*8+2,
                0.25,
                this.fishBodyTex,
                [Math.random(), Math.random(), Math.random()]
                ));
        }

        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
		this.defaultAppearance.setShininess(120);

		this.sphereAppearance = new CGFappearance(this);
		this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.sphereAppearance.setShininess(120);


        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayPiramid=false;
        this.displayCylinder=false;
        this.displaySphere=false;
        this.displayCube=true;
        this.displayFish=false;
        this.displaySeaFloor=true;
        this.displayWaterSurface=true;
        this.displaySeaWeeds=true;
        this.displayPilar=true;
        this.displayRockSet=true;
        this.displayMovingFish=true;

        this.selectedTexture = 2;
        this.scaleFactor = 2;
        this.speedFactor = 1;


        this.textures = [
            //Test
            this.tnx, this.tny, this.tnz, this.tpx, this.tpy, this.tpz,
            //Landscape
            this.nx, this.ny, this.nz, this.px, this.py, this.pz,
            //Underwater
            this.wnx, this.wny, this.wnz, this.wpx, this.wpy, this.wpz,
        ];

        this.textureIds = { 'Test': 0, 'Landscape': 1, 'Underwater': 2 };
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(1.8, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    checkKeys(){

        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
                //this.myPyramid.accelerate(0.02);
                this.movingFish.accelerate(0.02);
        }
        if (this.gui.isKeyPressed("KeyS")) {
                //this.myPyramid.accelerate(-.1);
                this.movingFish.accelerate(-.1);
        }
        if (this.gui.isKeyPressed("KeyA")) {
            //this.myPyramid.turn(-Math.PI/12);
            this.movingFish.turn(-Math.PI/12);
        }
        else{
            this.movingFish.endTurn('L');
        }
        if (this.gui.isKeyPressed("KeyD")) {
            //this.myPyramid.turn(Math.PI/12);
            this.movingFish.turn(Math.PI/12);
        }
        else{
            this.movingFish.endTurn('R');
        }
        if (this.gui.isKeyPressed("KeyR")) {
            //this.myPyramid.reset();
            this.movingFish.reset(this);
        }
        if (this.gui.isKeyPressed("Space")) {
            //this.myPyramid.turbo();
            this.movingFish.turbo();
        }
        if (this.gui.isKeyPressed("KeyP")){
            this.movingFish.lift(0.05);
        }
        if (this.gui.isKeyPressed("KeyL")){
            this.movingFish.lift(-0.05);

        }
        if(this.gui.isKeyPressed("KeyC")){
            this.movingFish.checkRock(this);
        }
        //if (keysPressed)
        //    console.log(text);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();

        //this.myPyramid.update();

        //this.myFish.update(t);


        //Moving Fish movement
        this.movingFish.update(t);

        this.animatedFishes.forEach( fish=>{
            fish.update(t);
        });
        this.nestRocks.forEach( rock=>{
            if(rock.hasMovement)
                rock.update();
        });

        this.waterSurface.waterShader.setUniformsValues({ timeFactor: t / 500 % 100});
    }

    updateAppliedTexture(){
        this.myCube.update(this);
    }

    updateSceneSpeed(){
        //this.myPyramid.upadateVelocity(this.speedFactor);
        this.movingFish.upadateVelocity(this.speedFactor);
    }
    displayNestRocks(){
        this.nestRocks.forEach( rock=>{
            this.pushMatrix();
            this.translate(rock.nestPosition.x, rock.nestPosition.y, rock.nestPosition.z);
            this.rotate(rock.rotate.y,0,1,0);
            this.scale(rock.scale.x, rock.scale.y, rock.scale.z);
            this.rotate(-Math.PI/2,0,0,1);
            rock.display(this);
            this.popMatrix();
        });
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        
        this.defaultAppearance.apply();
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        //this.sphereAppearance.apply();
        // ---- BEGIN Primitive drawing section
        //This sphere does not have defined texture coordinates
        if(this.displaySphere)
            this.incompleteSphere.display(this);
        
        if(this.displayPiramid){
            this.pushMatrix();
                this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
                this.myPyramid.display(this);
            this.popMatrix();
        }

        if(this.displayCube)
            this.myCube.display(this);

        if(this.displayCylinder)
            this.myCylinder.display();

        if(this.displayFish){
            this.pushMatrix();
                this.translate(0,3,0);
                this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
                this.myFish.display(this);
            this.popMatrix();
        }
        if(this.displaySeaFloor){
            this.seaFloor.display(this);
        }

        if(this.displayWaterSurface){
            this.waterSurface.display(this);
        }

        if(this.displayRockSet){
            this.rockSet.display(this);
        }
        //this.rock.display(this);
        if(this.displayPilar){
            this.pilar.display(this);
        }

        if(this.displaySeaWeeds){
            this.seaWeedSets.display(this);
        }
        if(this.displayMovingFish){
            this.pushMatrix();
                this.movingFish.display(this, this.scaleFactor);
            this.popMatrix();
        }

        if(this.nestRocks.length!=0){
            this.displayNestRocks();
        }
        this.animatedFishes.forEach(fish=>{
            fish.display(this);
        });

        // ---- END Primitive drawing section
    }
}