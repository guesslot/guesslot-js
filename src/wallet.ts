import { EventEmitter } from 'events';

export default abstract class Wallet extends EventEmitter {
  protected event: EventEmitter;

  protected config: any;

  constructor(config: any) {
    super();
    this.config = config;
  }

  public abstract getChainId(): number;
  public abstract getAccount(): string;
  public abstract getNetwork(): Promise<any>;
  public abstract connect(): Promise<any>;
  public abstract disconnect(message: any): Promise<void>;
  public abstract getSigner(): any;
  public abstract addToken(): Promise<any>;
  public abstract addChain(): Promise<any>;
}
