import React, { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import './App.css';

// Images
import logo from './images/logo.png';
import btnIg from './images/buttonIg.png';
import btnTw from './images/buttonTw.png';
import btnDc from './images/buttonDc.png';

import { getCookie, hasher, setCookie } from './General';
import { v4 as uuidv4 } from 'uuid';
import c from './constants';
import axios from 'axios';

import NamiWalletApi, { Cardano } from './nami-js';
import blockfrostApiKey from '../config.js';

const cookieKey = "sessionID";

const API_ENDPOINT = 'https://discord.com/api/v8'
const CLIENT_ID = '958330731543822396'

let nami;

const sessionCookieBump = () => {
    const cookieValue = getCookie(cookieKey);
    if (cookieValue.length === 0) {
        const uuid = uuidv4();
        setCookie(cookieKey, uuid, 1)
    }
    else {
        setCookie(cookieKey, cookieValue, 1)
    }
}

const AppState = {
    NeedLogIn: 1,
    LoggedIn: 2,
    ProcessingClaim: 3
};
Object.freeze(AppState);

export default function App() {
    const [connected, setConnected] = useState()
    const [address, setAddress] = useState()
    const [nfts, setNfts] = useState([])
    const [balance, setBalance] = useState()
    const [transaction, setTransaction] = useState()
    const [amount, setAmount] = useState("10")
    const [txHash, setTxHash] = useState()
    const [recipientAddress, setRecipientAddress] = useState("addr_test1qqsjrwqv6uyu7gtwtzvhjceauj8axmrhssqf3cvxangadqzt5f4xjh3za5jug5rw9uykv2klc5c66uzahu65vajvfscs57k2ql")
    const [witnesses, setWitnesses] = useState()
    const [policy, setPolicy] = useState()
    const [builtTransaction, setBuiltTransaction] = useState()

    const [complextxHash, setComplextxHash] = useState()
    const [policyExpiration, setPolicyExpiration] = useState(new Date());
    const [complexTransaction, setComplexTransaction] = useState({
        recipients: [{
            address: "addr_test1qqsjrwqv6uyu7gtwtzvhjceauj8axmrhssqf3cvxangadqzt5f4xjh3za5jug5rw9uykv2klc5c66uzahu65vajvfscs57k2ql",
            amount: "3",
            mintedAssets: [{
                assetName: "MyNFT", quantity: '1', policyId: "Example PolicyID",
                policyScript: "ExamplePolicy"
            }]
        }]
    })

    const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);
    const [appState, setAppState] = useState(AppState.NeedLogIn);

    const [discordInfo, setDiscordInfo] = useState(null);
    const [databaseResponse1, setDatabaseResponse1] = useState(null);
    const [databaseResponse2, setDatabaseResponse2] = useState(null);
    const [databaseResponse3, setDatabaseResponse3] = useState(null);

    const [mouseOverNft, setMouseOverNft] = useState(false);

    const mouseNftEnter = (e) => { setMouseOverNft(true); }
    const mouseNftLeave = (e) => { setMouseOverNft(false); }

    var error = null;
    if (error == null && databaseResponse3?.error != null) error = databaseResponse3.error;
    if (error == null && databaseResponse2?.error != null) error = databaseResponse2.error;
    if (error == null && databaseResponse1?.error != null) error = databaseResponse1.error;

    const mainContents = () => {
        if (discordInfo !== null)
            return (
                <div className="flex flex-row items-stretch flex-1">
                    <div className="flex flex-col w-1/3 h-full">
                        <div className="flex-1 bg-black/10 rounded-md text-center flex flex-col justify-center relative overflow-clip" onMouseEnter={mouseNftEnter} onMouseLeave={mouseNftLeave}>
                            <img src="https://gw3.easy-ipfs.com/ipfs/Qmc8HUhSEYegtQP5GCCjJmPA793ML5E7b2uTDtC74hxu3E" alt="Airdrop for the week"></img>
                            <p className={`text-white/20 transition-all ${mouseOverNft ? "opacity-0" : ""}`}>Hover for Description</p>
                            <div className={`transition-all absolute bottom-0 top-0 left-0 right-0 bg-black/50 p-3 flex flex-col justify-center ${mouseOverNft ? "" : "opacity-0"}`}>
                                <p className="">The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog. </p>
                            </div>
                        </div>
                        <p className="text-center p-2 tracking-widest">Artist: <a className="text-yellow-300 font-bold underline" href="https://twitter.com/SSlugs74">The Voyager</a></p>
                    </div>
                    <div className="p-2"></div>
                    <div className="flex flex-col flex-1">
                        <div className="bg-gray-400 rounded-md justify-center relative flex flex-row overflow-clip">
                            <span className="my-auto text-black/50 font-bold inline bg-yellow-300 py-1 px-3">Discord ID </span><span className="text-black font-normal flex-1 py-1 px-3">{c.FORCE_DISCORD_ID !== '' ? c.FORCE_DISCORD_ID : discordInfo.id}</span>
                        </div>
                        <div className="p-2"></div>
                        <div className="bg-white flex-1 rounded-md text-center relative overflow-clip flex flex-col">
                            <p className="text-black/50 font-bold bg-yellow-300 p-1">WALLET CONTENTS</p>
                            <div className="p-2 flex-1">
                                {

                                    error != null && <div className="flex flex-col justify-center h-full"><p className='text-red-800'>
                                        Error: <span>{error}</span>
                                    </p></div>
                                }
                                {
                                    (error != null) ? (<></>) :
                                        (databaseResponse1 == null) ? <p className="text-black">Loading...</p> :
                                            <table className="text-black w-full">
                                                <thead className="border-b-2 border-gray-400">
                                                    <tr>
                                                        <th className="p-1">Kairoscore Edition</th>
                                                        <th className="p-1">Quantity</th>
                                                        <th className="p-1">Probability</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        c.EDITIONS.filter((v, i, arr) => databaseResponse1[v.toLowerCase()] !== 0).map((v, i, arr) => {
                                                            return (
                                                                <tr className="transition-all-fast" key={i}>
                                                                    <td className="p-1">{v}</td>
                                                                    <td className="p-1">{databaseResponse1[v.toLowerCase()]}</td>
                                                                    <td className="p-1">{c.AIRDROP_PROBABILITIES[v.toUpperCase()] * 100}%</td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            );
        return (<div className="flex flex-col justify-center h-full">
            <p className="mb-10 text-center">Login Discord to connect your wallet</p>
        </div>);
    }

    const getMainButton = () => {
        switch (appState) {
            case AppState.NeedLogIn:
                return <button className="animated-all bg-white disabled:opacity-25 p-4 shadow-md rounded-md w-60 m-4 mx-auto" onClick={logInCallback}>Log In</button>
            case AppState.LoggedIn:
                if (databaseResponse1 == null || error != null)
                    return <></>;
                if (databaseResponse1.airdrop === 0)
                    return <button disabled className="animated-all bg-white disabled:opacity-50 p-4 shadow-md rounded-md w-60 m-4 mx-auto">No Eligible Cores!<br />Try Again Next Week!</button>
                if (databaseResponse1.airdrop === databaseResponse1.airdrop_taken)
                    return <button disabled className="animated-all bg-white disabled:opacity-25 p-4 shadow-md rounded-md w-60 m-4 mx-auto">Already Claimed!</button>
                return <button onClick={claimCallback} className="animated-all bg-white disabled:opacity-25 p-4 shadow-md rounded-md hover:bg-yellow-100 w-60 m-4 mx-auto">Claim ({databaseResponse1.airdrop} NFTS!)</button>
            case AppState.ProcessingClaim:
                return <button disabled className="animated-all bg-white disabled:opacity-25 p-4 shadow-md rounded-md w-60 m-4 mx-auto">Processing...</button>
            default:
                return <></>;
        }
    }

    const logInCallback = async (e) => {
        e.preventDefault();

        sessionCookieBump();
        const sessionCookie = getCookie(cookieKey)
        const hashedSessionCookie = hasher(sessionCookie);

        window.location.href = `https://discord.com/api/oauth2/authorize?response_type=token&client_id=${CLIENT_ID}&scope=identify&state=${hashedSessionCookie}`;
    }

    const claimCallback = async (e) => {
        e.preventDefault();

        setAppState(AppState.ProcessingClaim);

        const endpoint2Url = `https://demons-api.herokuapp.com/Kairos/Airdrop/RandomGet/${databaseResponse1.airdrop}/${c.CURRENT_NFT_TYPE}`;
        console.log("Endpoint 2 URL: " + endpoint2Url)
        axios.get(endpoint2Url).then(async (res2) => {

            // Build transaction

            // let transaction = await nami.transaction( 
            //   PaymentAddress = "", 
            //   recipients = [{address: "", amount: "0" ,assets:[],   mintedAssets: []}], 
            //   metadata = null, 
            //   metadataHash = null, 
            //   addMetadata = true, 
            //   utxosRaw = [],
            //   networkId = 0, 
            //   ttl = 3600, 
            //   multiSig = false);

            // const buyerTx = ''; // TODO: Needs value
            // const witnessBuyer = ''; // TODO: Needs value
            // const nftName = res2.data.nftName.join(",");
            // const buyerAddress = ''; // TODO: Needs value
            // const type = c.CURRENT_NFT_TYPE;
            // const quantity = databaseResponse1.airdrop;
            // const discordId = discordInfo.id;
            // const endpoint3Url = `https://demons-api.herokuapp.com/Kairos/Airdrop/MultiSig/${buyerTx}/${witnessBuyer}/${nftName}/${buyerAddress}/${type}/${quantity}/${discordId}`;
            // console.log('endpoint3Url: ' + endpoint3Url)
            // axios.get(endpoint3Url).then((res3) => {

            // })
        })
    }

    useEffect(() => {
        const defaultDate = new Date();
        defaultDate.setTime(defaultDate.getTime() + (1 * 60 * 90 * 1000))
        setPolicyExpiration(defaultDate);
    }, [])

    useEffect(() => {
        async function t() {

            const S = await Cardano();
            nami = new NamiWalletApi(
                S,
                window.cardano,
                blockfrostApiKey
            )

            if (await nami.isInstalled()) {
                await nami.isEnabled().then(result => { setConnected(result) })
            }
        }
        t()
    }, [])

    // Code when being redirected back from discord
  useEffect(() => {
    sessionCookieBump();

    const fragmentMap = {}
    window.location.hash.substring(1).split("&").forEach((v,i,arr) => {
      const equalsIndex = v.indexOf("=")
      fragmentMap[v.substring(0, equalsIndex)] = v.substring(equalsIndex + 1)
    })
    window.location.hash = "";

    if (fragmentMap.access_token == null)
      return
    
    setAppState(AppState.LoggedIn);

    const meUrl = `${API_ENDPOINT}/users/@me`;
    const body = {
      'headers': {
        'authorization': `${fragmentMap.token_type} ${fragmentMap.access_token}`,
      }    
    }
    axios.get(meUrl, body).then((res) => {
      console.log("discordInfo set to:");
      console.log(res.data);
      setDiscordInfo(res.data)
    })
  }, [])

  // Code to run when discord info has been retrieved
  useEffect(() => {
    if (discordInfo == null)
      return;

    const discordIdToUse = c.FORCE_DISCORD_ID !== '' ? c.FORCE_DISCORD_ID : discordInfo.id;
    axios.get(`https://demons-api.herokuapp.com/Kairos/Airdrop/Info/${discordIdToUse}`).then((res) => {
      console.log("Endpoint 1 Returned: ")
      console.log(res.data)
      setDatabaseResponse1(res.data)
    }).catch((error) => {
      setDatabaseResponse1(error.response.data)
    })
  }, [discordInfo])

    const connect = async () => {
        // Connects nami wallet to current website 
        await nami.enable()
            .then(result => setConnected(result))
            .catch(e => console.log(e))
    }

    const getAddress = async () => {
        // retrieve address of nami wallet
        if (!connected) {
            await connect()
        }
        await nami.getAddress().then((newAddress) => { console.log(newAddress); setAddress(newAddress) })
    }


    const getBalance = async () => {
        if (!connected) {
            await connect()
        }
        await nami.getBalance().then(result => { console.log(result); setNfts(result.assets); setBalance(result.lovelace) })
    }

    const buildTransaction = async () => {
        if (!connected) {
            await connect()
        }

        const recipients = [{ "address": recipientAddress, "amount": amount }]
        let utxos = await nami.getUtxosHex();
        const myAddress = await nami.getAddress();

        let netId = await nami.getNetworkId();
        const t = await nami.transaction({
            PaymentAddress: myAddress,
            recipients: recipients,
            metadata: null,
            utxosRaw: utxos,
            networkId: netId.id,
            ttl: 3600,
            multiSig: null
        })
        console.log(t)
        setTransaction(t)
    }

    const buildFullTransaction = async () => {
        if (!connected) {
            await connect()
        }
        try {
            const recipients = complexTransaction.recipients
            const metadataTransaction = complexTransaction.metadata
            console.log(metadataTransaction)
            let utxos = await nami.getUtxosHex();

            const myAddress = await nami.getAddress();
            console.log(myAddress)
            let netId = await nami.getNetworkId();

            const t = await nami.transaction({
                PaymentAddress: myAddress,
                recipients: recipients,
                metadata: metadataTransaction,
                utxosRaw: utxos,
                networkId: netId.id,
                ttl: 3600,
                multiSig: null
            })
            setBuiltTransaction(t)
            const signature = await nami.signTx(t)
            console.log(t, signature, netId.id)
            const txHash = await nami.submitTx({
                transactionRaw: t,
                witnesses: [signature],

                networkId: netId.id
            })
            console.log(txHash)
            setComplextxHash(txHash)
        } catch (e) {
            console.log(e)
        }
    }

    const signTransaction = async () => {
        if (!connected) {
            await connect()
        }

        const witnesses = await nami.signTx(transaction)
        setWitnesses(witnesses)
    }

    const submitTransaction = async () => {
        let netId = await nami.getNetworkId();
        const txHash = await nami.submitTx({
            transactionRaw: transaction,
            witnesses: [witnesses],

            networkId: netId.id
        })
        setTxHash(txHash)

    }

    const createPolicy = async () => {
        console.log(policyExpiration)
        try {
            await nami.enable()


            const myAddress = await nami.getHexAddress();

            let networkId = await nami.getNetworkId()
            const newPolicy = await nami.createLockingPolicyScript(myAddress, networkId.id, policyExpiration)

            setPolicy(newPolicy)
            setComplexTransaction((prevState) => {
                const state = prevState; state.recipients[0].mintedAssets[0].policyId = newPolicy.id;
                state.recipients[0].mintedAssets[0].policyScript = newPolicy.script;
                state.metadata = {
                    "721": {
                        [newPolicy.id]:
                        { [state.recipients[0].mintedAssets[0].assetName]: { name: "MyNFT", description: "Test NFT", image: "ipfs://QmUb8fW7qm1zCLhiKLcFH9yTCZ3hpsuKdkTgKmC8iFhxV8" } }
                    }
                };
                return { ...state }
            })

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <section className="sectionStyle">
                <div className="flex flex-row justify-center">
                    <div className="fixed flex flex-row justify-start w-full items-center -mt-6 max-w-screen-lg">
                        <a href="https://www.kairoscore.xyz/"><img src={logo} alt="Logo" target="_blank" className="object-contain mt-5 h-28" /></a>
                        <p className="grow"></p>
                        <div className="hidden md:flex flex-row items-center">
                            <a className="text-white mx-4 hover:text-linkhighlight" href="https://www.kairoscore.xyz/#FAQs-Section">FAQs</a>
                            <a className="text-white mx-4 hover:text-linkhighlight" href="https://www.kairoscore.xyz/#Roadmap-Section">Roadmap</a>
                            <a className="yellowButtonEffect" href="https://twitter.com/kairos_core"><img src={btnTw} alt="Twitter" className="object-contain w-10 mx-2" /></a>
                            <a className="yellowButtonEffect" href="https://discord.com/invite/kairoscore"><img src={btnDc} alt="Discord" className="object-contain w-10 mx-2" /></a>
                            <a className="yellowButtonEffect" href="https://www.instagram.com/kairos_core/"><img src={btnIg} alt="Instagram" className="object-contain w-10 ml-2 mr-10" /></a>
                        </div>
                        <div>
                            <button className={"mr-10 md:hidden p-2 rounded-t" + (mobileNavIsOpen ? "  text-myblue-normal bg-white" : " text-white")} onClick={() => {
                                console.log("hello");
                                setMobileNavIsOpen(!mobileNavIsOpen);
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <div className="relative mr-10 ">
                                <div className={"md:hidden flex flex-col items-start absolute anim origin-top right-0 -top-0 rounded-b rounded-tl" + (mobileNavIsOpen ? " bg-white" : " xFlat")}>
                                    <a className="text-myblue-normal mx-4 hover:text-linkhighlight py-2" href="https://www.kairoscore.xyz/#FAQs-Section">FAQs</a>
                                    <a className="text-myblue-normal mx-4 hover:text-linkhighlight py-2" href="https://www.kairoscore.xyz/#Roadmap-Section">Roadmap</a>
                                    <a className="text-myblue-normal mx-4 hover:text-linkhighlight py-2" href="https://twitter.com/kairos_core">Twitter</a>
                                    <a className="text-myblue-normal mx-4 hover:text-linkhighlight py-2" href="https://discord.com/invite/kairoscore">Discord</a>
                                    <a className="text-myblue-normal mx-4 hover:text-linkhighlight py-2" href="https://www.instagram.com/kairos_core/">Instagram</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-full flex flex-col justify-center max-w-screen-lg mx-auto px-5">
                    <p className="text-3xl font-bold text-white text-center mb-4">Airdrop NFT</p>
                    <p className="text-white mb-3 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                    <div className="bg-white/10 p-6 h-1/2 rounded-lg text-white">
                        <div className="h-full w-full flex flex-col">
                            {mainContents()}
                        </div>
                    </div>
                    {getMainButton()}
                </div>
            </section>
        </div>
    );
}