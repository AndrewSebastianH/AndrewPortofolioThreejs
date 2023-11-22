'use client'
import { useEffect } from 'react'
import * as THREE from 'three'

export default function Home() {
  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      80,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )

    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor('#393646')
    document.getElementById('bg').appendChild(renderer.domElement)

    camera.position.z = 2 // Adjust the camera position

    const animate = () => {
      requestAnimationFrame(animate)

      // Add your animation/rendering code here
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01

      renderer.render(scene, camera)
    }

    animate()

    // Clean up Three.js resources when the component unmounts
    return () => {
      // Dispose of geometries, materials, textures, etc.
      geometry.dispose()
      material.dispose()

      // Remove the canvas element
      renderer.domElement.remove()

      // Dispose of the renderer
      renderer.dispose()
    }
  }, [])

  return (
    <div className="w-full h-full justify-center items-center text-2xl">
      METROPOLIS
      <div id="bg" className="bg-teal-300"></div>
    </div>
  )
}
