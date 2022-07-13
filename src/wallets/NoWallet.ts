import { InfuraProvider, JsonRpcProvider } from '@ethersproject/providers';
import { AddressZero } from '@ethersproject/constants';
import { Settings } from '../constants';
import Wallet from '../wallet';

export class NoWallet extends Wallet {
  private provider: any;

  constructor(config: any) {
    super(config);
  }

  public getChainId(): number {
    return this.provider._network.chainId;
  }

  public getAccount(): string {
    return AddressZero;
  }

  public async getNetwork(): Promise<any> {
    return this.provider.getNetwork();
  }

  public async connect(): Promise<any> {
    if (this.config.infuraId) {
      this.provider = new InfuraProvider(this.config.chainId, this.config.infuraId);
    } else if (this.config.rpc) {
      this.provider = new JsonRpcProvider(this.config.rpc, this.config.chainId);
    } else {
      this.provider = new JsonRpcProvider(Settings.NoWallet.rpc, parseInt(Settings.NoWallet.chainId));
    }
    return this.getChainId();
  }

  public async disconnect(message: any): Promise<void> {
    this.emit('disconnect', message);
  }

  public getSigner(): any {
    return this.provider;
  }

  public addToken(): Promise<any> {
    return Promise.resolve();
  }

  public addChain(): Promise<any> {
    return Promise.resolve();
  }
}
