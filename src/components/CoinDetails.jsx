import { Container ,Box, HStack, RadioGroup, Radio, VStack, Text, Image, StatLabel,StatNumber,Stat, StatHelpText, StatArrow, Badge, Progress, Button } from '@chakra-ui/react'
import axios from 'axios'
import React , {useState ,useEffect} from 'react'
import "../styles/CoinDetails.css"
import {useParams} from "react-router-dom"
import { server } from '..'
import ErrorComponent from './ErrorComponent'
import Loader from './Loader'
import Chart from '../components/Chart'

const CoinDetails = () => {


  const [coin, setCoin] = useState({})
  const [loading, setloading] = useState(true)
  const [Error ,setError] =useState(false) 
  const [currency ,setCurrency] = useState("inr")
  const [days ,setDays] =useState("24h")
  const [chartArray , setChartArray] =useState([]);

  const params = useParams();
  const currencySymbol =currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h" ,"7d" , "14d" , "30" , "60d" ,"200d", "1y" , "max"]

  const switchChartsStats =(key)=> {
    switch (key) {
      case "24h":
        setDays("24h")
        setloading(true);
        break;
        case "7d":
        setDays("7d")
        setloading(true);
        break;
        
        case "14d":
          setDays("14h");
          setloading(true);
          break;

          
        case "30d":
          setDays("30d")
          setloading(true);
          break;

        case "60d":
          setDays("60d")
          setloading(true);
              break;

        case "200d":
          setDays("200d")
          setloading(true);
          break;

          case "1y":
            setDays("1y")
            setloading(true);
            break;  

        case "max":
          setDays("max")
          setloading(true);
          break;
    
      default:
        setDays("24h")
        setloading(true);
        break;
    }
  }


  useEffect(() => {
    const fetchCoin = async () => {
     try{
      const { data } = await axios.get(`${server}/coins/${params.id }`);
      const {data :chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
      console.log(chartData);
      console.log(data);
      setCoin(data)
      setChartArray(chartData.prices)
      setloading(false);   
    
     }
     catch(error){
      setloading(false)
      setError(true)
     }
    } 
    fetchCoin();
  }, [params.id , currency,days])
  if(Error) return <ErrorComponent message={"Error while fetching coin"}/> 

  return <Container maxW={"container.xl"}>
    {
      loading ? (<Loader/>):(
        <>
        <Box width={"full"} borderWidth={1}>
          <Chart arr={chartArray} currency={currencySymbol}/>
        </Box>


        <HStack padding={"4"} wrap={"wrap"}>
          {
            btns.map((i) => (
              <Button key={i} onClick={() => switchChartsStats(i)}>{i}</Button>
            ))
          }

        </HStack>

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
        <Item title={"Max Supply"} value ={coin.market_data.max_supply} />
        <Item title={"Circulating Supply"} value ={coin.market_data.circulating_supply} />
        <Item title={"Market Cap"} value ={`${currencySymbol} ${coin.market_data.market_cap[currency]}`} />
        <Item title={"All Time Low"} value ={`${currencySymbol} ${coin.market_data.atl[currency]}`} />
        <Item title={"All Time High"} value ={`${currencySymbol} ${coin.market_data.ath[currency]}`} />
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
//     address : "",
//     gender : "",
//     country :"",
//     upload  : "",

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
//       <input id='input1' name='name' type="text"  onChange={handleInput}/>
//       </div>

//       <div>
//       <label htmlFor="">surname</label>
//       <input id='input1' name="surname" type="text"  onChange={handleInput}/>
//       </div>

//       <div>
//       <label htmlFor="">age</label>
//       <input id='input1' name="age" type="text"  onChange={handleInput}/>
//       </div>
      
//       <div>
//         select Gender
//         <input id='input1' type="radio" name ="gender" onChange={handleInput} />
//         <label htmlFor="" name ="gender">  Male</label>
//         <input id='input1' type="radio" name='gender' onChange={handleInput}/>
//         <label htmlFor="" name ="gender"> Female</label>
//       </div>

//       <div>
//         <label htmlFor="">upload</label>
//         <input id='input1' type="file" name="upload"  onChange={handleInput} />
//       </div>
//       <div>
//         <label htmlFor="">Address</label>
//         <textarea id='input1' name="address"  cols="15" rows="4"  onChange={handleInput}></textarea>
//       </div>
//       <div>
//       <select name='country' id="country" onChange={handleInput}>
//             <option  id='input1' name="country"    >India</option>
//             <option  id='input1' name="country"  >Sri Lanka</option>
//             <option  id='input1'name="country"  >Australia</option>
//         </select>
//       </div>


//       <button id='btn-1'>submit</button>
//       </div>
//     </form>
//   )
// }

// export default CoinDetails