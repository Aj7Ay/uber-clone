import React, { useEffect, useState } from 'react';
import tw from "tailwind-styled-components";
import Map from "../components/Map";
import { useRouter } from "next/router";
import Link from 'next/link'
import RideSelector from '../components/RideSelector'

export default function Confirm() {
    const router = useRouter();
    const { pickup, dropoff } = router.query;
  
    const [pickupCoordinates, setPickupCoordinates] = useState([0,0]);
    const [dropoffCoordinates, setDropoffCoordinates] = useState([0,0]);

    const getPickupCoordinates = pickup => {
        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
            new URLSearchParams({
              access_token: 'pk.eyJ1IjoiaWFuMDM4IiwiYSI6ImNrejRkdWVscDBmZzgyb28yOGVjazFkaWMifQ.rpr-o9cBKiJ2PGh8K8VzXA',
              limit: 1
            })
        ).then(response => response.json()).then(data => {
            setPickupCoordinates(data.features[0].center);
        });
      };
    
    const getDropoffCoordinates = dropoff => {
        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
            new URLSearchParams({
              access_token: 'pk.eyJ1IjoiaWFuMDM4IiwiYSI6ImNrejRkdWVscDBmZzgyb28yOGVjazFkaWMifQ.rpr-o9cBKiJ2PGh8K8VzXA',
              limit: 1
            })
        ).then(response => response.json()).then(data => {
            setDropoffCoordinates(data.features[0].center);
        });
    };
    
    useEffect(() => {
        getPickupCoordinates(pickup);
        getDropoffCoordinates(dropoff);
    }, []);

    return (
        <Wrapper>
            <ButtonContainer>
                <Link href="/search">
                    <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
                </Link>
            </ButtonContainer>
            <Map
            pickup={pickupCoordinates}
            dropoff={dropoffCoordinates}
            />
            <RideContainer>
                <RideSelector
                pickup={pickupCoordinates}
                dropoff={dropoffCoordinates}
                />
                <ConfirmButtonContainer>
                    <ConfirmButton>Confirm Uber</ConfirmButton>
                </ConfirmButtonContainer>
            </RideContainer>
        </Wrapper>
    )
}

const ButtonContainer =tw.div`
rounded-full absolute top-4 left-4 z-10 bg-white shadow-md cursor-pointer
`

const BackButton = tw.img`
`

const ConfirmButton = tw.div`
bg-black text-white m-4 text-center py-4
`

const ConfirmButtonContainer = tw.div`
border-t-2
`

const RideContainer = tw.div`
flex-1 flex flex-col h-1/2
`;
const Wrapper = tw.div`
flex h-screen flex-col 
`;