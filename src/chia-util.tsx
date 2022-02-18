import { bech32m } from 'bech32';
import { Buffer } from 'buffer';
import * as clvm from 'clvm';
import { SHA256 } from 'jscrypto/es6/SHA256';
import { Hex } from 'jscrypto/es6/Hex';
import BigNumber from 'bignumber.js';

export function sexpTreeHash(pz: clvm.SExp, precalculated: string[] = []): Buffer {
  let buf;
  const p = pz.pair;
  if (p) {
    const left = sexpTreeHash(p[0], precalculated);
    const right = sexpTreeHash(p[1], precalculated);
    buf = Buffer.concat([Buffer.from([2]), left, right]);
  } else {
    if (precalculated?.find(item => item == Buffer.from(pz.atom!.raw()).toString('hex'))) {
      return Buffer.from((pz.atom as any).raw());
    }
    buf = Buffer.concat([Buffer.from([1]), (pz.atom as any).raw()]);
  }
  return Buffer.from(SHA256.hash(Hex.parse(buf.toString('hex'))).toString(Hex), 'hex');
}

export function toCatPuzzleHash(assetId: string, innerPuzzleHash: string) {
  const pz_hex = (
    'ff02ffff01ff02ffff01ff02ff5effff04ff02ffff04ffff04ff05ffff04ffff0bff2cff0580ffff04ff0bff80808080ffff04ffff02ff17ff2f80ffff04ff5fffff04ffff02ff2effff04ff02ffff04ff17ff80808080ffff04ffff0bff82027fff82057fff820b7f80ffff04ff81bfffff04ff82017fffff04ff8202ffffff04ff8205ffffff04ff820bffff80808080808080808080808080ffff04ffff01ffffffff81ca3dff46ff0233ffff3c04ff01ff0181cbffffff02ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff22ffff0bff2cff3480ffff0bff22ffff0bff22ffff0bff2cff5c80ff0980ffff0bff22ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff0bffff01ff02ffff03ffff09ffff02ff2effff04ff02ffff04ff13ff80808080ff820b9f80ffff01ff02ff26ffff04ff02ffff04ffff02ff13ffff04ff5fffff04ff17ffff04ff2fffff04ff81bfffff04ff82017fffff04ff1bff8080808080808080ffff04ff82017fff8080808080ffff01ff088080ff0180ffff01ff02ffff03ff17ffff01ff02ffff03ffff20ff81bf80ffff0182017fffff01ff088080ff0180ffff01ff088080ff018080ff0180ffff04ffff04ff05ff2780ffff04ffff10ff0bff5780ff778080ff02ffff03ff05ffff01ff02ffff03ffff09ffff02ffff03ffff09ff11ff7880ffff0159ff8080ff0180ffff01818f80ffff01ff02ff7affff04ff02ffff04ff0dffff04ff0bffff04ffff04ff81b9ff82017980ff808080808080ffff01ff02ff5affff04ff02ffff04ffff02ffff03ffff09ff11ff7880ffff01ff04ff78ffff04ffff02ff36ffff04ff02ffff04ff13ffff04ff29ffff04ffff0bff2cff5b80ffff04ff2bff80808080808080ff398080ffff01ff02ffff03ffff09ff11ff2480ffff01ff04ff24ffff04ffff0bff20ff2980ff398080ffff010980ff018080ff0180ffff04ffff02ffff03ffff09ff11ff7880ffff0159ff8080ff0180ffff04ffff02ff7affff04ff02ffff04ff0dffff04ff0bffff04ff17ff808080808080ff80808080808080ff0180ffff01ff04ff80ffff04ff80ff17808080ff0180ffffff02ffff03ff05ffff01ff04ff09ffff02ff26ffff04ff02ffff04ff0dffff04ff0bff808080808080ffff010b80ff0180ff0bff22ffff0bff2cff5880ffff0bff22ffff0bff22ffff0bff2cff5c80ff0580ffff0bff22ffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bff2cff058080ff0180ffff04ffff04ff28ffff04ff5fff808080ffff02ff7effff04ff02ffff04ffff04ffff04ff2fff0580ffff04ff5fff82017f8080ffff04ffff02ff7affff04ff02ffff04ff0bffff04ff05ffff01ff808080808080ffff04ff17ffff04ff81bfffff04ff82017fffff04ffff0bff8204ffffff02ff36ffff04ff02ffff04ff09ffff04ff820affffff04ffff0bff2cff2d80ffff04ff15ff80808080808080ff8216ff80ffff04ff8205ffffff04ff820bffff808080808080808080808080ff02ff2affff04ff02ffff04ff5fffff04ff3bffff04ffff02ffff03ff17ffff01ff09ff2dffff0bff27ffff02ff36ffff04ff02ffff04ff29ffff04ff57ffff04ffff0bff2cff81b980ffff04ff59ff80808080808080ff81b78080ff8080ff0180ffff04ff17ffff04ff05ffff04ff8202ffffff04ffff04ffff04ff24ffff04ffff0bff7cff2fff82017f80ff808080ffff04ffff04ff30ffff04ffff0bff81bfffff0bff7cff15ffff10ff82017fffff11ff8202dfff2b80ff8202ff808080ff808080ff138080ff80808080808080808080ff018080ffff04ffff01a072dec062874cd4d3aab892a0906688a1ae412b0109982e1797a170add88bdcdcffff04ffff01a0' +
    assetId +
    'ffff04ffff01a0' +
    innerPuzzleHash +
    'ff0180808080'
  );
  const b = clvm.Bytes.from(pz_hex, 'hex');
  const s = new clvm.Stream(b);
  const pz = clvm.sexp_from_stream(new clvm.Stream(b), clvm.SExp.to);
  return sexpTreeHash(pz, [innerPuzzleHash]);
}

export function toChainAddress(address: string | Buffer) {
  if (!Buffer.isBuffer(address)) {
    address = Buffer.from(address, 'hex');
  }
  return bech32m.encode('xch', bech32m.toWords(address));
}

export const isValidAddress = (address: string) => {
  if (!address) return false;
  try {
    const data = bech32m.decode(address);
    return data && data.words && data.words.length == 52;
  } catch (error) {
    return false;
  }
}

export function shortenAddress(address = '') {
  if (address.length < 11) {
    return address;
  }

  return `${address.slice(0, 5)}...${address.slice(-4,)}`;
}

export const splitNumberByStep = (
  num: number | string,
  step = 3,
  symbol = ',',
  forceInt = false
) => {
  // eslint-disable-next-line prefer-const
  let [int, float] = (num + '').split('.');
  const reg = new RegExp(`(\\d)(?=(\\d{${step}})+(?!\\d))`, 'g');

  int = int.replace(reg, `$1${symbol}`);
  if (Number(num) > 1000000 || forceInt) {
    // hide the after-point part if number is more than 1000000
    float = '';
  }
  if (float) {
    return `${int}.${float}`;
  }
  return int;
};

export function toDecimalAmount(amount: number | BigNumber | string, decimals = 12) {
  if (!amount) return '0';
  const bn = new BigNumber(amount).div(Math.pow(10, decimals));
  const str = bn.toFixed();
  const split = str.split('.');
  if (!split[1] || split[1].length < decimals) {
    return splitNumberByStep(bn.toFixed());
  }
  return splitNumberByStep(bn.toFixed(decimals));
}