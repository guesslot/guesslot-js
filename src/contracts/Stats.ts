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

  private async _getPosition(pool: string, asset: string, token: string, data: any): Promise<any> {
    const contract = this.getContractFromAbi(pool, this.getAbi('PositionPool'));
    const position: any = {
      asset: asset,
      object: asset + '/USD',
      token: token,
      round: data.epoch.toString().padStart(4, '0'),
      epoch: data.epoch.toNumber(),
      openTime: data.openTime.toNumber(),
      closeTime: data.closeTime.toNumber(),
      lockedTime: data.closeTime.toNumber(),
      lockedPrice: formatUnits(data.lockedPrice, 8),
      closedTime: data.closeTime.toNumber() + 3600 * 24 * 7,
      closedPrice: formatUnits(data.closedPrice, 8),
      stakes: formatEther(data.stakes),
      count: data.count.toNumber(),
      price: formatUnits(data.price, 8),
      rewards: formatEther(data.rewards),
      position: data.closedPrice == 0 ? null : Position[data.position],
      up: data.up.count.toNumber(),
      down: data.down.count.toNumber(),
      flat: data[11].count.toNumber(),
      status: data.lockedPrice == 0 ? 'Predicting' : data.closedPrice == 0 ? 'Proceeding' : 'Closed',
    };
    //     if (parseFloat(position.stakes) == 0) return position;

    if (position.status == 'Predicting') {
      position.rewards = formatEther(
        await contract.callStatic.getRewards(data.epoch.toNumber(), formatBytes32String(asset))
      );
    }

    return position;
  }

  public async getPositions(): Promise<any> {
    const contract = this.getContract();
    const position = this.getSetting('Positions')['gUSDT-BTC'];

    const data = await contract.getPositions(position.pool, formatBytes32String(position.asset));

    const items: any = [];
    for (const i in data) {
      items.push(await this._getPosition(position.pool, position.asset, position.token, data[i]));
    }
    return items;
  }
}
