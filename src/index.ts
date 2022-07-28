import { EventEmitter } from 'events';
import { WalletType } from './types';
import Wallet from './wallet';
import * as Wallets from './wallets';
import { Settings } from './constants';
import * as Contracts from './contracts';
import Subgraph from './subgraph';

export default class DappJS extends EventEmitter {
  [key: string]: any;

  private _wallet?: Wallet;

  constructor() {
    super();
    Object.keys(Contracts).forEach((contractName) => {
      let contract: any = (<any>Contracts)[contractName];
      this[contractName] = () => {
        return new contract(this._wallet);
      };
      this['Subgraph'] = () => {
        return new Subgraph();
      }
    });
  }

  private _handleChainChanged = (chainId: number, account: any) => {
    if (Settings.Contracts[parseInt(chainId + '')]) {
      this.emit('chainChanged', chainId, account);
    } else {
      this._wallet?.disconnect('Chain not supported.');
    }
  };

  private _handleWalletChanged = (chainId: number, account: any) => {
    if (Settings.Contracts[parseInt(chainId + '')]) {
      this.emit('walletChanged', chainId, account);
    } else {
      this._wallet?.disconnect('Chain not supported.');
    }
  };

  private _handleDisconnect = (message: any) => {
    this.emit('disconnect', message);
  };

  public async connect(walletType: WalletType, config: any = {}): Promise<any> {
    this._wallet = new Wallets[walletType](config);

    this._wallet?.on('walletChanged', this._handleWalletChanged);
    this._wallet?.on('chainChanged', this._handleChainChanged);
    this._wallet?.on('disconnect', this._handleDisconnect);

    return this._wallet?.connect().then((chainId: number) => {
      this._handleWalletChanged(chainId, this._wallet?.getAccount());
      return chainId;
    });
  }

  public async disconnect(): Promise<any> {
    await this._wallet?.disconnect('User disconnect');
    this._wallet = undefined;
  }

  public getChainId(): any {
    return this._wallet?.getChainId();
  }

  public getAccount(): any {
    return this._wallet?.getAccount();
  }

  public async getNonce(): Promise<number> {
    return this._wallet?.getSigner().getTransactionCount('pending');
  }

  public async getNetWork(): Promise<number> {
    return this._wallet?.getNetwork();
  }

  public isAvailableChain(): any {
    let chainId = this._wallet?.getChainId();
    if (!chainId) return false;
    try {
      if (Settings.Contracts[parseInt(chainId + '')]) return true;
    } catch (error) {}
    return false;
  }

  public async addChain(): Promise<any> {
    return this._wallet?.addChain();
  }

  public async addToken(): Promise<any> {
    return this._wallet?.addToken();
  }
}
