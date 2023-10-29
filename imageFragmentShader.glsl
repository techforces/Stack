uniform vec2 u_mouse;
uniform vec2 u_res;

uniform sampler2D u_image;
uniform sampler2D u_imagehover;

uniform float u_time;
uniform float mixValue;
uniform float opacity;

uniform bool selected;
uniform bool hovered;

varying vec2 v_uv;

uniform float windowHalf;
uniform float waveHalf;
uniform float impulse;

void main() {
	float v_mixVal = mixValue;
  vec4 image = texture2D(u_image, v_uv);
  float gray = (image.r + image.g + image.b) / 5.0;

  float loc_opacity = opacity;
  float coef = min(1.0, max((waveHalf - abs(gl_FragCoord.x - windowHalf))/(waveHalf / 2.0), 0.0));
  float grade = coef * impulse;
 
  if (selected){
    loc_opacity = 1.0;
    grade = 1.0;
  }

  
  gl_FragColor = mix(vec4(vec3(gray), loc_opacity), vec4(image), grade);
}