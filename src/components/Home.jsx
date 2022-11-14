import React from 'react'
import {Box ,Image, Text} from "@chakra-ui/react"
import btnsrc from "../assets/homebg.jpeg"

function Home() {
  console.log("hello");
  return (
    
    <Box bgColor={"blackAlpha.900"} w={"full"}  h={"full"}>
      <Image w={"full"} h={"full"} objectFit={"contain"} src={btnsrc} />

        <Text fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"thin"}
        color="whiteAlpha.700">

        </Text>

    

    </Box>
  )
}

export default Home