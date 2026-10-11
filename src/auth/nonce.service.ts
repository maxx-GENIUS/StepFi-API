import { Redis } from 'ioredis';

export class NonceService {
  constructor(private redis: Redis) {}

  /**
   * Atomically verifies and burns authentication nonce in a single operation.
   * Eliminates TOCTOU race conditions under concurrent authentication requests.
   */
  async consumeNonce(walletAddress: string, clientNonce: string): Promise<boolean> {
    const key = uth:nonce:;
    // Atomic GETDEL prevents duplicate concurrent read-before-delete
    const storedNonce = await this.redis.call('GETDEL', key);
    return storedNonce === clientNonce;
  }
}