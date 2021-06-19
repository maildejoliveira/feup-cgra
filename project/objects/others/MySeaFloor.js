import { CGFshader, CGFtexture} from '../../../lib/CGF.js';
import { MyPlane } from '../primitives/MyPlane.js';

export class MySeaFloor extends MyPlane {
	/**
	 * @method constructor
	 * @param  {CGFscene} scene - MyScene object
	 * @param  {int} nrDivs - number of divisions in both directions of the surface 
	 * @param  {float} multiplyFactor - factor to be applied in the objects shader
	 * @param  {float} subtractFactor - factor to be applied in the objects shader
	 * @param  {int} minS - minimum texture coordinate in S
	 * @param  {int} maxS - maximum texture coordinate in S
	 * @param  {int} minT - minimum texture coordinate in T
	 * @param  {int} maxT - maximum texture coordinate in T
	 */
	constructor(scene, nrDivs, multiplyFactor, subtractFactor, minS, maxS, minT, maxT) {
		super(scene, nrDivs, minS, maxS, minT, maxT)

		this.mFactor = multiplyFactor;
        this.sFactor = subtractFactor;

		//Map texture
        this.seaSandTexture = new CGFtexture(scene,"./images/sandwithrock.png");
        this.seaMapTexture = new CGFtexture(scene, "./images/mapwithrocks.png");

        //Shader
        this.sandShader = new CGFshader(scene.gl, "shaders/sand.vert", "shaders/sand.frag");
        this.sandShader.setUniformsValues({ uSamplerSand: 0, uSamplerMap: 1, multiplyFactor: this.mFactor, subtractFactor: this.sFactor});
	}
	display(scene){
        scene.pushMatrix();
            scene.setActiveShader(this.sandShader);
            this.seaSandTexture.bind(0);
            this.seaMapTexture.bind(1);
            scene.scale(25,1,25);
            scene.rotate(-Math.PI/2, 1,0,0);
            super.display();
            scene.setActiveShader(scene.defaultShader);
        scene.popMatrix();
    };
}