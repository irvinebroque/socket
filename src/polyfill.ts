import type { Socket } from './index';
import type { SocketAddress, SocketOptions } from './types';

export async function connect(
  address: SocketAddress | string,
  options?: SocketOptions,
): Promise<Socket> {
  if (navigator.userAgent === 'Cloudflare-Workers') {
    const { connect: cloudflareConnectImplementation } = await import(
      'cloudflare:sockets'
    );
    return cloudflareConnectImplementation(address, options);
  }
  const { connect: polyfillConnectImplementation } = await import('./index.ts');
  return polyfillConnectImplementation(address, options);
}
