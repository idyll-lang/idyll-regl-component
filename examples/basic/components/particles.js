
const ReglComponent = require('idyll-regl-component');

class Particles extends ReglComponent {

  initialize(r, node, props) {
    var width = node.getBoundingClientRect().width;
    var height = width / 2;
    node.style.height = height + 'px';

    const mat4 = require('gl-mat4')
    const regl = r(node);
    const hsv2rgb = require('hsv2rgb')

    const NUM_POINTS = 1e4
    const VERT_SIZE = 4 * (4 + 4 + 3)
    let pauseFrames = 0;

    const pointBuffer = regl.buffer(Array(NUM_POINTS).fill().map(function () {
      const color = hsv2rgb(Math.random() * 360, 0.6, 1)
      return [
        // freq
        Math.random() * 10,
        Math.random() * 10,
        Math.random() * 10,
        Math.random() * 10,
        // phase
        2.0 * Math.PI * Math.random(),
        2.0 * Math.PI * Math.random(),
        2.0 * Math.PI * Math.random(),
        2.0 * Math.PI * Math.random(),
        // color
        color[0] / 255, color[1] / 255, color[2] / 255
      ]
    }))

    const drawParticles = regl({
      vert: `
      precision mediump float;
      attribute vec4 freq, phase;
      attribute vec3 color;
      uniform float time;
      uniform float size;
      uniform mat4 view, projection;
      varying vec3 fragColor;
      void main() {
        vec3 position = 8.0 * cos(freq.xyz * time + phase.xyz);
        gl_PointSize = size * 5.0 * (1.0 + cos(freq.w * time + phase.w));
        gl_Position = projection * view * vec4(position, 1);
        fragColor = color;
      }`,

      frag: `
      precision lowp float;
      varying vec3 fragColor;
      void main() {
        if (length(gl_PointCoord.xy - 0.5) > 0.5) {
          discard;
        }
        gl_FragColor = vec4(fragColor, 1);
      }`,

      attributes: {
        freq: {
          buffer: pointBuffer,
          stride: VERT_SIZE,
          offset: 0
        },
        phase: {
          buffer: pointBuffer,
          stride: VERT_SIZE,
          offset: 16
        },
        color: {
          buffer: pointBuffer,
          stride: VERT_SIZE,
          offset: 32
        }
      },

      uniforms: {
        view: ({tick}) => {
          const t = 0.01 * (tick - pauseFrames + this.props.frameOffset)
          return mat4.lookAt([],
            [30 * Math.cos(t / this.props.speed), 2.5, 30 * Math.sin(t)],
            [0, 0, 0],
            [0, 1, 0])
        },
        projection: ({viewportWidth, viewportHeight}) =>
          mat4.perspective([],
            Math.PI / 4,
            viewportWidth / viewportHeight,
            0.01,
            1000),
        time: ({tick}) => (tick - pauseFrames + this.props.frameOffset) * 0.001,
        size: () => this.props.size
      },

      count: NUM_POINTS,

      primitive: 'points'
    })

    regl.frame(() => {
      if (!this.props.play) {
        pauseFrames++;
      }
      regl.clear({
        depth: 1,
        color: [1, 1, 1, 1]
      })

      drawParticles();
    })

  }
}

Particles.defaultProps = {
  size: 1.0,
  speed: 30,
  play: true,
  frameOffset: 0
};

module.exports = Particles;
