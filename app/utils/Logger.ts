const logger = {
    info :(message : string , data?:any)=>{
        console.log(`${['INFO']} ${message}`, data || '')
    },
    error :(message : string , data?:any)=>{
        console.log(`${['Error']} ${message}`, data || '') 
    }
}

export default logger