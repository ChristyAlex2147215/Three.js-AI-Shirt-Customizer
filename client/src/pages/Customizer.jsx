import React,{useState,useEffect} from 'react'
import {motion, AnimatePresence} from "framer-motion";
import { useSnapshot } from 'valtio';
import config from '../config/config';
import state from '../store';
import {download} from "../assets";
import {downloadCanvasToImage, reader} from "../config/helpers";
import {EditorTabs,FilterTabs,DecalTypes} from "../config/constants" 
import {fadeAnimation,slideAnimation} from "../config/motion"
import {ColorPicker,CustomButton,Tab,AIPicker,FilePicker} from "../components"
const Customizer = () => {
    const snap=useSnapshot(state);

    const [file,setFile]=useState('');
    const [prompt,setPrompt]=useState('')
    const [generatingImg,setGenerativeImage]=useState('');
    const [activeEditorTab,setActiveEditorTab]=useState('');
    const [activeFileterTab,setActiveFilterTab]=useState(({
        logoShirt:true,
        stylingShirt:false
    }));
    const handleSubmit=async(type)=>
    {
        if(!prompt) return alert("Please enter a prompt");
        try {
            // call backend to generate the ai image
            setGenerativeImage(true);
            const response = await fetch('http://localhost:8000/api/v1/dalle',
            {method:'POST',
            headers:{'Content-Type':"application/json"},
            body:JSON.stringify({prompt,})})

            const data=await response.json();
            handleDecals(type,`data:image/png;base64, ${data.photo}`)
        } catch (error) {
            alert(error);
            
        }
        finally
        {
            setGenerativeImage(false);
            setActiveEditorTab("");
        }
    }
    // show tab content depending on the activeTab
    const generateTabContent=()=>
    {
        switch(activeEditorTab)
        {
            case "colorpicker":
                return <ColorPicker/>
            case "filepicker":
                return <FilePicker file={file} setFile={setFile} readFile={readFile}/>
            case "aipicker":
                return <AIPicker 
                        prompt={prompt} 
                        setPrompt={setPrompt} 
                        generatingImg={generatingImg} 
                        handleSubmit={handleSubmit}/>
            default:
                return null;    
        }
    }

    const handleActiveFilterTab=(tabname)=>
    {
        switch(tabname)
        {
            case "logoShirt":
                state.isLogoTexture=!activeFileterTab[tabname];
                break;
            case "stylishShirt":
                state.isFullTexture=!activeFileterTab[tabname];
                break;

            default:
                state.isLogoTexture=true
                state.isFullTexture=false; 
                break;       
        }
        //update the state after the activeFileter is updated
        setActiveFilterTab((prevState)=>
        {
            return{
                ...prevState,
                [tabname]:!prevState[tabname]
            }
        })
    }
    const handleDecals=(type,result)=>
    {
        const decalType=DecalTypes[type];
        state [decalType.stateProperty] = result;

        if(!activeFileterTab[decalType.FilterTab])
        {
            handleActiveFilterTab(decalType.FilterTab)
        }
    }

    const readFile=(type)=>
    {
        reader(file).then((result)=>{handleDecals(type,result);setActiveEditorTab("");})

    }

  return (
    <AnimatePresence>
        {!snap.intro &&(
            <>
            {/* left menu */}
            <motion.div key="custom" className='absolute top-0 left-0 z-10' {...slideAnimation('left')}>
                <div className='flex items-center min-h-screen'>
                    <div className='editortabs-container tabs'>
                    {EditorTabs.map((tab)=><Tab key={tab.name} isFilterTab 
            isActiveTab={activeFileterTab[tab.name]}  tab={tab} handleClick={()=>{setActiveEditorTab(tab.name)}}/>)}
                    {generateTabContent()}
                    </div>
                </div>
            </motion.div>
            {/* top right button */}
            <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
                <CustomButton 
                type={"filled"} 
                title="Go Back" 
                handleClick={()=>state.intro=true}
                customStyles={"w-fit px-4 py-2.5 font-bold text-sm"}
                />

            </motion.div>
            {/* down buttons */}
            <motion.div className='filtertabs-container' {...slideAnimation("up")}>
            {FilterTabs.map((tab)=>
            (<Tab 
            isFilterTab 
            isActiveTab={activeFileterTab[tab.name]} 
            key={tab.name} 
            tab={tab} 
            handleClick={()=>{handleActiveFilterTab(tab.name)}}
            />
            ))}
            </motion.div>
            </>
        )}
    </AnimatePresence>
  )
}

export default Customizer