// 

import * as forge from 'node-forge'



export const security = {

	hash(value: string): string {
		let md = forge.md.sha512.sha256.create()
		md.update(value)
		return md.digest().toHex()
	},

	hmac(message: string, prime: string): string {
		let hmac = forge.hmac.create()
		hmac.start('sha256', prime)
		hmac.update(message)
		return hmac.digest().toHex()
	},

	random(size: number): string {
		return forge.util.bytesToHex(forge.random.getBytesSync(Math.round(size * 0.5)))
	},

	generatePrime(size: number): Promise<string> {
		return new Promise<string>(function(resolve, reject) {
			forge.prime.generateProbablePrime((size * 4), function(error, result) {
				if (error) return reject(error);
				resolve(result.toString(16))
			})
		})
	},

	generatePemKeyPair(size: number): Promise<Security.PemKeyPair> {
		return new Promise(function(resolve, reject) {
			let opts = { bits: size, workers: -1 } as any
			// if (!core.isNodejs) opts.workerScript = '/prime.worker.min.js';
			forge.pki.rsa.generateKeyPair(opts, function(error, keypair) {
				if (error) return reject(error);
				resolve(keypair)
			})
		}).then(function(keypair: forge.pki.KeyPair) {
			return Promise.resolve({
				publicPem: forge.pki.publicKeyToPem(keypair.publicKey),
				privatePem: forge.pki.privateKeyToPem(keypair.privateKey),
			} as Security.PemKeyPair)
		})
	},

	encrypt<T = any>(decrypted: T, publicPem: string): T {
		let publicKey = forge.pki.publicKeyFromPem(publicPem)
		let encrypted = {} as T
		Object.keys(decrypted).forEach(function(key) {
			let value = decrypted[key]
			if (value == null) return;
			encrypted[key] = publicKey.encrypt(value)
		})
		return encrypted
	},

	decrypt<T = any>(encrypted: T, privatePem: string): T {
		let privateKey = forge.pki.privateKeyFromPem(privatePem)
		let decrypted = {} as T
		Object.keys(encrypted).forEach(function(key) {
			let value = encrypted[key]
			if (value == null) return;
			decrypted[key] = privateKey.decrypt(value)
		})
		return decrypted
	},

}





declare global {
	namespace Security {
		interface PemKeyPair {
			publicPem: string
			privatePem: string
		}
	}
}


