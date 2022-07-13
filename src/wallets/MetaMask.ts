import { Web3Provider } from '@ethersproject/providers';
import { Settings } from '../constants';
import Wallet from '../wallet';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export class MetaMask extends Wallet {
  private _chainId: number;

  constructor(config: any) {
    super(config);
    if (!window.ethereum)
      throw new Error('<a href="https://metamask.io" style="color:#fff" target="_blank">Please install MetaMask!</a>');
  }

  public getChainId(): number {
    return this._chainId;
    // return window.ethereum?.chainId;
  }

  public getAccount(): string {
    return window.ethereum?.selectedAddress;
  }

  public async getNetwork(): Promise<any> {
    return new Web3Provider(window.ethereum).getNetwork();
  }

  public async connect(): Promise<any> {
    return this._changeChain().then((chainId: number) => {
      return window.ethereum
        ?.request({ method: 'eth_requestAccounts' })
        .then(() => {
          window.ethereum?.removeAllListeners();
          window.ethereum?.on('accountsChanged', this._handleAccountsChanged);
          window.ethereum?.on('chainChanged', this._handleChainChanged);
          // return window.ethereum
          //   .request({
          //     method: 'wallet_watchAsset',
          //     params: Settings.MetaMask.Token,
          //   })
          //   .then(() => {
          //     return chainId;
          //   });
          this._chainId = chainId;
          return this._chainId;
        })
        .catch((error: any) => {
          return Promise.reject(error);
        });
    });
  }

  private _handleAccountsChanged = () => {
    if (window.ethereum?.selectedAddress)
      this.emit('walletChanged', window.ethereum?.chainId, window.ethereum?.selectedAddress);
    else {
      this.disconnect('User disconnect');
    }
  };

  private _handleChainChanged = () => {
    this.emit('chainChanged', window.ethereum?.chainId, window.ethereum?.selectedAddress);
  };

  public async disconnect(message: any): Promise<any> {
    window.ethereum?.removeAllListeners();
    this.emit('disconnect', message);
  }

  private async _changeChain(): Promise<any> {
    if (!Settings.MetaMask.Chain) return;
    return window.ethereum
      ?.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: Settings.MetaMask.Chain.chainId,
          },
        ],
      })
      .then(() => {
        this._chainId = parseInt(Settings.MetaMask.Chain.chainId);
        return this._chainId;
      })
      .catch((error: any) => {
        switch (error.code) {
          case 4902:
          case -32603:
            return window.ethereum
              ?.request({
                method: 'wallet_addEthereumChain',
                params: [Settings.MetaMask.Chain],
              })
              .then(() => {
                this._chainId = parseInt(Settings.MetaMask.Chain.chainId);
                return this._chainId;
              });

          default:
            return Promise.reject(error);
        }
      });
  }

  public getSigner(): any {
    return new Web3Provider(window.ethereum).getSigner();
  }

  public addToken(): Promise<any> {
    return window.ethereum.request({
      method: 'wallet_watchAsset',
      params: Settings.MetaMask.Token,
    });
  }

  public addChain(): Promise<any> {
    return window.ethereum?.request({
      method: 'wallet_addEthereumChain',
      params: [Settings.MetaMask.Chain],
    });
  }
}
