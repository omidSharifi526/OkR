import React, { useState,useEffect } from 'react';
// import {} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useGetAllObjectiveByPeriodId } from '../../Hooks';
import { Grid, Box, Typography, Button } from '@mui/material';
import { AllOKRComponentFace } from '../../Interfaces/Interfaces';
import { ReactComponent as ObjectiveVector } from '../../StaticData/Svgs/ObjectiveVector.svg';
import ModalLyt from '../../../../components/Layouts/ModalLyt/ModalLyt';
import DyButton from '../../../../components/GlobalComponents/DyButton/DyButton';
import CreateObjective from '../../Forms/CreateObjective/CreateObjective';
import {CircularProgress} from '@mui/material';
import { useNavigate,useParams } from 'react-router-dom';
import OCart from '../OCart/OCart';
import DYToastMessage from '../../../../components/GlobalComponents/DyToastMessage/DYToastMessage';




const AllOkRs = ({periodId,periodsData}:AllOKRComponentFace) => {
  const navigate=useNavigate();
  const[allObjective,setAllObjective]=useState<any[]>()
  const profileTenantId=useSelector((state:any)=>state.meetings.profileTenantId);
  const{data:objetcideData,isLoading:getObjectiveLoading,isError,isFetched,refetch:getObjectivesAgain}=useGetAllObjectiveByPeriodId(periodId,profileTenantId)
  const [showAddObjective, setShowAddObjective] = useState<boolean>(false);
  const[showToastMessage,setShowToastMessage]=useState<boolean>(false);
  const[addObjectiveStatus,setAddObjectiveStatus]=useState<any>(null)


  const initialAddObjective = (): void => {
    setShowAddObjective(prev => !prev)
  }

  useEffect(() => {

    setAllObjective(objetcideData)

  }, [objetcideData])


  if (getObjectiveLoading || !allObjective || isFetched!==true) {
    return <Box display={'flex'} 
    alignItems={'center'} 
    justifyContent={'center'} 
    width={'100%'} 
    height={'500px'} 
     >
      <CircularProgress  />
     </Box>
  }


  
  return (
    <>
      <Grid container  >
        {/* درحالت عدم وجود o */}
        <Grid item xs={12}>
        {
       allObjective?.length===0 && <Grid item xs={12}>
         <Box width={'100%'} textAlign={'center'} p={2}   >
           <Box>
             <ObjectiveVector />
           </Box>
           <Box>
             <Typography textAlign={'center'} variant='body2'   >
               هنوز هدفی در این دوره‌‌زمانی تعریف نشده است.
             </Typography>
           </Box>
           <Box mt={2} p={1} width={'15%'} mx={'auto'} textAlign={'center'}  >
             <DyButton
               caption={'هدف جدید'}
               onClick={initialAddObjective}
               color={'red'}
               disabled={false}
               variant={'contained'}
               bgColor={'#00387C'}
             />
             {/* caption,onClick,color,disbled,variant,type,bgColor */}
           </Box>
         </Box>
       </Grid>
       }

        </Grid>



        <Grid item xs={12}  >
         {
          allObjective.length>0 &&  <Grid container  >
          <Grid item xs={12} >
     <Box py={2} px={1} width={'100%'} display={'flex'} flexDirection={'row-reverse'}   >
     <Box>
     <DyButton
                caption={'هدف جدید'}
                onClick={initialAddObjective}
                color={'red'}
                disabled={false}
                variant={'contained'}
                bgColor={'#00387C'}
              />
     </Box>
     </Box>
          </Grid>
          <Grid item xs={12}  >
          
            <Grid container spacing={2} px={1}  >
 
           {
            allObjective && allObjective.map((o:any,i:number)=>{
              return <Grid  item xs={12} sm={3} key={i} >
                <Box width={'100%'} key={i}   >
                <OCart obj={o}   />
              </Box>
              </Grid>
            })
          }
           </Grid> 
    
    
           




          </Grid>
         </Grid>
         }


         
        </Grid>

       





         {
          <ModalLyt
            showModal={showAddObjective}
            setShowModal={setShowAddObjective}
            title={'هدف جدید'}
          >
            <CreateObjective  
             periodsData={periodsData}
             onSuccess={setShowAddObjective}
             setShowToastMessage={setShowToastMessage}
             setAddObjectiveStatus={setAddObjectiveStatus}
             afterSuccess={getObjectivesAgain}
            />

          </ModalLyt>

        }

        {
            showToastMessage && <DYToastMessage
            isSuccess={addObjectiveStatus?.isSuccess}
            message={addObjectiveStatus?.metaData.message}
            setShow={setShowToastMessage}
            show={showToastMessage}
            
              />
      
          }
        
      </Grid>
      

    </>
  )
}

export default AllOkRs