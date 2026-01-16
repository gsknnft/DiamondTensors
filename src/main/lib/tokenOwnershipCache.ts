import { Address } from 'viem';

interface TokenOwnership {
  tokenId: bigint;
  owner: Address;
  lastUpdated: number;
}

const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export class TokenOwnershipCache {
  private static instance: TokenOwnershipCache;
  private ownershipMap: Map<bigint, TokenOwnership>;
  private addressToTokens: Map<Address, Set<bigint>>;

  private constructor() {
    this.ownershipMap = new Map();
    this.addressToTokens = new Map();
  }

  static getInstance(): TokenOwnershipCache {
    if (!TokenOwnershipCache.instance) {
      TokenOwnershipCache.instance = new TokenOwnershipCache();
    }
    return TokenOwnershipCache.instance;
  }

  updateOwnership(tokenId: bigint, owner: Address): void {
    // Remove old owner mapping if exists
    const currentOwnership = this.ownershipMap.get(tokenId);
    if (currentOwnership) {
      const oldOwnerTokens = this.addressToTokens.get(currentOwnership.owner);
      oldOwnerTokens?.delete(tokenId);
      // Clean up empty sets
      if (oldOwnerTokens?.size === 0) {
        this.addressToTokens.delete(currentOwnership.owner);
      }
    }

    const ownership: TokenOwnership = {
      tokenId,
      owner,
      lastUpdated: Date.now(),
    };
    
    // Update ownership map
    this.ownershipMap.set(tokenId, ownership);

    // Update address to tokens map
    if (!this.addressToTokens.has(owner)) {
      this.addressToTokens.set(owner, new Set());
    }
    this.addressToTokens.get(owner)?.add(tokenId);
  }

  bulkUpdateOwnership(updates: { tokenId: bigint, owner: Address }[]): void {
    for (const update of updates) {
      this.updateOwnership(update.tokenId, update.owner);
    }
  }

  removeStaleEntries(): void {
    const now = Date.now();
    Array.from(this.ownershipMap.entries()).forEach(([tokenId, ownership]) => {
      if (now - ownership.lastUpdated > CACHE_TTL) {
        this.ownershipMap.delete(tokenId);
        const ownerTokens = this.addressToTokens.get(ownership.owner);
        ownerTokens?.delete(tokenId);
        if (ownerTokens?.size === 0) {
          this.addressToTokens.delete(ownership.owner);
        }
      }
    });
  }

  getTokenOwner(tokenId: bigint): Address | null {
    const ownership = this.ownershipMap.get(tokenId);
    if (!ownership || this.isStale(ownership.lastUpdated)) {
      return null;
    }
    return ownership.owner;
  }

  getAddressTokens(address: Address): bigint[] {
    const tokens = this.addressToTokens.get(address);
    if (!tokens) return [];
    
    // Filter out stale entries
    return Array.from(tokens).filter(tokenId => {
      const ownership = this.ownershipMap.get(tokenId);
      return ownership && !this.isStale(ownership.lastUpdated);
    });
  }

  private isStale(timestamp: number): boolean {
    return Date.now() - timestamp > CACHE_TTL;
  }

  clear(): void {
    this.ownershipMap.clear();
    this.addressToTokens.clear();
  }
}

export const ownershipCache = TokenOwnershipCache.getInstance();