export const Settings: any = {
  MetaMask: {
    Chain: {
      chainId: '0x5',
    },
  },
  NoWallet: {
    chainId: '0x5',
    rpc: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  },
  WalletConnect: {},

  Contracts: {
    5: {
      Stats: '0x11F2B4470d40051363C7e03aCb5d04d4EFf88a72',
      Positions: {
        'gUSDT-BTC': {
          token: 'gUSDT',
          asset: 'BTC',
          pool: '0xB8dab01E3a407966BF1b78342A7689B45a347198',
        },
      },
    },
  },
};
