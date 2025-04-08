import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

export default buildModule('SuffixData', (m) => {
  const deployer = m.getAccount(0)
  const multisender = m.contract('SuffixData', [], { from: deployer })

  return { multisender }
})
