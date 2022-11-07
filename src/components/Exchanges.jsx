import { Container ,HStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../index'
import Loader from './Loader'
import ExchangeCard from './ExchangeCard'
import ErrorComponent from '../components/ErrorComponent'

const Exchanges = () => {

  const [exchanges, setExchanges] = useState([])
  const [loading, setloading] = useState(true)
  const [Error ,setError] =useState(false)

  useEffect(() => {
    const Fetchexchanges = async () => {
     try{
      const { data } = await axios.get(`${server}/exchanges`)
      setExchanges(data)
      setloading(false);   
      console.log(data);
     }
     catch(error){
      setloading(false)
      setError(true)
     }
    }
    Fetchexchanges();
  }, [])

  if(Error) return <ErrorComponent message={"Error while fetching exchanges"}/> 
  return (
  <Container maxW={"container.xl"}>
    {
      loading ? (
        <Loader />
      ) : (<>
        <HStack wrap={"wrap"}>
          {
            exchanges.map((i) => (
              <ExchangeCard 
              key={i.id} 
              name={i.name}
               img={i.image}
                rank={i.trust_score_rank}
                 url={i.url} />
            ))
          }
        </HStack>
      </>

    )}
  </Container>
  )
}

export default Exchanges