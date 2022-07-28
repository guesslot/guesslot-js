export const Settings: any = {
  MetaMask: {
    Chain: {
      chainId: '0x4',
    },
  },
  NoWallet: {
    chainId: '0x4',
    rpc: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  },
  WalletConnect: {},

  Contracts: {
    4: {
      Stats: '0x98CF2F782a17DBa4A106685533ff2E220eF46FD1',
      Positions: {
        'gUSDT-BTC': {
          token: 'gUSDT',
          asset: 'BTC',
          pool: '0x96fE8eE674B04d7DC5F708da69dC2728de127f2e',
        },
      },
    },
  },
};
