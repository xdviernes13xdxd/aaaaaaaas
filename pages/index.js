import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Alchemy, Network } from "alchemy-sdk";




export default function Home() {
  const config = {
    apiKey: "<alchemy-api-key>",
    network: Network.ETH_MAINNET,
  };
  const alchemy = new Alchemy(config);
  const allTokenAddress = async () => {
    var x = document.getElementById("input").value; 
    document.getElementById("demo").innerHTML = x;
    console.log(x);
    // Wallet address
    const address = x;
    // Get token balances
    const balances = await alchemy.core.getTokenBalances(address, 'erc20');
    console.log(balances);
    document.getElementById("demoa").innerHTML = JSON.stringify(balances);;
  };
  const resolveEns = async () => {
    var x = document.getElementById("input").value; 
    document.getElementById("demo").innerHTML = x;
    const walletAddress = x; // replace with wallet address
    const ensContractAddress = "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85";
    const nfts = await alchemy.nft.getNftsForOwner(walletAddress, {
      contractAddresses: [ensContractAddress],
    });
    
    console.log(nfts);
    document.getElementById("demoa").innerHTML = JSON.stringify(nfts);;

  };
  const tokenBalanceAddress = async () => {
    var x = document.getElementById("input").value; 
    document.getElementById("demo").innerHTML = x;
//Feel free to switch this wallet address with another address
const ownerAddress = x;

//The below token contract address corresponds to USDT
const tokenContractAddresses = ["0xdAC17F958D2ee523a2206206994597C13D831ec7"];

const data = await alchemy.core.getTokenBalances(
  ownerAddress,
  tokenContractAddresses
);

console.log("Token balance for Address");
console.log(data);
document.getElementById("demoa").innerHTML = JSON.stringify(data);;

  };
  const tokenMetadata = async () => {
    var x = document.getElementById("input").value; 
    document.getElementById("demo").innerHTML = x;
// The token address we want to query for metadata
const metadata = await alchemy.core.getTokenMetadata(
  x
);

console.log("TOKEN METADATA");
console.log(metadata);
document.getElementById("demoa").innerHTML = JSON.stringify(metadata);;

      };
  
      const txHistory = async () => {
        var x = document.getElementById("input").value; 
        document.getElementById("demo").innerHTML = x;
        const data = await alchemy.core.getAssetTransfers({
          fromBlock: "0x0",
          fromAddress: x,
          category: ["external", "internal", "erc20", "erc721", "erc1155"],
        });
        
        console.log(data);
        document.getElementById("demoa").innerHTML = JSON.stringify(data);;

              };
          
  const getNftsCollection = async () => {
    var x = document.getElementById("input").value; 
    document.getElementById("demo").innerHTML = x;
    // Contract address
    const address = x;
  
    // Flag to omit metadata
    const omitMetadata = false;
  
    // Get all NFTs
    const { nfts } = await alchemy.nft.getNftsForContract(address, {
      omitMetadata: omitMetadata,
    });
  
    let i = 1;
  
    for (let nft of nfts) {
      console.log(`${i}. ${nft.rawMetadata.image}`);
      i++;
    }
    document.getElementById("demoa").innerHTML = JSON.stringify(nfts);;

  };
  const nftHistory = async () => {
    var x = document.getElementById("input").value; 
    document.getElementById("demo").innerHTML = x;
    // Contract address
    const address = [x];
    // Get all NFTs
    const response = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      contractAddresses: address,
      category: ["erc721"],
      excludeZeroValue: false,
    });
  
    // Set NFT ID
    const nftId = 3;
  
    // Get transactions for the NFT
    let txns = response.transfers.filter(
      (txn) => fromHex(txn.erc721TokenId) === nftId
    );
    console.log(txns);
    document.getElementById("demoa").innerHTML = JSON.stringify(txns);;

  };
  const nftsMinted = async () => {
    var x = document.getElementById("input").value; 
    document.getElementById("demo").innerHTML = x;
    const toAddress = x;

    const res = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      fromAddress: "0x0000000000000000000000000000000000000000",
      toAddress: toAddress,
      excludeZeroValue: true,
      category: ["erc721", "erc1155"],
    });
    
    // Print contract address and tokenId for each NFT (ERC721 or ERC1155):
    for (const events of res.transfers) {
      if (events.erc1155Metadata == null) {
        document.getElementById("demoa").innerHTML = JSON.stringify(
          "ERC-721 Token Minted: ID- ",
          events.tokenId,
          " Contract- ",
          events.rawContract.address
        );
      } else {
        for (const erc1155 of events.erc1155Metadata) {
          document.getElementById("demoa").innerHTML = JSON.stringify(
            "ERC-1155 Token Minted: ID- ",
            erc1155.tokenId,
            " Contract- ",
            events.rawContract.address
          );
        }
      }
    }
    document.getElementById("demoa").innerHTML = JSON.stringify(res);

  };

  const nftTxHistory = async () => {
    var x = document.getElementById("input").value; 
    document.getElementById("demo").innerHTML = x;
    const fromAddress = x;

const res = await alchemy.core.getAssetTransfers({
  fromBlock: "0x0",
  fromAddress: fromAddress,
  excludeZeroValue: true,
  category: ["erc721", "erc1155"],
});

// Print contract address and tokenId for each NFT (ERC721 or ERC1155):
for (const events of res.transfers) {
  if (events.erc1155Metadata == null) {
    document.getElementById("demoa").innerHTML = JSON.stringify(
      "ERC-721 Token Minted: ID- ",
      events.tokenId,
      " Contract- ",
      events.rawContract.address
    );
  } else {
    for (const erc1155 of events.erc1155Metadata) {
      document.getElementById("demoa").innerHTML = JSON.stringify(
        "ERC-1155 Token Minted: ID- ",
        erc1155.tokenId,
        " Contract- ",
        events.rawContract.address
      );
    }
  }
}
  };
  const getFirstTransfer = async () => {
    var x = document.getElementById("input").value; 
    document.getElementById("demo").innerHTML = x;
    // Calling the getAssetTransfers function and filters using the following parameters
    const allTransfers = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      contractAddresses: [x], // You can replace with contract of your choosing
      excludeZeroValue: true,
      category: ["erc721"],
    });
  
    // printing the first indexed transfer event to console
    console.log("First Transfer:", allTransfers.transfers[0]);
    document.getElementById("demoa").innerHTML = JSON.stringify(allTransfers.transfers[0]);

  };

  const getLastTransfer = async () => {
    var x = document.getElementById("input").value; 
    document.getElementById("demo").innerHTML = x;
    const getTransfers = alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      toBlock: "latest",
      contractAddresses: [x],
      excludeZeroValue: true,
      category: ["erc721"],
    });
  
    const firstPage = await getTransfers;
    let pageKey = firstPage.pageKey;
  
    try {
      if (pageKey) {
        let counter = 0;
        while (pageKey) {
          const nextKey = alchemy.core.getAssetTransfers({
            fromBlock: "0x0",
            toBlock: "latest",
            contractAddresses: [x],
            excludeZeroValue: true,
            category: ["erc721"],
            pageKey: pageKey.toString(),
          });
  
          const nextPage = await nextKey;
          pageKey = nextPage.pageKey;
          
          if (pageKey) {
            counter += 1;
            console.log("Request #" + counter + " made!");
            continue;
          } else {
            const nextPageLength = nextPage.transfers.length;
            const transferCount = counter * 1000 + nextPageLength;
            console.log("Last BAYC token transfer(#" + transferCount + "):");
            document.getElementById("demoa").innerHTML = JSON.stringify("Last BAYC token transfer(#" + transferCount + "): ");
            console.log(nextPage.transfers[nextPageLength - 1]);
            break;
          }
        }
      } else if (pageKey === undefined) {
        const firstPageLength = firstPage.transfers.length;
        console.log(firstPage.transfers[firstPageLength - 1]);
      }
    } catch (err) {
      console.log("Something went wrong with your request: " + err);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Eth Analyzer</title>
        <meta name="description" content="Eth analyzer built by Wild3 Labs" />
        <link rel="icon" href="/favi.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Eth Analyzer by <a href="https://twitter.com/wild3_eth" target="_blank" rel="noreferrer">Wild3 Labs!</a>
        </h1>
        <br></br>
        <br></br>
        
        <p className={styles.description}>With this app you can get information about different ethereum contracts or addresses. You must paste an address below and select an option. The result will appear below the entire website. Ej: 0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85</p>
  <input type="text" id="input" ></input>
  <br></br>
        <div className={styles.grid}>
        <button className={styles.button} onClick={allTokenAddress}>
          All Token Address
        </button>

        <button className={styles.button} onClick={resolveEns}>
          Resolve ENS
        </button>

        <button className={styles.button} onClick={tokenBalanceAddress}>
          USDT balance address
        </button>

        <button className={styles.button} onClick={tokenMetadata}>
          Token Metadata
        </button>

        <button className={styles.button} onClick={txHistory}>
          Tx History
        </button>

        <button className={styles.button} onClick={getNftsCollection}>
          Get NFTs Collection
        </button>

        <button className={styles.button} onClick={nftHistory}>
          NFT history
        </button>

        <button className={styles.button} onClick={nftsMinted}>
          NTFs Minted
        </button>

        <button className={styles.button} onClick={nftTxHistory}>
          NFT Tx History
        </button>

        <button className={styles.button} onClick={getFirstTransfer}>
          Get First Transfer
        </button>

        <button className={styles.button} onClick={getLastTransfer}>
          Get Last Transfer
        </button>
        

        </div>
        <p id="demo"></p>
        <p id="demoa"></p>

      </main>

      <footer className={styles.footer}>
        <a href='https://twitter.com/wild3_eth' target="_blank" rel="noreferrer">
          Powered by Wild3 Labs
        </a>
      </footer>
    </div>
  )
}
