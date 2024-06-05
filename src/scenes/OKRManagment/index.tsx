import React, { useState,useEffect,lazy,Suspense } from 'react';
import PeriodSlider from '../../components/GlobalComponents/PeriodSlider/PeriodSlider';
import { useSelector } from 'react-redux';
import { useGetPriodById } from '../../components/Login/Hooks/Index';
import CircularProgress from '@mui/material/CircularProgress';
import {Grid,Box,Typography} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PersonalOkRs from './LComponents/PersonalOkRs/PersonalOkRs';
import AllOkRs from './LComponents/AllOkRs/AllOkRs';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}




const Index :React.FC=function(){
  const[priodId,setPriodId]=useState<string|null>(null)
  const [value, setValue] = React.useState(0);
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box >
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const onSuccesss=():void=>{

  }
  
  const onFailed=():void=>{
  
  }

  const tenantId:string=useSelector((state:any)=>state.meetings.profileTenantId);
  const{data:perData,isLoading:perLoading,isError:periodError,isFetched}:any=useGetPriodById(tenantId,onSuccesss,onFailed);
  // const[periodId,setPeriodId]=useState<string|null>(null);
  const[activeIndex,setActiveIndex]=useState<number>(0);
  const[periodId,setPeriodId]=useState<string|null>(null);

  useEffect(() => {
  const active:any=perData?perData[activeIndex]:{};
  setPeriodId(active.id);

  }, [activeIndex]);


  useEffect(() => {
    //  console.log(activeIndex)
    let length=perData?.map((e:any) => e.isCurrent).indexOf(true)
    // setActiveIndex(4)
    if(length!==4){
        setActiveIndex(4)
    
        }
    }, []);


  useEffect(() => {
  
    // console.log(getPeriodFetched)
    if (perData) {
        let length:number=perData.length
        if(length===4){
        setActiveIndex(0)
    
        }
    
    }
     
    }, [perData])


  


//   useEffect(() => {
// console.log(periodId)
//   }, [periodId]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  
  
  
  
  
  return (
    <>
    <PeriodSlider 
    setActiveIndex={setActiveIndex}

    setPriodId={setPeriodId}
    activeIndex={perData?.findIndex((item:any)=>item.isCurrent)}
    tenantId={tenantId } 

  
    
    slideData={perData}
    dataLoading={perLoading}
      />
{/* 
<PeriodSlider 
    setPriodId={setPriodId}
    activeIndex={perData?.findIndex(item=>item.isCurrent)}

    setActiveIndex={setActiveIndex}
    
     slideData={perData || []}
     dataLoading={false}
     

    
    /> */}




      <Grid container   >
      <Grid item xs={12} md={12}  >

<Box sx={{ width: '100%' }}>
  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
      <Tab label="همه OKR ها" {...a11yProps(0)} />
      <Tab label="OKR های من" {...a11yProps(1)} />
   
    </Tabs>
  </Box>

  
  <CustomTabPanel value={value} index={0}>
    <Suspense fallback={<Box width={'100%'} pt={5} textAlign={'center'} py={5}  ><CircularProgress/></Box>}  >
     <AllOkRs 
     periodId={periodId}  
     periodsData={perData}
     />
      

    </Suspense>
  </CustomTabPanel>


  <CustomTabPanel value={value} index={1}>
  <Suspense fallback={<Box width={'100%'} pt={5} textAlign={'center'} py={5}  ><CircularProgress/></Box>}  >
  <PersonalOkRs
   periodId={periodId}  
   periodsData={perData}
  />

    </Suspense>
  </CustomTabPanel>





</Box>





</Grid>
      </Grid>
    </>
  )
}

export default Index