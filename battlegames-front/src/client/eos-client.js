import ScatterJS from '@scatterjs/core';
import ScatterEOS from '@scatterjs/eosjs2';
import {JsonRpc, Api} from 'eosjs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../config/env.json');

ScatterJS.plugins( new ScatterEOS() );

//Network configuration in order to connect to EOS testnet
const network = ScatterJS.Network.fromJson({
    blockchain: "eos",
    protocol: "https",
    host: config.eos_http_endpoint,
    port: 443,
    chainId: config.eos_chain_id,
});

//Initialize RPC
const rpc = new JsonRpc(network.fullhost());

//Class Handling interaction with EOS testnet throught Scatter
export class EOSClient {
    //Initialize Constructor
    constructor() {
        this.userEosConnection = null;
        this.account = null;
    }

    //Function handle push transaction into Eos Testnet
    transact= async (data,action)  => {
        //If user not logged into scatter return error
        if(this.userEosConnection === null || this.account === null){
            return console.error('not logged in scatter or account not recognized');
        }
        //Push transaction
        await this.userEosConnection.transact({
            actions: [{
                account: config.eos_contract_name,
                name: action,
                authorization: [{
                    actor: this.account.name,
                    permission: this.account.authority,
                }],
                data: data,
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        })
    }
    // Function handle connection with Scatter
    connect = async () => {
        const connected = await ScatterJS.connect(config.eos_contract_name, {network});
        //If not connected return an error
        if(!connected) {
            return console.error('no scatter');
        }
        this.userEosConnection = ScatterJS.eos(network, Api, {rpc});
    }

    //Function handle login with Scatter
    login = async () => {
        const id = await ScatterJS.login();
        if(!id) return console.error('no identity');
        this.account = ScatterJS.account('eos');
        return this.account;
    }

    //Return account name if user is logged
    getAccount = () => {
        if(this.account === null){
            return console.error('no identity find');
        }
        return this.account;
    }

    //Function refreshing user data from Eos Testnet
    getGameData = async () => {
            return await rpc.get_table_rows({
                "json": true,
                "code": config.eos_contract_name,    // contract who owns the table
                "scope": config.eos_contract_name,   // scope of the table
                "table": "users",    // name of the table as specified by the contract abi
                "limit": 1,
                "lower_bound": this.account.name
            });
    }

    //Function handle logout from scatter
    logout = async () => {
        //If no account detect return an error
        if(this.account === null){
            return console.log('No account found in order to disconnect')
        }
        await ScatterJS.logout();
        this.userEosConnection =null;
        this.account=null;
    }
}
export default EOSClient ;
