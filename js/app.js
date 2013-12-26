// requestAnimationFrame support
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

// Application object
var Application = function(id) {
	var self = {
		// layer id
		id : id,
		canvas : undefined,
		renderer : undefined,

		// canvas size
		width : 640,
		height : 480,

		keys: {
			up : false,
			down : false,
			left : false,
			right : false
		},

		clock : undefined
	};

	self.setup = function() {
		// setup the scene
		self.canvas = document.getElementById(self.id);
		// detect webgl support
		if (window.WebGLRenderingContext) {
			self.renderer = new THREE.WebGLRenderer();
			self.renderer.setSize(self.width, self.height);

			self.scene = new THREE.Scene();
			self.scene.add(new THREE.AmbientLight(0x222222));

			self.world = new THREE.Object3D();
			
			// generate your scene
			var obj = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshLambertMaterial({color: 0xcc0000}));
			self.world.add(obj);

			var aspect = self.width / self.height;
			self.camera = new THREE.PerspectiveCamera(45, aspect, 0.01, 100);

			// make the light follow the camera
			var light = new THREE.PointLight(0xffffff, 1, 100);
			self.camera.add(light);

			self.camera.position.set(0, 0, 4);
			self.scene.add(self.camera);

			self.scene.add(self.world);

			// finally add the renderer and create the clock
			self.canvas.appendChild(self.renderer.domElement);
			self.clock = new THREE.Clock();
			return true;
		}
		return false;
	};

	self.draw = function() {
		// draw the scene n FPS
		self.renderer.render(self.scene, self.camera);
	};

	self.update = function(dt) {
		// this is called with the time delta as parameter
		if(self.keys.left) {
			// TODO
		}
		if(self.keys.right) {
			// TODO
		}
		if(self.keys.up) {
			// TODO
		}
		if(self.keys.down) {
			// TODO
		}

		// update the scene
		self.world.rotation.y += dt;
		self.world.rotation.z += dt*0.8;
	};

	self.loop = function() {
		// application loop:
		//   request animation frame,
		//   get time delta,
		//   update and draw the scene
		requestAnimationFrame(self.loop);
		var dt = self.clock.getDelta();
		self.update(dt);
		self.draw();
	};

	self.run = function() {
		// application entry point
		if(self.setup()) {
			self.loop();
		} else {
			self.canvas.innerHTML = "<p>This page requires <a href='http://get.webgl.org/'>WebGL</a>!</p>";
		}
	};

	self.key_down = function(event) {
		// key down handler
		if(event.keyCode == 37) {
			self.keys.left = true;
		}
        if(event.keyCode == 39) {
			self.keys.right = true;
		}
        if(event.keyCode == 38) {
			self.keys.up = true;
		}
        if(event.keyCode == 40) {
			self.keys.down = true;
		}
	};

	self.key_up = function(event) {
		// key up handler
		if(event.keyCode == 37) {
			self.keys.left = false;
		}
        if(event.keyCode == 39) {
			self.keys.right = false;
		}
        if(event.keyCode == 38) {
			self.keys.up = false;
		}
        if(event.keyCode == 40) {
			self.keys.down = false;
		}
	};

	self.init = function() {
		// Application object constructor, add here any app initialization
		// that is webgl independent (ie set event listeners)
		document.addEventListener("keydown", self.key_down, false);
		document.addEventListener("keyup", self.key_up, false);
	};

	self.init();
	return self;
};

window.onload = function () {
	var app = Application("target");
	app.run();
};

