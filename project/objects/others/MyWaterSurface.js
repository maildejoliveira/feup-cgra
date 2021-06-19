import {CGFappearance, CGFshader, CGFtexture} from '../../../lib/CGF.js';
import {MyPlane} from '../primitives/MyPlane.js';

export class MyWaterSurface extends MyPlane {
	/**
	 * @method constructor
	 * @param  {CGFscene} scene - MyScene object
	 * @param  {int} nrDivs - number of divisions in both directions of the surface
	 */
	constructor(scene, nrDivs) {
		super(scene, nrDivs);
		
		this.waterSurfaceAppearance = new CGFappearance(scene);
		this.waterSurfaceAppearance.loadTexture("./images/pier.jpg");
		this.waterSurfaceAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
		this.waterSurfaceAppearance.setEmission(0.5,0.5,0.5,1);

		this.waterShader = new CGFshader(scene.gl, "shaders/water.vert", "shaders/water.frag");
		this.distortionMap = new CGFtexture(scene, "./images/distortionmap.png");
		this.waterShader.setUniformsValues({ uSamplerMap: 1});

	}
	display(scene){
		scene.pushMatrix();
			scene.setActiveShader(this.waterShader);
			this.distortionMap.bind(1);
			//scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_WRAP_S, scene.gl.REPEAT);
        	//scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_WRAP_T, scene.gl.REPEAT);
			scene.translate(0,10,0);
			scene.scale(25,1,25);
			scene.rotate(Math.PI,0,1,0);
			scene.rotate(+Math.PI/2, 1,0,0);
			this.waterSurfaceAppearance.apply();
			super.display();
			scene.setActiveShader(scene.defaultShader);
		scene.popMatrix();
	}
}


