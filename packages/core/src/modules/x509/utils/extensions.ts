import type { Key } from '../../../crypto'
import type { X509CertificateExtensionsOptions } from '../X509ServiceOptions'

import {
  AuthorityKeyIdentifierExtension,
  ExtendedKeyUsageExtension,
  KeyUsagesExtension,
  SubjectKeyIdentifierExtension,
  SubjectAlternativeNameExtension,
  BasicConstraintsExtension,
  CRLDistributionPointsExtension,
} from '@peculiar/x509'

import { TypedArrayEncoder } from '../../../utils'
import { IssuerAlternativeNameExtension } from '../extensions'

export const createSubjectKeyIdentifierExtension = (
  options: X509CertificateExtensionsOptions['subjectKeyIdentifier'],
  additionalOptions: { key: Key }
) => {
  if (!options || !options.include) return

  return new SubjectKeyIdentifierExtension(TypedArrayEncoder.toHex(additionalOptions.key.publicKey))
}

export const createKeyUsagesExtension = (options: X509CertificateExtensionsOptions['keyUsage']) => {
  if (!options) return

  const flags = options.usages.reduce((prev, curr) => prev | curr, 0)

  return new KeyUsagesExtension(flags, options.markAsCritical)
}

export const createExtendedKeyUsagesExtension = (options: X509CertificateExtensionsOptions['extendedKeyUsage']) => {
  if (!options) return

  return new ExtendedKeyUsageExtension(options.usages, options.markAsCritical)
}

export const createAuthorityKeyIdentifierExtension = (
  options: X509CertificateExtensionsOptions['authorityKeyIdentifier'],
  additionalOptions: { key: Key }
) => {
  if (!options) return

  return new AuthorityKeyIdentifierExtension(
    TypedArrayEncoder.toHex(additionalOptions.key.publicKey),
    options.markAsCritical
  )
}

export const createIssuerAlternativeNameExtension = (
  options: X509CertificateExtensionsOptions['issuerAlternativeName']
) => {
  if (!options) return

  return new IssuerAlternativeNameExtension(options.name, options.markAsCritical)
}

export const createSubjectAlternativeNameExtension = (
  options: X509CertificateExtensionsOptions['subjectAlternativeName']
) => {
  if (!options) return

  return new SubjectAlternativeNameExtension(options.name, options.markAsCritical)
}

export const createBasicConstraintsExtension = (options: X509CertificateExtensionsOptions['basicConstraints']) => {
  if (!options) return

  return new BasicConstraintsExtension(options.ca, options.pathLenConstraint, options.markAsCritical)
}

export const createCrlDistributionPointsExtension = (
  options: X509CertificateExtensionsOptions['crlDistributionPoints']
) => {
  if (!options) return

  return new CRLDistributionPointsExtension(options.urls, options.markAsCritical)
}
