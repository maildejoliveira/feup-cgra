#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSamplerSand;
uniform sampler2D uSamplerMap;


void main() {
	vec4 color = texture2D(uSamplerSand, vTextureCoord);

	if(texture2D(uSamplerMap,vTextureCoord).b<0.47){
		color-=vec4(0.15,0.12,0.1,0)*0.5;
	}
	
	gl_FragColor = color;
}