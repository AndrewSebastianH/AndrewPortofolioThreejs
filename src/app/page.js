'use client'
import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import anime from 'animejs/lib/anime.es.js'

export default function ThreeComponent() {
  const [webLoading, setWebLoading] = useState(true)
  const [loadingAppear, setLoadingAppear] = useState(true)
  // Moons
  const mainPlanetRef = useRef(null)
  const profileMoonRef = useRef(null)
  const workMoonRef = useRef(null)
  // refs
  const cameraRef = useRef(null)
  const orbitControlRef = useRef(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    cameraRef.current = camera

    const geometry = new THREE.SphereGeometry(14, 64, 64)
    const sphereTexture = new THREE.TextureLoader().load('images/sphere1.jpg')
    const sphereTexture2 = new THREE.TextureLoader().load('images/sphere3.jpg')
    const sphereTexture3 = new THREE.TextureLoader().load('images/sphere4.jpg')
    const sphereTexture4 = new THREE.TextureLoader().load('images/sphere5.jpg')

    const mainBigSphere = new THREE.Mesh(
      new THREE.SphereGeometry(36, 64, 64),
      new THREE.MeshStandardMaterial({
        // color: 0xffffff,
        map: sphereTexture,
      }),
    )

    mainBigSphere.position.set(0, 0, 0)
    mainPlanetRef.current = mainBigSphere

    const profileMoonMesh = new THREE.Mesh(
      new THREE.SphereGeometry(10, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: sphereTexture2,
      }),
    )
    profileMoonMesh.position.set(120, 50, 0)
    profileMoonRef.current = profileMoonMesh

    const workMoonMesh = new THREE.Mesh(
      new THREE.SphereGeometry(16, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: sphereTexture3,
      }),
    )
    workMoonMesh.position.set(-250, 150, -20)
    workMoonRef.current = workMoonMesh

    scene.add(mainBigSphere, profileMoonMesh, workMoonMesh)

    // const wireframeMaterial = new THREE.MeshBasicMaterial({
    //   color: 0xffffff,
    //   wireframe: true,
    //   opacity: 0.075,
    //   transparent: true,
    // })

    // const wireframeSphere = new THREE.Mesh(geometry, wireframeMaterial)
    // wireframeSphere.position.set(-170, 0, 0)
    // scene.add(wireframeSphere)

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg'),
      antialias: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor('#222222')

    camera.position.z = 150
    camera.position.x = 300
    camera.position.y = 350

    const pointLight = new THREE.PointLight(0xffffff, 1000)
    // const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    pointLight.position.set(
      mainBigSphere.position.x + 15,
      mainBigSphere.position.y + 30,
      mainBigSphere.position.z + 52.5,
    )
    scene.add(pointLight)

    const lightHelper = new THREE.PointLightHelper(pointLight)
    const gridHelper = new THREE.GridHelper(200, 50)
    scene.add(lightHelper, gridHelper)

    const orbitControl = new OrbitControls(camera, renderer.domElement)
    orbitControl.target.set(0, 0, 0)
    orbitControlRef.current = orbitControl

    const handleResize = () => {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight

      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()

      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    // Camera Animation
    const targetPosition = new THREE.Vector3(0, 0, 65)
    const rotateTarget = new THREE.Vector3(0, 0, 0)

    // Animation for the camera
    const cameraAnimationRotate = new TWEEN.Tween(orbitControl.target)
      .to(
        {
          x: rotateTarget.x,
          y: rotateTarget.y,
          z: rotateTarget.z,
        },
        3000,
      )
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onComplete(() => {})
      .start()

    const cameraAnimation = new TWEEN.Tween(camera.position)
      .to(
        {
          x: targetPosition.x,
          y: targetPosition.y,
          z: targetPosition.z,
        },
        3000,
      )
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onComplete(() => {})
      .start()

    window.addEventListener('load', () => {
      setWebLoading(false)
    })

    const animate = () => {
      requestAnimationFrame(animate)

      mainBigSphere.rotation.x += 0.0005
      mainBigSphere.rotation.y += 0.0005
      camera.rotation.set(1, 0, -1)

      // Update point light position to follow the mainBigSphere
      pointLight.position
        .copy(mainBigSphere.position)
        .add(new THREE.Vector3(15, 30, 52.5))

      orbitControl.update()

      renderer.render(scene, camera)
      TWEEN.update()
    }

    animate()

    return () => {
      geometry.dispose()
      sphereTexture.dispose()
      renderer.dispose()
    }
  }, [])

  useEffect(() => {
    anime({
      targets: '.loader-container',
      keyframes: [{ opacity: 1 }, { opacity: 0 }],
      duration: 2000,
      loop: false,
      easing: 'easeOutQuad',
    })

    setTimeout(() => {
      setLoadingAppear(false)
    }, 2500)
  }, [!webLoading])

  useEffect(() => {
    anime({
      targets: '.land-page',
      keyframes: [{ opacity: 0 }, { opacity: 1 }],
      duration: 1000,
      loop: false,
      easing: 'easeOutQuad',
    })
  }, [!loadingAppear])

  const handleProfileClick = () => {
    if (profileMoonRef.current && cameraRef.current) {
      const targetPosition = new THREE.Vector3().copy(
        profileMoonRef.current.position,
      )

      // Animate camera rotation
      new TWEEN.Tween(orbitControlRef.current.target)
        .to({
          x: targetPosition.x + 25,
          y: targetPosition.y,
          z: targetPosition.z,
        })
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start()

      // Animate camera position
      new TWEEN.Tween(cameraRef.current.position)
        .to(
          {
            x: targetPosition.x + 40,
            y: targetPosition.y,
            z: targetPosition.z + 10,
          },
          1000,
        )
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onComplete(() => {})
        .start()
    }
  }

  const handleWorkClick = () => {
    if (workMoonRef.current && cameraRef.current) {
      const targetPosition = new THREE.Vector3().copy(
        workMoonRef.current.position,
      )

      // Animate camera rotation
      new TWEEN.Tween(orbitControlRef.current.target)
        .to({
          x: targetPosition.x - 20,
          y: targetPosition.y,
          z: targetPosition.z,
        })
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start()

      // Animate camera position
      new TWEEN.Tween(cameraRef.current.position)
        .to(
          {
            x: targetPosition.x - 30,
            y: targetPosition.y,
            z: targetPosition.z + 40,
          },
          1000,
        )
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onComplete(() => {})
        .start()
    }
  }

  return (
    <>
      <canvas id="bg" className="fixed top-0 left-0" />

      {loadingAppear && (
        <div
          className="loader-container absolute bg-neutral-800 w-full h-full flex justify-center items-center"
          style={{
            opacity: 1,
          }}
        >
          <div className="loader" />
        </div>
      )}
      {!loadingAppear && (
        <div
          className="land-page absolute w-full h-full"
          style={{
            opacity: 0,
          }}
        >
          <div className="tabs font-aqua text-xl gap-12 justify-end flex flex-row mt-2.5 mr-5 text-white">
            <div>
              <a href="#profile" onClick={handleProfileClick}>
                Profile
              </a>
            </div>
            <div>
              <a href="#work" onClick={handleWorkClick}>
                Work
              </a>
            </div>
            <div>
              <a href="#contact">Contact Me</a>
            </div>
          </div>
          <div className="big-name font-aqua flex justify-center -mt-10 items-center h-full name text-white text-3xl tracking-wider">
            ANDREW SEBASTIAN HARDIANTA
          </div>
        </div>
      )}
    </>
  )
}
