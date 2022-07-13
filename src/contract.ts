import { Contract as contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';
import { Settings } from './constants';
import Wallet from './wallet';
import * as ABI from './abi';

export default abstract class Contract {
  protected wallet: Wallet;
  protected name: any;

  constructor(wallet: Wallet) {
    this.wallet = wallet;
  }

  protected getSetting(name: string): any {
    if (!this.wallet) throw new Error('Wallet not connected.');
    try {
      return Settings.Contracts[parseInt(this.wallet?.getChainId() + '')][name];
    } catch (error) {}
    throw new Error('Wallet not connected.');
  }

  public getAddress(name: string = this.name): any {
    return this.getSetting(name);
  }

  public getContract(name: string = this.name): any {
    let address: any = this.getSetting(name);
    let abi: any = this.getAbi(name);
    return this.getContractFromAbi(address, abi);
  }

  public getContractFromAddress(address: string): any {
    let abi: any = this.getAbi(this.name);
    return this.getContractFromAbi(address, abi);
  }

  protected getContractFromAbi(address: string, abi: any): any {
    if (!this.wallet) throw new Error('Wallet not connected.');
    return new contract(address, abi, this.wallet.getSigner());
  }

  protected getAbi(name: string): any {
    let abi: any = (<any>ABI)[name];
    if (abi) return abi;
    throw new Error('Module not implemented.');
  }

  public async needApprove(token: string): Promise<boolean> {
    let account = this.wallet.getAccount();
    let erc20: any = this.getContractFromAbi(token, this.getAbi('ERC20'));
    let allowance: BigNumber = await erc20.allowance(account, this.getAddress());
    let value: BigNumber = await erc20.balanceOf(account);
    if (value == BigNumber.from(0)) return true;
    return allowance.lt(value);
  }

  public async approve(token: string): Promise<any> {
    let erc20: any = this.getContractFromAbi(token, this.getAbi('ERC20'));
    let amount: BigNumber = BigNumber.from('0x0000000000000000000000000000000000000000ffffffffffffffffffffffff');
    return erc20.approve(this.getAddress(), amount);
  }

  public async tokenBalanceOf(token: string, account: string): Promise<any> {
    let erc20: any = this.getContractFromAbi(token, this.getAbi('ERC20'));
    return erc20.balanceOf(account);
  }
}
