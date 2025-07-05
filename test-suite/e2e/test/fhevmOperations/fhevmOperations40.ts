import { assert } from 'chai';
import { ethers } from 'hardhat';

import type { FHEVMTestSuite1 } from '../../types/contracts/tests/FHEVMTestSuite1';
import type { FHEVMTestSuite2 } from '../../types/contracts/tests/FHEVMTestSuite2';
import type { FHEVMTestSuite3 } from '../../types/contracts/tests/FHEVMTestSuite3';
import type { FHEVMTestSuite4 } from '../../types/contracts/tests/FHEVMTestSuite4';
import type { FHEVMTestSuite5 } from '../../types/contracts/tests/FHEVMTestSuite5';
import type { FHEVMTestSuite6 } from '../../types/contracts/tests/FHEVMTestSuite6';
import type { FHEVMTestSuite7 } from '../../types/contracts/tests/FHEVMTestSuite7';
import { createInstance } from '../instance';
import { getSigner, getSigners, initSigners } from '../signers';

const deployContract = async (contractName: string, signer: HardhatEthersSigner) => {
  const contractFactory = await ethers.getContractFactory(contractName);
  const contract = await contractFactory.connect(signer).deploy();
  await contract.waitForDeployment();
  return contract;
};

describe('FHEVM operations', function () {
  before(async function () {
    this.signer = await getSigner(40);
    const instance = await createInstance();
    this.instance = instance;

    this.contract1 = await deployContract('FHEVMTestSuite1', this.signer);
    this.contract2 = await deployContract('FHEVMTestSuite2', this.signer);
    this.contract3 = await deployContract('FHEVMTestSuite3', this.signer);
    this.contract4 = await deployContract('FHEVMTestSuite4', this.signer);
    this.contract5 = await deployContract('FHEVMTestSuite5', this.signer);
    this.contract6 = await deployContract('FHEVMTestSuite6', this.signer);
    this.contract7 = await deployContract('FHEVMTestSuite7', this.signer);
  });

  it('test operator "or" overload (uint8, euint8) => euint8 test 1', async function () {
    const input = this.instance.createEncryptedInput(this.contract3.address, this.signer.address);
    input.add8(173n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contract3.or_uint8_euint8(90n, encryptedAmount.handles[0], encryptedAmount.inputProof);
    await tx.wait();
    const handle = await this.contract3.resEuint8();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 255n });
  });

  it('test operator "or" overload (uint8, euint8) => euint8 test 2', async function () {
    const input = this.instance.createEncryptedInput(this.contract3.address, this.signer.address);
    input.add8(8n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contract3.or_uint8_euint8(4n, encryptedAmount.handles[0], encryptedAmount.inputProof);
    await tx.wait();
    const handle = await this.contract3.resEuint8();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 12n });
  });

  it('test operator "or" overload (uint8, euint8) => euint8 test 3', async function () {
    const input = this.instance.createEncryptedInput(this.contract3.address, this.signer.address);
    input.add8(8n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contract3.or_uint8_euint8(8n, encryptedAmount.handles[0], encryptedAmount.inputProof);
    await tx.wait();
    const handle = await this.contract3.resEuint8();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 8n });
  });

  it('test operator "or" overload (uint8, euint8) => euint8 test 4', async function () {
    const input = this.instance.createEncryptedInput(this.contract3.address, this.signer.address);
    input.add8(4n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contract3.or_uint8_euint8(8n, encryptedAmount.handles[0], encryptedAmount.inputProof);
    await tx.wait();
    const handle = await this.contract3.resEuint8();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 12n });
  });

  it('test operator "eq" overload (uint256, euint256) => ebool test 1', async function () {
    const input = this.instance.createEncryptedInput(this.contract3.address, this.signer.address);
    input.add256(115792089237316195423570985008687907853269984665640564039457581360616819891055n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contract3.eq_uint256_euint256(
      115792089237316195423570985008687907853269984665640564039457581365104411822857n,
      encryptedAmount.handles[0],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contract3.resEbool();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: false });
  });

  it('test operator "eq" overload (uint256, euint256) => ebool test 2', async function () {
    const input = this.instance.createEncryptedInput(this.contract3.address, this.signer.address);
    input.add256(115792089237316195423570985008687907853269984665640564039457575531239726454533n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contract3.eq_uint256_euint256(
      115792089237316195423570985008687907853269984665640564039457575531239726454529n,
      encryptedAmount.handles[0],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contract3.resEbool();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: false });
  });

  it('test operator "eq" overload (uint256, euint256) => ebool test 3', async function () {
    const input = this.instance.createEncryptedInput(this.contract3.address, this.signer.address);
    input.add256(115792089237316195423570985008687907853269984665640564039457575531239726454533n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contract3.eq_uint256_euint256(
      115792089237316195423570985008687907853269984665640564039457575531239726454533n,
      encryptedAmount.handles[0],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contract3.resEbool();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: true });
  });

  it('test operator "eq" overload (uint256, euint256) => ebool test 4', async function () {
    const input = this.instance.createEncryptedInput(this.contract3.address, this.signer.address);
    input.add256(115792089237316195423570985008687907853269984665640564039457575531239726454529n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contract3.eq_uint256_euint256(
      115792089237316195423570985008687907853269984665640564039457575531239726454533n,
      encryptedAmount.handles[0],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contract3.resEbool();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: false });
  });

  it('test operator "max" overload (euint8, euint32) => euint32 test 1', async function () {
    const input = this.instance.createEncryptedInput(this.contract3.address, this.signer.address);
    input.add8(49n);
    input.add32(2307043191n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contract3.max_euint8_euint32(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contract3.resEuint32();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 2307043191n });
  });

  it('test operator "max" overload (euint8, euint32) => euint32 test 2', async function () {
    const input = this.instance.createEncryptedInput(this.contract3.address, this.signer.address);
    input.add8(45n);
    input.add32(49n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contract3.max_euint8_euint32(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contract3.resEuint32();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 49n });
  });

  it('test operator "max" overload (euint8, euint32) => euint32 test 3', async function () {
    const input = this.instance.createEncryptedInput(this.contract3.address, this.signer.address);
    input.add8(49n);
    input.add32(49n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contract3.max_euint8_euint32(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contract3.resEuint32();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 49n });
  });

  it('test operator "max" overload (euint8, euint32) => euint32 test 4', async function () {
    const input = this.instance.createEncryptedInput(this.contract3.address, this.signer.address);
    input.add8(49n);
    input.add32(45n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contract3.max_euint8_euint32(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contract3.resEuint32();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 49n });
  });

  it('test operator "add" overload (uint16, euint16) => euint16 test 1', async function () {
    const input = this.instance.createEncryptedInput(this.contract3.address, this.signer.address);
    input.add16(30571n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contract3.add_uint16_euint16(28843n, encryptedAmount.handles[0], encryptedAmount.inputProof);
    await tx.wait();
    const handle = await this.contract3.resEuint16();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 59414n });
  });

  it('test operator "add" overload (uint16, euint16) => euint16 test 2', async function () {
    const input = this.instance.createEncryptedInput(this.contract3.address, this.signer.address);
    input.add16(442n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contract3.add_uint16_euint16(438n, encryptedAmount.handles[0], encryptedAmount.inputProof);
    await tx.wait();
    const handle = await this.contract3.resEuint16();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 880n });
  });

  it('test operator "add" overload (uint16, euint16) => euint16 test 3', async function () {
    const input = this.instance.createEncryptedInput(this.contract3.address, this.signer.address);
    input.add16(442n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contract3.add_uint16_euint16(442n, encryptedAmount.handles[0], encryptedAmount.inputProof);
    await tx.wait();
    const handle = await this.contract3.resEuint16();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 884n });
  });

  it('test operator "add" overload (uint16, euint16) => euint16 test 4', async function () {
    const input = this.instance.createEncryptedInput(this.contract3.address, this.signer.address);
    input.add16(438n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contract3.add_uint16_euint16(442n, encryptedAmount.handles[0], encryptedAmount.inputProof);
    await tx.wait();
    const handle = await this.contract3.resEuint16();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 880n });
  });

  it('test operator "not" overload (euint16) => euint16 test 1', async function () {
    const input = this.instance.createEncryptedInput(this.contract3.address, this.signer.address);
    input.add16(11968n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contract3.not_euint16(encryptedAmount.handles[0], encryptedAmount.inputProof);
    await tx.wait();
    const handle = await this.contract3.resEuint16();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 53567n });
  });

  it('test operator "max" overload (euint32, euint8) => euint32 test 1', async function () {
    const input = this.instance.createEncryptedInput(this.contract3.address, this.signer.address);
    input.add32(971425274n);
    input.add8(198n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contract3.max_euint32_euint8(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contract3.resEuint32();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 971425274n });
  });

  it('test operator "max" overload (euint32, euint8) => euint32 test 2', async function () {
    const input = this.instance.createEncryptedInput(this.contract3.address, this.signer.address);
    input.add32(194n);
    input.add8(198n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contract3.max_euint32_euint8(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contract3.resEuint32();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 198n });
  });

  it('test operator "max" overload (euint32, euint8) => euint32 test 3', async function () {
    const input = this.instance.createEncryptedInput(this.contract3.address, this.signer.address);
    input.add32(198n);
    input.add8(198n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contract3.max_euint32_euint8(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contract3.resEuint32();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 198n });
  });

  it('test operator "max" overload (euint32, euint8) => euint32 test 4', async function () {
    const input = this.instance.createEncryptedInput(this.contract3.address, this.signer.address);
    input.add32(198n);
    input.add8(194n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contract3.max_euint32_euint8(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contract3.resEuint32();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 198n });
  });
});
