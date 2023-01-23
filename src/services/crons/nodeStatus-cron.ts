
import { CronJob } from 'cron';
import axiosInstance from '../../config/cron-axios.config'
import sendMail from '../mail/mail-service'

 export const task = new CronJob(' 30 * * * *' , ()=>{

  axiosInstance({
    url : '/swarm/nodes'
  }).then(res=>{
      const data = res.data ;
      //@ts-ignore
      const unavailableNodes = data.filter((element)=> element.ManagerStatus && element.ManagerStatus.Reachability  ==='unavailable' )
      //@ts-ignore
      const notReadyNodes = data.filter((element)=>element.Status.State !=='ready')

      if (unavailableNodes.length>0) {
          //@ts-ignore
          const unavailableNodesEmail = unavailableNodes.reduce((prev,current)=> {

              return  prev +`\n node with id: ${current.ID} and hostname: ${current.Description.Hostname} has an unavailable manager with ip: ${current.ManagerStatus.Addr}`
          },"")
          console.log(unavailableNodesEmail)
           sendMail(unavailableNodesEmail,"ALERT: PROBLEM MANAGER").catch(console.error)
      }
      if (notReadyNodes.length>0) {
          //@ts-ignore
          const notReadyNodesEmail = notReadyNodes.reduce((prev,current)=> {

              return  prev +`\n node with id: ${current.ID} and hostname: ${current.Description.Hostname} has a status: ${current.Status.State}`
          },"")
          console.log(notReadyNodesEmail)
          sendMail(notReadyNodesEmail,"ALERT: PROBLEM NODE").catch(console.error)
      }

  })
      .catch(err=>console.log(err))
})

