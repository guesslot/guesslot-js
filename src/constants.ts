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
      Stats: '0x8d7F47a8Cc776c55EeF40BE1849129857DaaAE71',
      Escrowable: '0x1E0c3A61aC6c0dC054d880370e069Ee12c3e4C0A',
      Positions: {
        'gUSDT-BTC': {
          asset: 'BTC',
          pool: '0xb4359Ad9C056dFA0A83DE7D1082921dE813D1B2c',
        },
      },
    },
  },
};
