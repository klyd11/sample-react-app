import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import abi from './abis.json';
class App extends Component{

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      date: "",
      unixtime : ""
    }
  }

  async componentWillMount() {
    await this.loadWeb3()
    
  }
  async loadWeb3() {
    window.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/e09f026aba194cc6a871f9f5e1236def"));
  }

  checkdate = async (userAddress) =>{
    console.log("ENTER ETH ADDRESS : ", userAddress)
    const web3 = window.web3
    const contract = new web3.eth.Contract(abi, "0xfdAA319A95bA06150Cac68794738130dF077a396")
    const userValue = await contract.methods.lockTime(userAddress).call();
    this.setState({"unixtime": userValue})
    var date = new Date(userValue * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    const months = ["JAN","FEB","MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
    var formattedTime = months[date.getMonth()] + " " + (date.getDate()) + ", " + (date.getFullYear()) +" " +  hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    this.setState({"date": formattedTime})
  }



  render(){
    return (
      <div>
        <nav className="navbar navbar-light bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand text-white" >WALLET INFO</span>
        </div>
      </nav> 
     


      <div className="container">
        <div className="row mt-4">
         <div  className="col-lg-4"></div>
          <div  className="col-lg-4 col-md-12 col-sm-12 text-center">
            <div className="content mx-auto my-auto">
              <h3>CHECK WITHDRAW DATE</h3>
              <form onSubmit={(event) => {
                event.preventDefault()
                const userAddress = this.userAddress.value
                this.checkdate(userAddress)
              }}>
                <input
                  type='text'
                  className='form-control mb-1'
                  placeholder='EX: 0x012312312312312231231223123'
                  ref={(input) => { this.userAddress = input }}
                />
                <input
                  type='submit'
                  className='btn btn-block btn-primary mt-4'
                  value='CHECK DATE'
                 
                />
              </form>
            </div>
            
          </div>
          <div  className="col-lg-4"></div>
        </div>
        <div className="row mt-5">
          <div  className="col-lg-4"></div>
          <div className='col-lg-4 col-md-12 col-sm-12 mx-auto text-center'>
            <div>UNIX TIME : <strong>{this.state.unixtime}</strong></div>
            <div>WITHDRAW DATE : <strong>{this.state.date}</strong></div>

            <div className="mt-2">Note: This is value return from the Smart Contract <br/>
            <a target="_blank" href="https://etherscan.io/address/0xfdAA319A95bA06150Cac68794738130dF077a396">0xfdAA319A95bA06150Cac68794738130dF077a396</a><br/>

              and you can also verify the date/time from this website <a target="_blank" href="https://www.epochconverter.com/">epochconverter</a>
              

            </div>
          </div>
          <div  className="col-lg-4">
            
          </div>
        </div>

        <div className="row mt-5">
 
        <div  className="col-lg-12 col-md-12 col-sm-12 mx-auto text-center">
              <div>EXCHANGE BTP TOKEN TO WPE TOKEN <br/><a target="_blank" href="https://pools.balancer.exchange/#/pool/0x5B2dC8c02728e8FB6aeA03a622c3849875A48801">https://pools.balancer.exchange/#/pool/0x5B2dC8c02728e8FB6aeA03a622c3849875A48801</a></div>
              <div>EXCHANGE WPE TOKEN TO ETH TOKEN <br/><a target="_blank" href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xd075e95423c5c4ba1e122cae0f4cdfa19b82881b">https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xd075e95423c5c4ba1e122cae0f4cdfa19b82881b</a>
                
              </div>
        </div>
        
        </div>

        <div className="row mt-5">
        <div  className="col-lg-4"></div>
        <div  className="col-lg-4 col-md-12 col-sm-12 mx-auto text-center text-muted">
              Disclaimer: this page was created just to help whom wanted to check their withdraw date, and limited on the programmer knowledged as of this writing where to get the withdraw date
        </div>
        <div  className="col-lg-4"></div>
        </div>


        </div>
      </div>
    );
  }
}

export default App;
