import { formatEther, parseEther } from '@ethersproject/units';
import { formatBytes32String } from '@ethersproject/strings';
import { Position } from '../types';
import Contract from '../contract';

export class PositionPool extends Contract {
  protected name: any = 'PositionPool';

  private _getPoolContract(position: string) {
    const pool: string = this.getSetting('Positions')[position]['pool'];
    return this.getContractFromAddress(pool);
  }

  public async startRound(): Promise<any> {
    const contract = this._getPoolContract('gUSDT-BTC');
    return contract.startRound();
  }

  public async currentEpoch(): Promise<any> {
    const contract = this._getPoolContract('gUSDT-BTC');
    return contract.currentEpoch().then((data: any) => {
      return data.toNumber();
    });
  }

  public async claimable(account: string, epoch: number, asset: string): Promise<any> {
    const contract = this._getPoolContract('gUSDT-BTC');
    return contract.claimable(account, epoch, formatBytes32String(asset)).then((data: any) => {
      return formatEther(data);
    });
  }

  public async claim(epoch: number, asset: string): Promise<any> {
    const contract = this._getPoolContract('gUSDT-BTC');
    return contract.claim(epoch, formatBytes32String(asset));
  }

  public async predict(asset: string, stakes: string, position: Position): Promise<any> {
    const contract = this._getPoolContract('gUSDT-BTC');
    return contract.predict(formatBytes32String(asset), parseEther(stakes), position);
  }

  public async getBet(asset: string, account: string): Promise<any> {
    const contract = this._getPoolContract('gUSDT-BTC');
    return contract.getBet(formatBytes32String(asset), account).then((data: any) => {
      const position = data.stakes == 0 ? null : Position[data.position];
      return {
        position: position,
        stakes: formatEther(data.stakes),
        claimed: data.claimed,
      };
    });
  }
}
