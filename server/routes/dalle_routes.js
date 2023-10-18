import express from "express";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";

dotenv.config();

// Initialize OpenAI API with your API key
const config=new Configuration({
    // apiKey:process.env.OPEN_API_KEY,
    //place the api key here
    apiKey:'',
});

const openai=new OpenAIApi(config);


const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from Dall E" });
});

router.route("/").post(async(req,res)=>{
    try {
        const {prompt}= req.body;
        console.log(`prompt form POST is : ${prompt}`);
        const response= await openai.createImage(
            {
                prompt,n:1,size:'1024x1024',response_format:'b64_json'
            }
        
        )
        const imag=response.data.data[0].b64_json;
        console.log(imag);
        res.status(200).json({photo:imag});
    } catch (error) {
        console.log(error.response.data);
        res.status(500).json({message:"something went wrong"});
    }
    
})

export default router;
