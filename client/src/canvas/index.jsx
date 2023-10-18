import React from 'react'
import {Canvas} from "@react-three/fiber";
import BackDrop from "./BackDrop"
import {Center,Environment} from "@react-three/drei"
import CameraRig from "./CameraRig"
import Shirt from "./Shirt"

const CanvasModel = () => {
  return (
    //fov to make the shirt size
    <Canvas shadows camera={{position:[0,0,0],fov:25}} 
    gl={{preserveDrawingBuffer:true}} 
    className='w-full max-w-full h-full transition-all ease-in'>
     <ambientLight intensity={0.5} />
        <Environment preset="city"/>

        <CameraRig>
          <BackDrop/>
          <Center>
            <Shirt/>
          </Center>
        </CameraRig>

      
    </Canvas>
  )
}

export default CanvasModel