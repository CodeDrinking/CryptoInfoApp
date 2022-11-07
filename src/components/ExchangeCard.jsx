 import React from "react"
 import Exchanges  from "./Exchanges"
 import { VStack ,Heading ,Text} from '@chakra-ui/react'
import { Scale } from "chart.js";

 
 
 const ExchangeCard =({name,img ,rank , url}) =>(
    <a href={url} target={"blank"}> 

    <VStack w= {"52"} shadow={"lg"} p={"8"} borderRadius={"18"} transition={"all 0.3s"}
        m={"4"} 
        css={{
            "&:hover" :{
                transform :"Scale(1.1)"
            }
        }} > 
        <img src={img} w={"10"} h={"10"} objectFit={"contain"} alt="Exchanges"/>

        <Heading size ={"md"}  noOfLines={1}>
            {rank}
        </Heading>
        <Text noOfLines={1}>
            {name}
        </Text>s
    </VStack>
    </a>


 )

 export default ExchangeCard;