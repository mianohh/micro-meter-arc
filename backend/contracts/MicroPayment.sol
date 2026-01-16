// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MicroPayment {
    uint256 public nextRequestId;

    struct Request {
        address payer;
        address provider;
        string inputData;
        string outputData;
        bool isFulfilled;
    }

    mapping(uint256 => Request) public requests;

    event ServicePurchased(
        uint256 indexed requestId,
        address indexed payer,
        address indexed provider,
        uint256 amount,
        string inputData
    );

    event RequestFulfilled(
        uint256 indexed requestId,
        string outputData
    );

    function payForService(address _provider, string memory _serviceId, string memory _inputData) public payable {
        require(msg.value > 0, "Payment must be > 0");
        uint256 requestId = nextRequestId++;
        requests[requestId] = Request(msg.sender, _provider, _inputData, "", false);

        (bool sent, ) = _provider.call{value: msg.value}("");
        require(sent, "Failed to send USDC");

        emit ServicePurchased(requestId, msg.sender, _provider, msg.value, _inputData);
    }

    function fulfillRequest(uint256 _requestId, string memory _outputData) public {
        Request storage req = requests[_requestId];
        require(msg.sender == req.provider, "Only the provider can fulfill this request");

        req.outputData = _outputData;
        req.isFulfilled = true;
        emit RequestFulfilled(_requestId, _outputData);
    }
}
