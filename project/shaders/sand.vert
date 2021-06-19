attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSamplerMap;

uniform float multiplyFactor;
uniform float subtractFactor;

void main() {
	
	vTextureCoord = aTextureCoord;

	vec3 offset=vec3(0.0,0.0,texture2D(uSamplerMap,vTextureCoord).b*multiplyFactor-subtractFactor);
	if((offset+aVertexPosition).y>1.0){
		offset.y = aVertexPosition.y-1.0;
	}

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);

}
