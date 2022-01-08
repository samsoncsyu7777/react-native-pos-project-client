class TokenRequestVO {
    constructor() {
      this.action = "authenticate",
      this.client = "ka59t7",
      this.key = process.env.CLIENT_KEY;
    }    
  }
  
export default TokenRequestVO;