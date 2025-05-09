import type { Key } from '@credo-ts/core'

import nock, { cleanAll } from 'nock'

import { getInMemoryAgentOptions } from '../../../../tests'

import { Agent, DidKey, KeyType, TypedArrayEncoder, getJwkFromKey } from '@credo-ts/core'

describe('sd-jwt-vc end to end test', () => {
  const issuer = new Agent(getInMemoryAgentOptions('sd-jwt-vc-issuer-agent'))
  let issuerKey: Key
  let issuerDidUrl: string

  const holder = new Agent(getInMemoryAgentOptions('sd-jwt-vc-holder-agent'))
  let holderKey: Key

  const verifier = new Agent(getInMemoryAgentOptions('sd-jwt-vc-verifier-agent'))
  const verifierDid = 'did:key:zUC74VEqqhEHQcgv4zagSPkqFJxuNWuoBPKjJuHETEUeHLoSqWt92viSsmaWjy82y'

  beforeAll(async () => {
    await issuer.initialize()
    issuerKey = await issuer.context.wallet.createKey({
      keyType: KeyType.Ed25519,
      seed: TypedArrayEncoder.fromString('00000000000000000000000000000000'),
    })

    const issuerDidKey = new DidKey(issuerKey)
    const issuerDidDocument = issuerDidKey.didDocument
    issuerDidUrl = (issuerDidDocument.verificationMethod ?? [])[0].id
    await issuer.dids.import({ didDocument: issuerDidDocument, did: issuerDidDocument.id })

    await holder.initialize()
    holderKey = await holder.context.wallet.createKey({
      keyType: KeyType.Ed25519,
      seed: TypedArrayEncoder.fromString('00000000000000000000000000000001'),
    })

    await verifier.initialize()
  })

  test('end to end flow', async () => {
    nock('https://example.com').get('/.well-known/vct/vct-type').reply(200, { vct: 'https://example.com/vct-type' })

    const credential = {
      vct: 'https://example.com/vct-type',
      given_name: 'John',
      family_name: 'Doe',
      email: 'johndoe@example.com',
      phone_number: '+1-202-555-0101',
      address: {
        street_address: '123 Main St',
        locality: 'Anytown',
        region: 'Anystate',
        country: 'US',
      },
      birthdate: '1940-01-01',
      is_over_18: true,
      is_over_21: true,
      is_over_65: true,
    } as const

    const { compact, header, payload } = await issuer.sdJwtVc.sign({
      payload: credential,
      holder: {
        method: 'jwk',
        jwk: getJwkFromKey(holderKey),
      },
      issuer: {
        didUrl: issuerDidUrl,
        method: 'did',
      },
      disclosureFrame: {
        _sd: [
          'is_over_65',
          'is_over_21',
          'is_over_18',
          'birthdate',
          'email',
          'given_name',
          'family_name',
          'phone_number',
        ],
        _sd_decoy: 2,
        address: {
          _sd: ['country', 'region', 'locality', 'street_address'],
          _sd_decoy: 2,
        },
      },
    })

    type Payload = typeof payload
    type Header = typeof header

    // parse SD-JWT
    const sdJwtVc = holder.sdJwtVc.fromCompact<Header, Payload>(compact)
    expect(sdJwtVc).toEqual({
      claimFormat: 'vc+sd-jwt',
      compact: expect.any(String),
      encoded: expect.any(String),
      header: {
        alg: 'EdDSA',
        kid: '#z6MktqtXNG8CDUY9PrrtoStFzeCnhpMmgxYL1gikcW3BzvNW',
        typ: 'vc+sd-jwt',
      },
      payload: {
        _sd: [
          expect.any(String),
          expect.any(String),
          expect.any(String),
          expect.any(String),
          expect.any(String),
          expect.any(String),
          expect.any(String),
          expect.any(String),
          expect.any(String),
          expect.any(String),
        ],
        _sd_alg: 'sha-256',
        address: {
          _sd: [
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
          ],
        },
        cnf: {
          jwk: {
            crv: 'Ed25519',
            kty: 'OKP',
            x: 'oENVsxOUiH54X8wJLaVkicCRk00wBIQ4sRgbk54N8Mo',
          },
        },
        iat: expect.any(Number),
        iss: 'did:key:z6MktqtXNG8CDUY9PrrtoStFzeCnhpMmgxYL1gikcW3BzvNW',
        vct: 'https://example.com/vct-type',
      },
      prettyClaims: {
        address: {
          country: 'US',
          locality: 'Anytown',
          region: 'Anystate',
          street_address: '123 Main St',
        },
        birthdate: '1940-01-01',
        cnf: {
          jwk: {
            crv: 'Ed25519',
            kty: 'OKP',
            x: 'oENVsxOUiH54X8wJLaVkicCRk00wBIQ4sRgbk54N8Mo',
          },
        },
        email: 'johndoe@example.com',
        family_name: 'Doe',
        given_name: 'John',
        iat: expect.any(Number),
        is_over_18: true,
        is_over_21: true,
        is_over_65: true,
        iss: 'did:key:z6MktqtXNG8CDUY9PrrtoStFzeCnhpMmgxYL1gikcW3BzvNW',
        phone_number: '+1-202-555-0101',
        vct: 'https://example.com/vct-type',
      },
      typeMetadata: undefined,
    })

    // Verify SD-JWT (does not require key binding)
    const verificationResult = await holder.sdJwtVc.verify({
      compactSdJwtVc: compact,
      fetchTypeMetadata: true,
    })
    expect(verificationResult.verification.isValid).toBe(true)
    expect(verificationResult.sdJwtVc?.typeMetadata).toEqual({
      vct: 'https://example.com/vct-type',
    })

    // Store credential
    await holder.sdJwtVc.store(compact)

    // Metadata created by the verifier and send out of band by the verifier to the holder
    const verifierMetadata = {
      audience: verifierDid,
      issuedAt: new Date().getTime() / 1000,
      nonce: await verifier.wallet.generateNonce(),
    }

    const presentation = await holder.sdJwtVc.present<Payload>({
      compactSdJwtVc: compact,
      verifierMetadata,
      presentationFrame: {
        given_name: true,
        family_name: true,
        email: true,
        phone_number: true,
        address: {
          street_address: true,
          locality: true,
          region: true,
          country: true,
        },
        birthdate: true,
        is_over_18: true,
        is_over_21: true,
        is_over_65: true,
      },
    })

    const { verification: presentationVerification } = await verifier.sdJwtVc.verify({
      compactSdJwtVc: presentation,
      keyBinding: { audience: verifierDid, nonce: verifierMetadata.nonce },
      requiredClaimKeys: [
        'is_over_65',
        'is_over_21',
        'is_over_18',
        'birthdate',
        'email',
        'address.country',
        'address.region',
        'address.locality',
        'address',
        'address.street_address',
        'given_name',
        'family_name',
        'phone_number',
      ],
    })

    expect(presentationVerification.isValid).toBeTruthy()

    cleanAll()
  })
})
