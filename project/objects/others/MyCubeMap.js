import {CGFappearance, CGFtexture} from '../../../lib/CGF.js';
import { MyQuad } from '../primitives/MyQuad.js';

export class MyCubeMap {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {CGFtexture} nx - negative X axis texture
     * @param  {CGFtexture} ny - negative Y axis texture
     * @param  {CGFtexture} nz - negative Z axis texture
     * @param  {CGFtexture} px - positive X axis texture
     * @param  {CGFtexture} py - positive Y axis texture
     * @param  {CGFtexture} pz - positive Z axis texture
     */
	constructor(scene, nx, ny, nz, px, py, pz){
		this.quad = new MyQuad(scene);

        //Materials for each of the cube faces
        this.nxMaterial = new CGFappearance(scene);
        this.nxMaterial.setTexture(nx);
        this.nxMaterial.setAmbient(0, 0,0, 1.0);
        this.nxMaterial.setDiffuse(0, 0, 0, 1.0);
        this.nxMaterial.setSpecular(0, 0, 0, 1.0);
        this.nxMaterial.setEmission(1,1,1,1);

        this.nyMaterial = new CGFappearance(scene);
        this.nyMaterial.setTexture(ny);
        this.nyMaterial.setAmbient(0, 0,0, 1.0);
        this.nyMaterial.setDiffuse(0, 0, 0, 1.0);
        this.nyMaterial.setSpecular(0, 0, 0, 1.0);
        this.nyMaterial.setEmission(1,1,1,1);

        this.nzMaterial = new CGFappearance(scene);
        this.nzMaterial.setTexture(nz);
        this.nzMaterial.setAmbient(0, 0,0, 1.0);
        this.nzMaterial.setDiffuse(0, 0, 0, 1.0);
        this.nzMaterial.setSpecular(0, 0, 0, 1.0);
        this.nzMaterial.setEmission(1,1,1,1);

        this.pxMaterial = new CGFappearance(scene);
        this.pxMaterial.setTexture(px);
        this.pxMaterial.setAmbient(0, 0,0, 1.0);
        this.pxMaterial.setDiffuse(0, 0, 0, 1.0);
        this.pxMaterial.setSpecular(0, 0, 0, 1.0);
        this.pxMaterial.setEmission(1,1,1,1);

        this.pyMaterial = new CGFappearance(scene);
        this.pyMaterial.setTexture(py);
        this.pyMaterial.setAmbient(0, 0,0, 1.0);
        this.pyMaterial.setDiffuse(0, 0, 0, 1.0);
        this.pyMaterial.setSpecular(0, 0, 0, 1.0);
        this.pyMaterial.setEmission(1,1,1,1);

        this.pzMaterial = new CGFappearance(scene);
        this.pzMaterial.setTexture(pz);
        this.pzMaterial.setAmbient(0, 0,0, 1.0);
        this.pzMaterial.setDiffuse(0, 0, 0, 1.0);
        this.pzMaterial.setSpecular(0, 0, 0, 1.0);
        this.pzMaterial.setEmission(1,1,1,1);
	}
	display(scene){
        const translate1 = [
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,0,0.5,1
        ];
        const rotatex = [
            1,0,0,0,
            0, Math.cos(Math.PI/2), Math.sin(Math.PI/2),0,
            0,-Math.sin(Math.PI/2),Math.cos(Math.PI/2),0,
            0,0,0,1
        ];
        const rotatey = [
            Math.cos(Math.PI/2),0,-Math.sin(Math.PI/2),0,
            0,1,0,0,
            Math.sin(Math.PI/2),0,Math.cos(Math.PI/2),0,
            0,0,0,1
        ];

        scene.pushMatrix();
            
            scene.translate(scene.camera.position[0],scene.camera.position[1],scene.camera.position[2]);
            scene.scale(500,500,500);

            scene.pushMatrix();
                scene.rotate(Math.PI,0,1,0);
                scene.multMatrix(rotatex);
                scene.multMatrix(translate1);
                this.nyMaterial.apply();
                this.quad.display();
            scene.popMatrix();
            scene.pushMatrix();
                scene.multMatrix(translate1);
                this.pzMaterial.apply();
                this.quad.display();
            scene.popMatrix();
            scene.pushMatrix();
                scene.rotate(Math.PI, 0, 1, 0);
                scene.multMatrix(translate1);
                this.nzMaterial.apply();
                this.quad.display();
            scene.popMatrix();
            scene.pushMatrix();
                scene.rotate(Math.PI,0,1,0);
                scene.multMatrix(rotatex);
                scene.multMatrix(rotatex);
                scene.multMatrix(rotatex);
                scene.multMatrix(translate1);
                this.pyMaterial.apply();
                this.quad.display();
            scene.popMatrix();
            scene.pushMatrix();
                scene.multMatrix(rotatey);
                scene.multMatrix(translate1);
                this.pxMaterial.apply();
                this.quad.display();
            scene.popMatrix();
            scene.pushMatrix();
                scene.multMatrix(rotatey);
                scene.multMatrix(rotatey);
                scene.multMatrix(rotatey);
                scene.multMatrix(translate1);
                this.nxMaterial.apply();
                this.quad.display();
            scene.popMatrix();
        scene.popMatrix();
    }
    /**
     * Called when the selected Cube texture is modified 
     * @param {CGFscene} scene - MyScene object
     */
    update(scene){
        this.nxMaterial.setTexture(scene.textures[6*scene.selectedTexture]);
        this.nyMaterial.setTexture(scene.textures[6*scene.selectedTexture+1]);
        this.nzMaterial.setTexture(scene.textures[6*scene.selectedTexture+2]);
        this.pxMaterial.setTexture(scene.textures[6*scene.selectedTexture+3]);
        this.pyMaterial.setTexture(scene.textures[6*scene.selectedTexture+4]);
        this.pzMaterial.setTexture(scene.textures[6*scene.selectedTexture+5]);
    }
}

