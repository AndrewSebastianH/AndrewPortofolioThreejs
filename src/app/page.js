'use client'
import { useState, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import anime from 'animejs/lib/anime.es.js'

export default function ThreeComponent() {
  const [webLoading, setWebLoading] = useState(true)
  const [loadingAppear, setLoadingAppear] = useState(true)

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      80,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )

    const geometry = new THREE.SphereGeometry(14, 64, 64)
    const sphereTexture = new THREE.TextureLoader().load(
      'images/sphere1.jpg',
      () => {
        setWebLoading(false)
      },
    )
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(14, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: sphereTexture,
      }),
    )

    scene.add(sphere)

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      opacity: 0.075,
      transparent: true,
    })

    const wireframeSphere = new THREE.Mesh(geometry, wireframeMaterial)

    scene.add(wireframeSphere)

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg'),
      antialias: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor('#222222')

    camera.position.z = 20

    const pointLight = new THREE.PointLight(0xffffff, 40)
    pointLight.position.set(4, 7, 21)
    scene.add(pointLight)

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

      sphere.rotation.x += 0.0015
      sphere.rotation.y += 0.0015
      wireframeSphere.rotation.x += 0.0015
      wireframeSphere.rotation.y += 0.0015

      orbitControl.update()

      renderer.render(scene, camera)
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
          <div className="font-aqua text-lg gap-5 flex flex-row justify-end m-2.5 text-white">
            <div>
              <a href="#">Profile</a>
            </div>
            <div>
              <a href="#">Work</a>
            </div>
          </div>
          <div className="font-aqua flex justify-center -mt-10 items-center h-full name text-white text-3xl tracking-wider">
            ANDREW SEBASTIAN HARDIANTA
          </div>
        </div>
      )}
    </>
  )
}
