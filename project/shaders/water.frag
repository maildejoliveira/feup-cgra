#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSamplerMap;

uniform float timeFactor;

void main() {
	vec2 v = vTextureCoord + timeFactor*0.009;
	vec2 offset = vec2(texture2D(uSamplerMap, v).r-0.5 ,texture2D(uSamplerMap, v).g-0.5);
	vec4 color = texture2D(uSampler, vTextureCoord+offset*0.6);
	
	gl_FragColor = color;
}