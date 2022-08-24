import axios from 'axios';
import { Position } from './types';
import { formatEther } from '@ethersproject/units';

export default class Subgraph {
  private api: string = 'https://api.thegraph.com/subgraphs/name/guesslot/fake';

  private async request(query: string, data: any): Promise<any> {
    if (!this.api) throw new Error('Subgraph Config Error');
    return axios
      .post(
        this.api,
        JSON.stringify({
          query: query,
          variables: data,
        })
      )
      .then((resp: any) => {
        return resp.data.data ? resp.data.data.data : resp.data.errors;
      });
  }

  public async getWinners(skip: number = 0): Promise<any> {
    const query: string =
      'query ($skip: Int!) {data:positionPredicts(first: 1000, skip: $skip, orderBy: time, orderDirection: desc, where: { positionRound_: { status: 1 }}) { hash account epoch asset stakes position claimed time round {token stakes rewards status} positionRound {position status} positionVault {stakes}}}';
    return this.request(query, { skip: skip }).then((data: any) => {
      const items: any = [];

      data.forEach((item: any) => {
        item.object = item.asset + '/USD';
        item.position = Position[item.position];
        item.stakes = formatEther(item.stakes);
        item.epoch = item.epoch;

        const round = item.round;
        const positionRound = Position[item.positionRound.position];
        if (positionRound == item.position) {
          const positionVault = item.positionVault;
          delete item.round;
          delete item.positionRound;
          delete item.positionVault;

          if (item.claimed > 0) {
            item.status = 'Claimed';
          } else if (round.status == 1) {
            item.status = positionRound == item.position ? 'Won' : 'Closed';
          } else {
            item.status = 'Predicting';
          }

          item.pool = round.token;
          item.round = item.epoch.toString().padStart(4, '0');
          item.totalRewards = formatEther(round.rewards);
          item.totalStakes = formatEther(positionVault.stakes);
          item.rewards =
            positionRound == item.position && item.totalStakes > 0
              ? (item.totalRewards * item.stakes) / item.totalStakes
              : 0;
          items.push(item);
        }
      });

      return items;
    });
  }

  public async getHistory(account: string, skip: number = 0): Promise<any> {
    const query: string =
      'query ($account: String!, $skip: Int!) {data:positionPredicts(first: 1000, skip: $skip, orderBy: time, orderDirection: desc, where: {account: $account}) { hash account epoch asset stakes position claimed time round {token stakes rewards status} positionRound {position status} positionVault {stakes}}}';
    return this.request(query, { account: account, skip: skip }).then((data: any) => {
      const items: any = [];

      data.forEach((item: any) => {
        item.object = item.asset + '/USDT';
        item.position = Position[item.position];
        item.stakes = formatEther(item.stakes);
        item.epoch = item.epoch;

        const round = item.round;
        const positionRound = Position[item.positionRound.position];
        const positionVault = item.positionVault;
        delete item.round;
        delete item.positionRound;
        delete item.positionVault;

        if (item.claimed > 0) {
          item.status = 'Claimed';
        } else if (round.status == 1) {
          item.status = positionRound == item.position ? 'Won' : 'Closed';
        } else {
          item.status = 'Predicting';
        }

        item.pool = round.token;
        item.round = item.epoch.toString().padStart(4, '0');
        item.totalRewards = formatEther(round.rewards);
        item.totalStakes = formatEther(positionVault.stakes);
        item.rewards =
          positionRound == item.position && item.totalStakes > 0
            ? (item.totalRewards * item.stakes) / item.totalStakes
            : 0;
        items.push(item);
      });

      return items;
    });
  }
}
