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
      Stats: '0x2dbcE4705aB0B6bE71595AD4DD27862Ac2117741',
      Positions: {
        'gUSDT-BTC': {
          token: 'gUSDT',
          asset: 'BTC',
          pool: '0x9087149f26b1A82cd00950e23c262e0AcaF3c1dE',
        },
      },
    },
  },
};
