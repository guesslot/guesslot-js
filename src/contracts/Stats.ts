import { formatEther, formatUnits } from '@ethersproject/units';
import { formatBytes32String } from '@ethersproject/strings';
import { Position } from '../types';
import Contract from '../contract';

export class Stats extends Contract {
  protected name: any = 'Stats';

  private _getAsset(data: any): any {
    return {
      escrowToken: data.escrowToken,
      escrowTokenName: data.escrowTokenName,
      escrowTokenBalance: formatEther(data.escrowTokenBalance),
      token: data.token,
      tokenName: data.tokenName,
      available: formatEther(data.available),
      stakes: formatEther(data.stakes),
      total: formatEther(data.total),
      price: formatUnits(data.price, 8),
    };
  }

  public async getAsset(account: string, asset: string): Promise<any> {
    const contract = this.getContract();
    return contract.getAssets(account, asset).then((data: any) => {
      return this._getAsset(data);
    });
  }

  public async getAssets(account: string): Promise<any> {
    const contract = this.getContract();
    return contract.getAssets(account).then((data: any) => {
      const items: any = [];
      data.forEach((item: any) => {
        items.push(this._getAsset(item));
      });
      return items;
    });
  }

  private _getPosition(data: any) {
    const position = data.closedPrice == 0 ? null : Position[data.position];
    return {
      epoch: data.epoch.toNumber(),
      openTime: data.openTime.toNumber(),
      closeTime: data.closeTime.toNumber(),
      lockedPrice: formatUnits(data.lockedPrice, 8),
      closedPrice: formatUnits(data.closedPrice, 8),
      stakes: formatEther(data.stakes),
      count: data.count.toNumber(),
      price: formatUnits(data.price, 8),
      position: position,
      up: data.up.count.toNumber(),
      down: data.down.count.toNumber(),
      flat: data[11].count.toNumber(),
      status: data.lockedPrice == 0 ? 'Predicting' : data.closedPrice == 0 ? 'Proceeding' : 'Closed',
    };
  }

  public async getPositions(): Promise<any> {
    const contract = this.getContract();
    const position = this.getSetting('Positions')['gUSDT-BTC'];

    return contract.getPositions(position.pool, formatBytes32String(position.asset)).then((data: any) => {
      const items: any = [];
      data.forEach((item: any) => {
        items.push(this._getPosition(item));
      });
      return items;
    });
  }
}
