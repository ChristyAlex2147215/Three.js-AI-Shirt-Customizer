import { proxy } from "valtio";

// can be used as a context state and can be accessed anywhere in the app
const state=proxy(
    {
        intro:true, // if we are in the home page True
        color:'#EFBD48', // default color
        isLogoTexture:true, //currently showing logo in shirt
        isFullTexture:false, // 
        logoDecal:"./threejs.png", //path of the logo
        fullDecal:"./threejs.png"  
    }
)

export default state;