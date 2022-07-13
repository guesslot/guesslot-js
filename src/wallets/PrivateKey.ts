import { InfuraProvider, JsonRpcProvider } from '@ethersproject/providers';
import { Wallet as wallet } from '@ethersproject/wallet';
import Wallet from '../wallet';

export class PrivateKey extends Wallet {
  private provider: any;

  constructor(config: any) {
    super(config);

    let provider;
    if (this.config.infuraId) {
      provider = new InfuraProvider(this.config.chainId, this.config.infuraId);
    } else if (this.config.rpc) {
      provider = new JsonRpcProvider(this.config.rpc, this.config.chainId);
    } else {
      throw new Error('Config Error');
    }

    this.provider = new wallet(this.config.privateKey, provider);
  }

  public getChainId(): number {
    return this.config.chainId;
  }

  public getAccount(): string {
    return this.provider.address;
  }

  public async getNetwork(): Promise<any> {
    return this.provider.getNetwork();
  }

  public async connect(): Promise<any> {
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
