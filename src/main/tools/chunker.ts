export function randomizedChunkSplit(total: bigint, min: bigint, max: bigint): bigint[] {
  const out: bigint[] = [];
  let r = total;
  while (r > max) {
    const rand = BigInt(Math.floor(Math.random() * Number(max - min + 1n)) + Number(min));
    out.push(rand);
    r -= rand;
  }
  if (r > 0n) out.push(r);
  return out.sort(() => (Math.random() - 0.5));
}
