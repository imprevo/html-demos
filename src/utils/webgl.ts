export function getWebGLContext(canvas: HTMLCanvasElement) {
  if (canvas) {
    const context = canvas.getContext('webgl');
    if (context) {
      return context;
    }
  }
  throw new Error(
    'Unable to initialize WebGL. Your browser or machine may not support it.'
  );
}

export function clearScene(gl: WebGLRenderingContext) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
  gl.clearDepth(1.0); // Clear everything
  gl.enable(gl.DEPTH_TEST); // Enable depth testing
  gl.depthFunc(gl.LEQUAL); // Near things obscure far things

  // Clear the canvas before we start drawing on it.
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

export function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

  // Check if the canvas is not the same size.
  const needResize =
    canvas.width !== displayWidth || canvas.height !== displayHeight;

  if (needResize) {
    // Make the canvas the same size
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }

  return needResize;
}

export function initShaderProgram(
  gl: WebGLRenderingContext,
  vsSource: string,
  fsSource: string
) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program
  const program = gl.createProgram();

  if (!program) {
    throw new Error('Unable to create the shader program');
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  // If creating the shader program failed
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Unable to initialize the shader program: ${info}`);
  }

  return program;
}

export function loadShader(
  gl: WebGLRenderingContext,
  type: GLenum,
  source: string
) {
  const shader = gl.createShader(type);

  if (!shader) {
    throw new Error('Unable to create the shader');
  }

  // Send the source to the shader object
  gl.shaderSource(shader, source);

  // Compile the shader program
  gl.compileShader(shader);

  // See if it compiled successfully
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`An error occurred compiling the shaders: ${info}`);
  }

  return shader;
}

export function initPositionBuffer(
  gl: WebGLRenderingContext,
  positions: number[][]
) {
  // Create a buffer for the square's positions.
  const positionBuffer = gl.createBuffer();

  if (!positionBuffer) {
    throw new Error('Unable to initialize the buffer');
  }

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(positions.flat()),
    gl.STATIC_DRAW
  );

  return positionBuffer;
}
