attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler4;
uniform float normScale;
uniform float timeFactor;

void main() {

	vec3 offset=vec3(0.0,0.0,0.0);
	
	vTextureCoord = aTextureCoord + vec2(timeFactor*0.02,timeFactor*0.02);
	offset=aVertexNormal*texture2D(uSampler4,vTextureCoord).b*0.05;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);

}
