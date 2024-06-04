import React,{useEffect} from 'react';
import { Grid,Box,Typography,IconButton,Button } from '@mui/material';
import { ReactComponent as Oflag } from '../../StaticData/Svgs/Oflag.svg';
import {ReactComponent as CompanyManagmentIcon} from '../../../../components/Dashboard/StaticsData/Icons/companyManagmentIcon1.svg';
import {ReactComponent as PersonIcon} from '../../../../components/Dashboard/StaticsData/Icons/Person1.svg';
import { ReactComponent as comp } from '../../StaticData/Svgs/Oflag.svg';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDeleteObject } from '../../Hooks';
import DyLinearProgress from '../../../../components/GlobalComponents/DyLinearProgress/DyLinearProgress';
import { useSelector } from 'react-redux';
const OCart = (props:any) => {
    const navigate=useNavigate()
    let{obj,setShowToastMessage,setObjectiveAsyncOpState}=props;
    let{name,responsibleName,definitionLevelName,setPersonId,setShowEditModal,id,weight,evaluationPercentage
        ,objectivesStateName,keyResultCount
    }=obj;
    const tenantId=useSelector((state:any)=>state.meetings.profileTenantId);
    const{mutate:deleteObjectve,isError,isSuccess,data:deleteData}=useDeleteObject()

  const goObjectiveDetails=()=>{

        navigate('/dashboard/okrManagment/objectiveDetails',{replace:true,state:{objectiveId:id}})
      
  }

  const initialDeleteObject=()=>{
    let deleteBody={
    deletedId:id,
    tenantId:tenantId
    }
    deleteObjectve(deleteBody)
    }

    useEffect(() => {
        if (deleteData) {
          setShowToastMessage(true);
          setObjectiveAsyncOpState(deleteData?.data)
        }
      }, [deleteData,isSuccess])
      
const initialEditPerson=(perId:string|null)=>{
  setShowEditModal(true)
  setPersonId(id)
  }
  
      


  return (  
    
    <Grid container boxShadow={4} borderRadius={4} p={1} >
        <Grid item xs={12}  >
        <Grid container >
        <Grid item xs={12}  >
        
        <Box 
        display={'flex'} 
        width={'100%'}
        alignItems={'start'}
        p={1}
        minHeight={'100px'} 
        justifyContent={'space-between'}  > 
        <Box display={'flex'}>
        <Oflag fontSize={'0.9rem'}  />
        <Typography px={2} variant='body1'  >
            {
                name
            }
        </Typography>
        </Box>
        <Box display={'flex'} justifyContent={'end'} >
        <Box >
        <IconButton onClick={()=>{
            initialEditPerson(id)
        }}   >
        <EditIcon color='primary'   />
       </IconButton>
        </Box>
        <Box >
        <IconButton onClick={()=>{
            initialDeleteObject()
        }}  >
            <DeleteIcon color='error'/>
        </IconButton>
        </Box>
        </Box>
        </Box>
        
        </Grid>
        {/* <Grid item xs={2}>
        <Box >
       
      </Box>
      </Grid> */}
      </Grid>




        {/* <Grid item xs={2}   >
        <Box width={'100%'} py={2} textAlign={'center'}>
            <IconButton>
            <MoreVertIcon/>
            </IconButton>
          </Box>
         </Grid> */}
        </Grid>
      
        <Grid xs={12}  >
        <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'start'}>
        <PersonIcon width={'15px'}  height={'15px'} />
        <Typography variant='button' color={'black'} >{
            responsibleName
            }</Typography>
        </Box>
        </Grid>
     
        <Grid xs={12}  >
        <Box width={'100%'}  display={'flex'} alignItems={'center'} justifyContent={'start'}>
        <CompanyManagmentIcon width={'20px'} height={'20px'} />
        <Typography variant='button' color={'black'} >
                {
                    definitionLevelName
                }
        </Typography>
        </Box>
        </Grid>
    
        <Grid item xs={12} >
             <Box width={'100%'}   >
                <DyLinearProgress value={evaluationPercentage}  />
             </Box>
             
        </Grid>

        <Grid xs={12}>
        <Box  display={'flex'} alignItems={'center'} justifyContent={'space-between'} textAlign={'center'}>
        <Box  bgcolor={ objectivesStateName === "فعال"?'#D5f7D4':'#bfd3f5'}   width={'100px'} height={'30px'} borderRadius={3} >
        <Button variant='text' > 
        <Typography  color={objectivesStateName === "فعال"? 'green':'#3a82fc'} fontSize={'0.8rem'}  >  {
                objectivesStateName === "فعال"?'فعال':'پیش نویس'
            }
        </Typography>
        </Button>
        </Box> 
    
        
        <Box display={'flex'} alignItems={'center'} textAlign={'center'}  justifyContent={'center'} bgcolor={'#fadbb9'}  width={'100px'} height={'30px'} borderRadius={3} >
        <Button variant='text'  > 
        <Typography color={'#f77f23'} fontSize={'0.8rem'}>
          {keyResultCount}  نتیجه کلیدی 
        </Typography>
        </Button>
        </Box> 
       
    
        <Box   display={'flex'} textAlign={'center'} alignItems={'center'} justifyContent={'end'}   marginLeft={1} width={'100px'} borderRadius={3}>
        <Button variant='text' onClick={goObjectiveDetails}  > 
        <Typography fontSize={'0.8rem'} color={'#0d0d0c'}>
         نمایش جزییات
         </Typography>
         </Button>
        




      
        {/* <IconButton onClick={()=>{
            //initialEditTeam()
        }}   >
        <EditIcon color='primary'   />
       </IconButton> */}
          </Box>
          
       {/* <Box marginTop={'0.5'}>
      
      </Box> */}

{/* 
<IconButton onClick={()=>{
            initialDeleteObject()
        }}  >
            <DeleteIcon color='error'/>
        </IconButton> */}
       
      </Box>
      </Grid>
        </Grid>

  )
}

export default OCart