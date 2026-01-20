import { ethers } from 'ethers'
import React, { useState } from 'react'

const Buy = ({state}) => {
    const [name,setName]=useState("")
    const [msg,setMsg]=useState("")
    const [amount,setAmount]=useState(0.001)
    const buyChai=async(e)=>{
        e.preventDefault()
        console.log(`${name} - ${msg}`)
        if (!name.trim() || !msg.trim()) {
            alert("Name and message required");
            return;
        }

        if (!amount || Number(amount) < 0.001) {
            alert("Minimum amount is 0.001 ETH");
            return;
        }

        try{
            const {contract}=state
            const tx2 = await contract.buyChai(name,msg, {
            value: ethers.parseEther(amount.toLocaleString()),
            });
            await tx2.wait();
            alert("Transaction Successfull!")
            setName("")
            setMsg("")
        }
        catch(err){
            alert("Transaction failed!")
        }
    }
  return (
    <>
    <div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-7">
        <div className="card shadow-sm">
            <div className="card-body px-4 py-4">
            <h4 className="card-title text-center mb-4">
                Buy Chai ☕
            </h4>
            <form onSubmit={buyChai}>
                <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Name</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Sourabh.."
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">Message</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Say something nice..."
                    id='msg'
                    value={msg}
                    onChange={(e)=>setMsg(e.target.value)}
                    />
                </div>
                </div>

                <div className="col-md-12 mb-3">
                    <label className="form-label">Amount (SepETH)</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="0.001"
                        step="any"
                        min="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>


                <div className="d-grid mt-3">
                <button type="submit" className="btn btn-primary btn-lg">
                    Pay
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    </div>
    </div>

    </>
  )
}

export default Buy