import React, { useState,useEffect } from 'react';
import {Box,Grid,Typography,ListItem} from '@mui/material';
import { NavLink,Link } from 'react-router-dom';
import DyTreeView from '../../components/GlobalComponents/TreeView/TreeView';
import DyDataGrid from '../../components/GlobalComponents/DyDataGrid/DyDataGrid';
import DyTabs from '../../components/GlobalComponents/DyTabs/DyTabs';
import Example from '../../components/GlobalComponents/Charts/Liner/LinerChart';
import { useSelector } from 'react-redux';
import { DataGrid, GridRowsProp, GridColDef,faIR } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import {resetRValuesR} from '../Meeting/MeetingsSlice/MeetingsSlice'

import ObjectiveKeyResults from './ObjectiveKeyResults/ObjectiveKeyResults';
// import DyTabs from '../../components/GlobalComponents/DyTabs/DyTabs';

const CompanyTeams = () => {
  const dispatch=useDispatch();
  


  const[tabIndex,setTabIndex]=useState(0);
  
 
  // console.log(tabIndex);
 
  // 


  const tabData = [
    {
      label: 'اهداف و نتایج کلیدی',
      content:<ObjectiveKeyResults/>
     
    },
    // {
    //   label: 'وضعیت تیم ها',
    //   content:<Box width={'100%'}  > 
    //   <DyDataGrid 
    //   data={[]} 
    //   columns={[]}/>
    //   </Box>,
    // },
    // Add more tabs as needed
  ];
  const rows: GridRowsProp = [
    { id: 1, 
      teamName:'تیم برتر',
      managerName:'میلاد عبدی',
      targetCounts:3,
      weight:'45%',
      rate:'50',
      evaluationPercentage:50
    },
    { id: 2, 
      teamName:'تیم تدارکات',
      managerName:'جواد جوادی',
      targetCounts:6,
      weight:'65%',
      rate:'40',
      evaluationPercentage:60
    },
    { id: 3, 
      teamName:'تیم پزشکی',
      managerName:'دکتر قلب ',
      targetCounts:3,
      weight:'85%',
      rate:'10',
      evaluationPercentage:50
    },
  
  ];

  const clickInitial=()=>{
     dispatch(resetRValuesR())
    // console.log('exittttt')
  }
  
  return (
    <Grid container  >
        <Grid item xs={12}  >
        <Grid container sx={{bgcolor:'#F9F9F9'}} >
        <Grid item xs={12}  md={1}   >
               <Box py={2} >
       
    <ListItem onClick={clickInitial}  sx={{fontSize:'0.7 rem'}} component={Link} to={'/dashboard/meetings'}  >
           
              <Typography color={'GrayText'} variant='body2' sx={{fontWeight:600}} >خروج از جلسه</Typography>
              </ListItem>
        </Box>
         
        </Grid>
        </Grid>



        </Grid>


        <Grid container   >
          
        <Grid item xs={12} md={2}   >
        <Box boxShadow={2} borderRadius={2}   >
        <DyTreeView 
        setTabIndex={setTabIndex} 
        />
        </Box>
        </Grid>
        <Grid item xs={12} md={10}  >
       <Box    >
       {/* <DyDataGrid/> */}
       <DyTabs tabs={tabData} 
         tabIndex={tabIndex} />
       </Box>
        </Grid>
        </Grid>




        {/* <Grid container height={'100px'}  >
       <Grid item xs={12} md={7} mx={'auto'}  >
         <Box bgcolor={'red'} display={'flex'}  justifyContent={'center'} >
          <DyTabs tabs={tabData}   />
         </Box>
       </Grid>
        </Grid> */}

        {/* <Example/> */}
       
    </Grid>
  )
}

export default CompanyTeams