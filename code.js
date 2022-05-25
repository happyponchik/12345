function init() {
	 scene = new THREE.Scene();
	 var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;

	 var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('Canvas'), antialias:true});
	renderer.setClearColor(0x333333);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	 document.body.appendChild(renderer.domElement);

	 var camera=new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000);
	 camera.position.z = 200;
	camera.position.y = 200;
	camera.position.x = 200;

	 scene.add(camera);

	window.addEventListener('resize', function() {
	var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
	 renderer.setSize(WIDTH, HEIGHT);
	 camera.aspect = WIDTH / HEIGHT;
	 camera.updateProjectMatrix();
	 });
	
	var lightOne= new THREE.AmbientLight(0xfffff, 0.5);
	scene.add(lightOne);
	
	var lightTwo=new THREE.PointLight(0xfffff, 0.5);
	scene.add(lightTwo);

	 var objLoader = new THREE.OBJLoader();
	 objLoader.load("bed.obj", function(mesh){
			mesh.traverse(function(node){
				if(node instanceof THREE.Mesh){
					node.castShadow = true;
					node.receiveShadow = true;
				}
			})
			scene.add(mesh);
			mesh.position.set(-100, 0, -50);
			mesh.rotation.y = -Math.PI/4;

	});

	requestAnimationFrame(render);
	function render() {
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}
	controls = new THREE.OrbitControls(camera,renderer.domElement);
}

function animate()
{
	 controls.update();
	 renderer.render(scene, camera);
	 requestAnimationFrame(animate);
}
