// https://api.myokr.ir/api/Meeting/GetKeyResultMeetingHistory?tenantId=6cfd9a87-e09b-4f0e-bbe1-c1b65c8f170d&periodId=bba7c504-8a8c-4b9e-b92c-6f7386a54c7a&keyResultId=990cec3a-77e5-4bc6-96dd-c5a4234d9762
import axiosInstance from "../../../Axios/Axios"

const GetKeyResultMeetingHistory=async({queryKey}:any)=>{
    let krId=queryKey[1];
    let prId=queryKey[2];
    // console.log(prId,"api")
return await axiosInstance.get(`Meeting/GetKeyResultMeetingHistory?tenantId=6cfd9a87-e09b-4f0e-bbe1-c1b65c8f170d&periodId=${prId}&keyResultId=${krId}`)
}
// https://api.myokr.ir/api/Meeting/GetAllTeamChildByParentId?teamId=2757391a-4029-4eaa-a36e-737e69a8e130&periodId=bba7c504-8a8c-4b9e-b92c-6f7386a54c7a&meetingId=34c56211-ec89-4b53-a10e-e6e7d1005ff2

const GetAllTeamChildByParentId=async({queryKey}:any)=>{
    // let krId=queryKey[1];
    // let 
    let ids=queryKey[1];
    console.log(ids)
    return await axiosInstance.get(`Meeting/GetAllTeamChildByParentId?teamId=${ids.teamId}&periodId=${ids.priodId}&meetingId=${ids.meetingId}`)

}


export{
    GetKeyResultMeetingHistory,
    GetAllTeamChildByParentId
}