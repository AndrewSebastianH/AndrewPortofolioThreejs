'use client'
import { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function ThreeComponent() {
  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      80,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )

    const geometry = new THREE.SphereGeometry(14, 64, 64)
    const sphereTexture = new THREE.TextureLoader().load('images/sphere1.jpg')
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(14, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: sphereTexture,
        opacity: 0.5,
        transparent: true,
      }),
    )

    scene.add(sphere)

    // const segmentMaterial = new THREE.MeshStandardMaterial({
    //   color: 0xffffff,
    // })
    // const wireframeMaterial = new THREE.MeshBasicMaterial({
    //   color: 0x00febb,
    //   wireframe: true,
    //   opacity: 0.175,
    //   transparent: true,
    // })

    // const segmentSphere = new THREE.Mesh(geometry, segmentMaterial)
    // const wireframeSphere = new THREE.Mesh(geometry, wireframeMaterial)

    // scene.add(segmentSphere)
    // scene.add(wireframeSphere)

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg'),
      antialias: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor('#222222')

    camera.position.z = 20

    const pointLight = new THREE.PointLight(0xffffff, 40)
    // const ambientLight = new THREE.AmbientLight(0x404040, 10)
    pointLight.position.set(4, 7, 21)
    scene.add(pointLight)
    // scene.add(ambientLight)

    // Helpers
    const lightHelper = new THREE.PointLightHelper(pointLight)
    const gridHelper = new THREE.GridHelper(200, 50)
    scene.add(lightHelper, gridHelper)

    const orbitControl = new OrbitControls(camera, renderer.domElement)

    const handleResize = () => {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight

      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()

      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    const animate = () => {
      requestAnimationFrame(animate)

      sphere.rotation.x += 0.0025
      sphere.rotation.y += 0.0025
      // segmentSphere.rotation.x += 0.0025
      // segmentSphere.rotation.y += 0.0025
      // wireframeSphere.rotation.x += 0.0025
      // wireframeSphere.rotation.y += 0.0025

      orbitControl.update()

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup function
    return () => {
      geometry.dispose()
      sphereTexture.dispose()
      // segmentMaterial.dispose()
      // wireframeMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <>
      <canvas id="bg" className="fixed top-0 left-0" />
      <div className="absolute w-full h-full">
        <div className="font-aqua text-lg gap-5 flex flex-row justify-end m-2.5 text-white">
          <div>Profile</div>
          <div>Projects</div>
        </div>
        <div className="font-aqua flex justify-center -mt-10 items-center h-full ] text-white text-3xl tracking-wider">
          ANDREW SEBASTIAN HARDIANTA
        </div>
      </div>
    </>
  )
}
