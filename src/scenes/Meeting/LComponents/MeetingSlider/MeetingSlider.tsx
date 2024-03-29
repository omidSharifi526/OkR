import React, { useState,useEffect, useLayoutEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {setLoadingR} from '../../MeetingsSlice/MeetingsSlice'
import 'swiper/swiper-bundle.css';
// import 'swiper/components/navigation/navigation.min.css';
import { Box,Typography } from '@mui/material';
import{useGetPriodById} from '../../../../components/Login/Hooks/Index';
import { useSelector } from 'react-redux';
import { useGetAllMeetings } from '../../Hooks';
import {useDispatch} from 'react-redux';
import {setPriodIdR} from '../../MeetingsSlice/MeetingsSlice';
import CircularProgress from '@mui/material/CircularProgress';

import SwiperCore, { Navigation } from 'swiper';
SwiperCore.use([Navigation]);


const MeetingSlider = () => {
  // const dispatch=useDispatch();
  const dispatch=useDispatch();

  // const priods=useSelector((state:any)=>state.meetings.periodList);
 
  
  


  const profileTenantId=useSelector((state:any)=>state.meetings.profileTenantId);
  // console.log(profileTenantId)
  









  const{data:perData,isLoading:perLoading}=useGetPriodById(profileTenantId);
  // console.log(perData);
  const[currentPriod,setCurrentPriod]=useState<any>(perData?.map((e:any) => e.isCurrent).indexOf(true));
  const currentPriodId=perData?.find((priod:any)=>priod.isCurrent).id;
  const[ids,setIds]=useState<any>(null)
  const{isFetched,isLoading}=useGetAllMeetings(ids);

  useEffect(() => {
  //  console.log(profileTenantId)
    // setIds({tenantId:profileTenantId,priodId:currentPriodId})
    
   
  }, [profileTenantId]);


  useEffect(() => {
    
// console.log(perData)
  }, [perData])
  
  



  useEffect(() => {
   
  if (isLoading) {
    dispatch(setLoadingR(true))
  } else {
    dispatch(setLoadingR(false))
  } 
  }, [isLoading,isFetched]);


  
  


  // handleSlideChange
  const handleSlideChange = (swiper: any) => {
   
    const currentSlideIndex:any = swiper.activeIndex; // Get the active slide index
    const currentSlideData:any = perData?perData[currentSlideIndex]:null; // Get data from the periods array
    let{id,name}=currentSlideData;
    console.log(id,name)
    let priodDetail={
      id:id,
      name:name
    }
    dispatch(setPriodIdR(priodDetail))
    // setPriodIds((prev:any)=>({...prev,priodId:id}));
    setIds((prev:any)=>({tenantId:profileTenantId,priodId:id}));
    dispatch(setLoadingR(true))
    // console.log(ids)
  };
  if (perLoading) {
    return <Box width={'100%'} py={4} textAlign={'center'}  >
      <CircularProgress sx={{color:'blue'}}  />
    </Box>
  }



 
  return (
   <Box width={'700px'} py={1} mx={'auto'} display={'flex'} >
    <Box  width={'200px'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
   <Typography color={'blueviolet'} textAlign={'center'} fontSize={'0.7rem'}  >
   دوره قبل
    </Typography>
   </Box>
     <Swiper
     initialSlide={3}
     style={{textAlign:'center',fontSize:'2rem'}}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      onRealIndexChange={()=>{
        // console.log('hhhhi')
      }}
      // onSlideChange={(swiper) => {
      // console.log(swiper)
      // }}
      onSwiper={(swiper) => {
        // console.log(swiper.realIndex)
      }}
      onSlideChange={(swiper) => handleSlideChange(swiper)}
    >
    
      {
        perData && perData.map((prd:any,i:number)=>{
          return (
            <SwiperSlide key={i}  >
            <Typography fontWeight={700}  >
           {
            prd?.name
           }
           </Typography>
           </SwiperSlide>
          )
        })
      }



   
      {/* <div className="swiper-button-prev">
        <span>Previous</span>
      </div>
      <div className="swiper-button-next">
        <span>Next</span>
      </div> */}

    </Swiper>
    <Box  width={'200px'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
   <Typography color={'blueviolet'} textAlign={'center'} fontSize={'0.7rem'}  >
   دوره بعد
    </Typography>
   </Box>
   </Box>
  );
};

export default MeetingSlider;
