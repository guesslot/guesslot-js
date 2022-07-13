import { Web3Provider } from '@ethersproject/providers';
// import WalletConnectProvider from '@walletconnect/ethereum-provider';
import WalletConnectProvider from '@walletconnect/ethereum-provider/dist/umd/index.min';
import { Settings } from '../constants';
import Wallet from '../wallet';

export class WalletConnect extends Wallet {
  private provider: any;

  constructor(config: any) {
    super(config);
    this.provider = new WalletConnectProvider(Settings.WalletConnect);
    this.provider.connector.on('disconnect', () => {
      this.emit('disconnect');
    });
  }

  public getChainId(): number {
    return this.provider.chainId;
  }

  public getAccount(): string {
    return this.provider.accounts[0];
  }

  public async getNetwork(): Promise<any> {
    return new Web3Provider(this.provider).getNetwork();
  }

  public async connect(): Promise<any> {
    return this.provider
      .enable()
      .then(() => {
        return this.provider.chainId;
      })
      .catch((error: any) => {
        return Promise.reject(error.message);
      });
  }

  public async disconnect(_: any): Promise<any> {
    return this.provider.disconnect();
  }

  public getSigner(): any {
    return new Web3Provider(this.provider).getSigner();
  }

  public addToken(): Promise<any> {
    return this.provider.request({
      method: 'wallet_watchAsset',
      params: Settings.MetaMask.Token,
    });
  }

  public addChain(): Promise<any> {
    return this.provider.request({
      method: 'wallet_addEthereumChain',
      params: [Settings.MetaMask.Chain],
    });
  }
}
