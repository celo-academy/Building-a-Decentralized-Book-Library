import React from "react";

const Welcome = ({ connectToWallet, currentAccount }) => {
  return (
    <div>
      <div>
        <h1 className="text-gradient">
          Borrow all the Books <br />You Ever Wanted
        </h1>
        <p className="text-gradient ">
          Explore The World Of Peer2Peer Library Management
        </p>
        {!currentAccount && (
          <button type="button" onClick={connectToWallet} className="button">
            <p> Connect Wallet</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default Welcome;
