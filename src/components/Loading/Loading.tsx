import React from 'react';
import{Grid,Box,Stack,} from '@mui/material';
import Progress from '../Progress/Progress';
import BackGround from '../Login/Statics/Imgs/bg3.png'

import {ReactComponent as Img1} from '../Loading/svg/Frame 20745955.svg';
import {ReactComponent as Img2} from '../Loading/svg/Frame 20745960.svg';
import {ReactComponent as Img3} from '../Loading/svg/Group 4242492.svg';




const Loading = ({setContentState,loading}:any) => {
  return (
    <Grid container sx={{
        width:'100%',
        height:'685px',
        overflowY:'auto',
        backgroundImage:`url(${BackGround})`,
        backgroundSize:'cover'
    }}   >
<Stack spacing={4} alignItems='center'  justifyContent='center'  sx={{width:'800px',height:'100%'}} mx="auto" >

<Box width='100%' >
<Box sx={{width:'100%',display:'flex',justifyContent:'center'}} mt={2}>
<Img2  />
</Box>
</Box>
<Box>
<Img1/>
</Box>

<Box sx={{width:'150px',textAlign:'center'}} mt={2} >
{
loading && <Progress setContentState={setContentState} />
}
</Box>



<Box width='100%'  >
   <Box width='100%' display='flex' flexDirection='row-reverse' >
   <Img3 style={{width:'150px',height:'150px'}}/>
   </Box>
</Box>
</Stack>
        

    </Grid>
  )
}

export default Loading