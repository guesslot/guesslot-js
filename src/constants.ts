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
      Stats: '0x78fb3dB19c823BFf80ADB9cD48483c987aFD6436',
      Positions: {
        'gUSDT-BTC': {
          token: 'gUSDT',
          asset: 'BTC',
          pool: '0x70C9103290E4F5bd728dCa70553443bc84535B3F',
        },
      },
    },
  },
};
