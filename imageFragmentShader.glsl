
uniform vec2 u_resolion;

uniform sampler2D u_image;

uniform float opacity;

uniform bool selected;
uniform float hoverRate;

varying vec2 v_uv;

uniform float windowHalf;
uniform float waveHalf;
uniform float impulse;

uniform float pixelRatio;

void main() {
  vec4 image = texture2D(u_image, v_uv);
  float gray = (image.r + image.g + image.b) / 5.0;

  float grade;
  if (selected){
    grade = 1.0;
  } else {
    float coef = max((waveHalf - abs(gl_FragCoord.x/pixelRatio - windowHalf))/(waveHalf / 2.0), 0.0);
    grade = min(1.0, coef * impulse + max(hoverRate - impulse, 0.0));
  }

  gl_FragColor = mix(vec4(vec3(gray), opacity), vec4(image), grade);
}