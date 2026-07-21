import { useEffect, useRef } from "react";

const VERT = `attribute vec2 a_pos; void main(){ gl_Position=vec4(a_pos,0.0,1.0);} `;

const FRAG = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec3 u_colors[8];
uniform vec4 u_scene;
uniform vec4 u_shape;
uniform vec4 u_surface;
uniform vec4 u_finish;
uniform vec4 u_transform;
uniform vec4 u_space;
uniform vec4 u_cursor;
#define u_resolution u_scene.xy
#define u_time u_scene.z
#define u_colorCount u_scene.w
#define u_scale u_shape.x
#define u_intensity u_shape.y
#define u_warp u_shape.w
#define u_detail u_surface.x
#define u_contrast u_surface.y
#define u_brightness u_surface.z
#define u_saturation u_surface.w
#define u_hue u_finish.x
#define u_vignette u_finish.y
#define u_blur u_finish.z
#define u_grain u_finish.w
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define u_seed u_transform.x
#else
#define u_seed mod(u_transform.x,31.0)
#endif
#define u_rotate u_transform.y
#define u_drift u_transform.z
#define u_oklab u_transform.w
#define u_offset u_space.xy
#define u_mouse u_space.zw
#define u_cursorPresence u_cursor.x
#define u_cursorEffect u_cursor.y
#define u_cursorStrength u_cursor.z
#define u_cursorRadius u_cursor.w
float hash21(vec2 p){
#ifndef GL_FRAGMENT_PRECISION_HIGH
p=mod(p,31.0);
#endif
p=fract(p*vec2(234.34,435.345));p+=dot(p,p+34.23);return fract(p.x*p.y);} 
float grainHash(vec2 p){vec3 p3=fract(vec3(p.xyx)*0.1031);p3+=dot(p3,p3.yzx+33.33);return fract((p3.x+p3.y)*p3.z);} 
float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);vec2 u=f*f*(3.0-2.0*f);return mix(mix(hash21(i),hash21(i+vec2(1.0,0.0)),u.x),mix(hash21(i+vec2(0.0,1.0)),hash21(i+vec2(1.0,1.0)),u.x),u.y);} 
float fbm(vec2 p){float v=0.0;float a=0.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.03+vec2(17.0,9.2);a*=0.5;}return v;} 
vec3 hueRotate(vec3 col,float a){const mat3 toYIQ=mat3(0.299,0.596,0.211,0.587,-0.274,-0.523,0.114,-0.322,0.312);const mat3 toRGB=mat3(1.0,1.0,1.0,0.956,-0.272,-1.106,0.621,-0.647,1.703);vec3 yiq=toYIQ*col;float ca=cos(a),sa=sin(a);yiq=vec3(yiq.x,yiq.y*ca-yiq.z*sa,yiq.y*sa+yiq.z*ca);return toRGB*yiq;} 
vec3 shade(vec2 uv,vec2 p,float t){vec3 acc=u_colors[0]*0.15;float total=0.15;for(int i=0;i<8;i++){if(float(i)>=u_colorCount)break;float fi=float(i);vec2 c=vec2(sin(t*(0.21+fi*0.071)+fi*2.4+u_seed),cos(t*(0.17+fi*0.093)+fi*1.7))*(0.45+u_intensity*0.35);float w=exp(-dot(p-c,p-c)*6.0);acc+=u_colors[i]*w;total+=w;}return acc/total;} 
void main(){vec2 uv=gl_FragCoord.xy/u_resolution.xy;vec2 screenUv=uv;vec2 p=(gl_FragCoord.xy-0.5*u_resolution.xy)/min(u_resolution.x,u_resolution.y);float cursorMask=0.0;
if(u_cursorPresence>0.001){vec2 cursor=(0.5*u_mouse*u_resolution.xy)/min(u_resolution.x,u_resolution.y);vec2 cursorDelta=p-cursor;if(u_cursorEffect<0.5){p+=cursor*u_cursorPresence*u_cursorStrength*0.55;}else{float cd=length(cursorDelta);vec2 dir=cursorDelta/max(cd,0.0001);cursorMask=u_cursorPresence*(1.0-smoothstep(0.0,u_cursorRadius,cd));if(u_cursorEffect<1.5){p-=dir*cursorMask*u_cursorStrength*0.24;}else if(u_cursorEffect<2.5){float ang=cursorMask*u_cursorStrength*2.2;float cc=cos(ang),cs=sin(ang);p=cursor+mat2(cc,-cs,cs,cc)*cursorDelta;}else if(u_cursorEffect<3.5){float rip=sin(cd/max(u_cursorRadius,0.001)*18.0-u_time*5.0);p-=dir*rip*cursorMask*u_cursorStrength*0.07;}}}
uv=p*min(u_resolution.x,u_resolution.y)/u_resolution.xy+0.5;p*=u_scale;
if(abs(u_rotate)>0.0001){float cr=cos(u_rotate),sr=sin(u_rotate);p=mat2(cr,-sr,sr,cr)*p;}
p+=u_offset;if(u_drift>0.0001)p+=u_drift*vec2(sin(u_time*0.31),cos(u_time*0.23));
if(u_warp>0.0){p+=u_warp*(vec2(fbm(p*u_detail+u_seed),fbm(p*u_detail+vec2(5.2,1.3)))-0.5);} 
vec3 col;if(u_blur>0.0){float e=u_blur;float pe=e*u_scale;vec2 uvE=vec2(e)*min(u_resolution.x,u_resolution.y)/u_resolution.xy;col=shade(uv,p,u_time)*0.36;col+=shade(uv+vec2(uvE.x,0.0),p+vec2(pe,0.0),u_time)*0.16;col+=shade(uv-vec2(uvE.x,0.0),p-vec2(pe,0.0),u_time)*0.16;col+=shade(uv+vec2(0.0,uvE.y),p+vec2(0.0,pe),u_time)*0.16;col+=shade(uv-vec2(0.0,uvE.y),p-vec2(0.0,pe),u_time)*0.16;}else{col=shade(uv,p,u_time);} 
if(abs(u_contrast-1.0)>0.0001)col=(col-0.5)*u_contrast+0.5;
if(abs(u_saturation-1.0)>0.0001){float luma=dot(col,vec3(0.299,0.587,0.114));col=mix(vec3(luma),col,u_saturation);} 
if(abs(u_hue)>0.0001)col=hueRotate(col,u_hue);
if(abs(u_brightness)>0.0001)col+=u_brightness;
if(u_vignette>0.0001){float vd=length(screenUv-0.5)*1.41421356;col*=1.0-u_vignette*smoothstep(0.35,1.0,vd);} 
if(u_cursorPresence>0.001&&u_cursorEffect>3.5)col+=(vec3(0.18)+col*0.12)*cursorMask*u_cursorStrength;
if(u_grain>0.0001)col+=(grainHash(gl_FragCoord.xy+vec2(u_seed*17.0,u_seed*31.0))-0.5)*u_grain;
gl_FragColor=vec4(clamp(col,0.0,1.0),1.0);} `;

const COLORS = [
  [0.063, 0.063, 0.063],
  [0.961, 0.961, 0.961],
  [0.69, 0.69, 0.69],
  [0.227, 0.227, 0.227],
];

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function MeshDriftShader({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uColors = gl.getUniformLocation(prog, "u_colors[0]");
    const uScene = gl.getUniformLocation(prog, "u_scene");
    const uShape = gl.getUniformLocation(prog, "u_shape");
    const uSurface = gl.getUniformLocation(prog, "u_surface");
    const uFinish = gl.getUniformLocation(prog, "u_finish");
    const uTransform = gl.getUniformLocation(prog, "u_transform");
    const uSpace = gl.getUniformLocation(prog, "u_space");
    const uCursor = gl.getUniformLocation(prog, "u_cursor");

    const colorArr = new Float32Array(8 * 3);
    for (let i = 0; i < 8; i++) {
      const c = COLORS[i] ?? COLORS[COLORS.length - 1];
      colorArr[i * 3] = c[0];
      colorArr[i * 3 + 1] = c[1];
      colorArr[i * 3 + 2] = c[2];
    }
    gl.uniform3fv(uColors, colorArr);

    let raf = 0;
    let start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const render = (now: number) => {
      resize();
      const t = ((now - start) / 1000) * 0.73;
      gl.uniform4f(uScene, canvas.width, canvas.height, t, 4.0);
      gl.uniform4f(uShape, 1.16, 0.34, 0.5, 0.0);
      gl.uniform4f(uSurface, 2.4, 1.16, 0.0, 1.0);
      gl.uniform4f(uFinish, 0.0, 0.0, 0.0, 0.09);
      gl.uniform4f(uTransform, 1453.0, 0.0, 0.0, 0.0);
      gl.uniform4f(uSpace, 0.0, 0.0, 0.0, 0.0);
      gl.uniform4f(uCursor, 0.0, 2.0, 0.65, 0.46);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        start = performance.now() - 0;
        raf = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
