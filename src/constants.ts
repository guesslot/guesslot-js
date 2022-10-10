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
    //   5: {
    //     Stats: '0x11F2B4470d40051363C7e03aCb5d04d4EFf88a72',
    //     Positions: {
    //       'gUSDT-BTC': {
    //         token: 'gUSDT',
    //         asset: 'BTC',
    //         pool: '0x319e68786a422A39F8FA2175D98ea4a8D77D39C6',
    //       },
    //     },
    //   },
    // },
    5: {
      Stats: '0x2266b3d360fc11A6C2f3036DB0992A63645202E0',
      Positions: {
        'gUSDT-BTC': {
          token: 'gUSDT',
          asset: 'BTC',
          pool: '0xFe29de4E91F829BA4e0C2E575C5E827e95f68790',
        },
      },
    },
  },
};
