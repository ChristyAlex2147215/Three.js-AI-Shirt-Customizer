import React from 'react'
import {motion, AnimatePresence, animations} from "framer-motion";
import {useSnapshot} from "valtio";
import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation
} from "../config/motion"
import state from '../store';
import { CustomButton } from '../components';

const Home = () => {
    const snap=useSnapshot(state); // fetching the context staate form the store
  return (
    // Enable animations
    <AnimatePresence> 
        
        {snap.intro && (
        // check if we are in the home page
        <motion.section className='home' {...slideAnimation('left')}>
            <motion.header {...slideAnimation('down')}>
                <img src="./threejs.png" alt='logo' className='w-8 h-8 object-contain'/>
            </motion.header>
            <motion.div className='home-content' {...headContainerAnimation}>
                <motion.div {...headTextAnimation}>
                    <h1 className='head-text'>
                        LET'S <br className='xl:block hidden'/> DO IT.
                    </h1>

                </motion.div>
                <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
                    <p className='max-w-md font-normal text-grey-600 text-base'>
                        Create your unique and exclusive shirt with our brand-new 3D customerizatoin tool.<strong>Unleash your imagination</strong>{"  "} and define your own style.
                    </p>
                    <CustomButton 
                    type="filled"
                    title="Customerize it"
                    handleClick={()=>state.intro=false}
                    customStyle="w-fit px-4 py-2.5 font-bold text-sm"/>
                     
                </motion.div>
            </motion.div>
        </motion.section>
        )}
        </AnimatePresence>
  )
}

export default Home