
const template = (date,time, name) =>{
    return `Appointment details Send to Entira Clinic.\nAppointment details:-\n
    Name:${name}\n
    Date:${date}\n
    Time:${time}\n
    `
}

const subject = `Entira clinic Appointment`;

module.exports.template = template;
module.exports.subject = subject;


/* 
authorization code:
4/0AX4XfWhF0m4X3Q7A5Cp0v-x1SdPBUZK2EkQGcE2BRZuNOgDcWX31QismPYVFBKw_pYyRug

tokens:
{
  "access_token": "ya29.A0ARrdaM9Ws__rvvKBTRjTFpo-tlyNsDDQJT1URqsxE87Y7CVefNEuEvDJpPpM6zH69_IXiapk6jUrXQf4DuO2m8Qo4Rb6DpelPf732K2KcfJDwo0Vl1O_p9CX2AfjBm_z1hm9LZWIMR_l_od9IZ-_C5pLL3pe", 
  "scope": "https://mail.google.com/ https://www.googleapis.com/auth/gmail.send", 
  "token_type": "Bearer", 
  "expires_in": 3599, 
  "refresh_token": "1//04dDxdbi9ER5QCgYIARAAGAQSNwF-L9IrfSxs04EHfvQk84atJLqneA0hwGe1eRP8OMCW9-TLfq_p84KL4g7AMr-uZkgpxzvotSg"
}

*/