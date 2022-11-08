import { Container ,Box, HStack, RadioGroup, Radio, VStack, Text, Image, StatLabel,StatNumber,Stat, StatHelpText, StatArrow, Badge, Progress } from '@chakra-ui/react'
import axios from 'axios'
import React , {useState ,useEffect} from 'react'
// import "../styles/CoinDetails.css"
import {useParams} from "react-router-dom"
import { server } from '..'
import ErrorComponent from './ErrorComponent'
import Loader from './Loader'

const CoinDetails = () => {


  const [coin, setCoin] = useState({})
  const [loading, setloading] = useState(true)
  const [Error ,setError] =useState(false) 
  const [currency ,setCurrency] = useState("inr")

  const params = useParams();
  const currencySymbol =currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";


  useEffect(() => {
    const fetchCoin = async () => {
     try{
      const { data } = await axios.get(`${server}/coins/${params.id }`)
      console.log(data);
      setCoin(data)
      setloading(false);   
    
     }
     catch(error){
      setloading(false)
      setError(true)
     }
    } 
    fetchCoin();
  }, [params.id])
  if(Error) return <ErrorComponent message={"Error while fetching coin"}/> 

  return <Container maxW={"container.xl"}>
    {
      loading ? (<Loader/>):(
        <>
        <Box width={"full"} borderWidth={1}>
          aadadvd
        </Box>
{/* button */}
        <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
        <HStack  spacing={"4"}>
          <Radio value={"inr"}>INR</Radio>
          <Radio value={"usd"}>USD</Radio>
          <Radio value={"eur"}>EUR</Radio>
        </HStack>
      </RadioGroup>

      <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
        <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"}>          
        Last Updated  on {Date().split("G")['0']}
        </Text>
        <Image src={coin.image.large} 
        h={"16"}
         w={"16"} 
         objectFit={"contain"}/>

         <Stat>
          <StatLabel> {coin.name}</StatLabel>
          <StatNumber> {currencySymbol} {coin.market_data.current_price[currency]}</StatNumber>
          <StatHelpText>
            <StatArrow type={ coin.market_data.price_change_percentage_24h> 0 ? "increase" : "decrease"}/>
            {coin.market_data.price_change_percentage_24h}%

          </StatHelpText>
         </Stat>
<Badge fontSize={"2xl"} bgColor= {"blackAlpha.900"} color ={"white"}>
  {`#${coin.market_cap_rank}`} </Badge>       

      <CustomeBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} 
      low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}/>

      <Box w={"full"}  p="4">
        <Item title={"Max Supply"} value ={4324} />
      </Box>
      </VStack>

        </>
      )
    }
  </Container>
  
}

const Item = ({title ,value} )=>(
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>  {title}</Text>
    <Text> {value}</Text>
  </HStack>
)


const CustomeBar =({high ,low}) => (
  <VStack>

    <Progress value={50} colorScheme= {"teal"} w={"full"}/>
    <HStack justifyContent={"space-between"} w={"full"}> 
    <Badge children={low} colorScheme={"red"}/>
    <Text fontStyle={"sm"}> 24H range</Text>
    <Badge children={high} colorScheme={"green"}/>

     </HStack>
  </VStack>
)
export default CoinDetails


// const CoinDetails = () => {
//   const [user ,setUser] = useState({
//     name : "",
//     age : "",
//     surname : "",
//     // address : "",
//     // education : ""
//   })
//   const handleInput =(e) => {
  
//     setUser({...user ,[e.target.name]:e.target.value})
//   }

//   const handleSubmit =(e) =>{
//     e.preventDefault();
//     console.log(user);
//   }
//   return (
//     <form onSubmit={handleSubmit}>
//       <div id=''>
//       <div>
//       <label htmlFor="">Name</label>
//       <input name='name' type="text"  onChange={handleInput}/>
//       </div>

//       <div>
//       <label htmlFor="">surname</label>
//       <input name="surname" type="text"  onChange={handleInput}/>
//       </div>

//       <div>
//       <label htmlFor="">age</label>
//       <input name="age" type="text"  onChange={handleInput}/>
//       </div>


//       <button >submit</button>
//       </div>
//     </form>
//   )
// }

// export default CoinDetails