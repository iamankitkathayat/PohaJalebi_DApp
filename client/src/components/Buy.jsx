import {ethers} from "ethers"
import "./Buy.css";
const Buy=({state})=>{

    const buyPohaJalebi = async(event)=>{
      event.preventDefault();
      const {contract}=state;
      const name = document.querySelector("#name").value;
      const message = document.querySelector("#message").value;
      //const amount = document.querySelector("#amount").value;
      const amount = {value:ethers.utils.parseEther("0.0013")}
      const transaction = await contract.buyPohaJalebi(name,message,amount)
      await transaction.wait();
      alert("Your order for One plate Poha Jalebi is successful!");
      window.location.reload();
    }
    return  (
      <div className="center">
       <h1>One plate @ 0.0013 MATIC. Enjoyyy! </h1>
        <form onSubmit={buyPohaJalebi}>
          <div className="inputbox">
            <input type="text" required="required" id="name"/>
            <span>Name</span>
          </div>
          <div className="inputbox">
            <input type="text" required="required" id="message" />
            <span>Message</span>
          </div>
          <div className="inputbox">
            <input type="submit" value="Pay"  disabled={!state.contract}/>
          </div>
        </form>
          
        </div>
      );
}
export default Buy;