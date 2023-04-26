export const contractAddress="0x469a3b7e650da550cef2D7ea58b55D3AAF272E74"


export const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bookId",
				"type": "uint256"
			}
		],
		"name": "BookAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "borrower",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bookId",
				"type": "uint256"
			}
		],
		"name": "BookBorrowed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "borrower",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bookId",
				"type": "uint256"
			}
		],
		"name": "BookReturned",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "author",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "pinataCid",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "availableCopies",
				"type": "uint256"
			}
		],
		"name": "addBook",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "bookId",
				"type": "uint256"
			}
		],
		"name": "borrowBook",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "bookId",
				"type": "uint256"
			}
		],
		"name": "returnBook",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllBooks",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "author",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "pinataCid",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "availableCopies",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "borrower",
						"type": "address"
					}
				],
				"internalType": "struct Library.Book[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "bookId",
				"type": "uint256"
			}
		],
		"name": "getBookCID",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBookCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "readingList",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]