import { parseEther } from '@ethersproject/units';
import Contract from '../contract';

export class Escrowable extends Contract {
  protected name: any = 'Escrowable';
  private zeroToken = '0x0000000000000000000000000000000000000000';

  public async deposit(amount: string): Promise<any> {
    const contract = this.getContract();
    const escrowToken = await contract.escrowToken();
    const _amount = parseEther(amount);
    return escrowToken == this.zeroToken ? contract.deposit({ value: _amount }) : contract['deposit(uint256)'](_amount);
  }

  public async withdraw(amount: string): Promise<any> {
    const contract = this.getContract();
    return contract.withdraw(parseEther(amount));
  }
}
