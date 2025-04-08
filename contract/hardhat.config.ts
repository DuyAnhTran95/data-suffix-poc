import '@nomicfoundation/hardhat-chai-matchers'
import '@nomicfoundation/hardhat-ethers'
import '@nomicfoundation/hardhat-ignition-ethers'

import { vars } from 'hardhat/config'
import { HardhatUserConfig } from 'hardhat/types'

const PRIVATE_KEY = vars.get('PRIVATE_KEY')

const config: HardhatUserConfig = {
  networks: {
    bera: {
      url: 'https://rpc.berachain.com',
      accounts: [PRIVATE_KEY],
    },
  },
  solidity: '0.8.28',
}

export default config
