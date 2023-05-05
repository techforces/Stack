varying vec2 v_uv;

uniform float imageRatio;
uniform float planeRatio;

void main() {
  vec4 pos = vec4(position, 1.0);

  if (imageRatio < planeRatio){
    v_uv = vec2(uv.x, uv.y / planeRatio * imageRatio + (1.0 - imageRatio / planeRatio) / 2.0 );
  } else {
    v_uv = vec2(uv.x / imageRatio * planeRatio + (1.0 - planeRatio / imageRatio) / 2.0, uv.y);
  }

  gl_Position = projectionMatrix * modelViewMatrix * pos;
}