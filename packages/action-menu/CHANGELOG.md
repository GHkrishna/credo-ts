# Changelog

## 0.5.13

### Patch Changes

- Updated dependencies [595c3d6]
  - @credo-ts/core@0.5.13

## 0.5.12

### Patch Changes

- Updated dependencies [3c85565]
- Updated dependencies [3c85565]
- Updated dependencies [7d51fcb]
- Updated dependencies [9756a4a]
  - @credo-ts/core@0.5.12

## 0.5.11

### Patch Changes

- @credo-ts/core@0.5.11

## 0.5.10

### Patch Changes

- Updated dependencies [fa62b74]
  - @credo-ts/core@0.5.10

## 0.5.9

### Patch Changes

- @credo-ts/core@0.5.9

## 0.5.8

### Patch Changes

- Updated dependencies [3819eb2]
- Updated dependencies [15d0a54]
- Updated dependencies [a5235e7]
  - @credo-ts/core@0.5.8

## 0.5.7

### Patch Changes

- Updated dependencies [352383f]
- Updated dependencies [1044c9d]
  - @credo-ts/core@0.5.7

## 0.5.6

### Patch Changes

- 66e696d: Fix build issue causing error with importing packages in 0.5.5 release
- Updated dependencies [66e696d]
  - @credo-ts/core@0.5.6

## 0.5.5

### Patch Changes

- 482a630: - feat: allow serving dids from did record (#1856)
  - fix: set created at for anoncreds records (#1862)
  - feat: add goal to public api for credential and proof (#1867)
  - fix(oob): only reuse connection if enabled (#1868)
  - fix: issuer id query anoncreds w3c (#1870)
  - feat: sd-jwt issuance without holder binding (#1871)
  - chore: update oid4vci deps (#1873)
  - fix: query for qualified/unqualified forms in revocation notification (#1866)
  - fix: wrong schema id is stored for credentials (#1884)
  - fix: process credential or proof problem report message related to connectionless or out of band exchange (#1859)
  - fix: unqualified indy revRegDefId in migration (#1887)
  - feat: verify SD-JWT Token status list and SD-JWT VC fixes (#1872)
  - fix(anoncreds): combine creds into one proof (#1893)
  - fix: AnonCreds proof requests with unqualified dids (#1891)
  - fix: WebSocket priority in Message Pick Up V2 (#1888)
  - fix: anoncreds predicate only proof with unqualified dids (#1907)
  - feat: add pagination params to storage service (#1883)
  - feat: add message handler middleware and fallback (#1894)
- Updated dependencies [3239ef3]
- Updated dependencies [d548fa4]
- Updated dependencies [482a630]
  - @credo-ts/core@0.5.5

## [0.5.3](https://github.com/openwallet-foundation/credo-ts/compare/v0.5.2...v0.5.3) (2024-05-01)

**Note:** Version bump only for package @credo-ts/action-menu

## [0.5.2](https://github.com/openwallet-foundation/credo-ts/compare/v0.5.1...v0.5.2) (2024-04-26)

**Note:** Version bump only for package @credo-ts/action-menu

## [0.5.1](https://github.com/openwallet-foundation/credo-ts/compare/v0.5.0...v0.5.1) (2024-03-28)

**Note:** Version bump only for package @credo-ts/action-menu

# [0.5.0](https://github.com/openwallet-foundation/credo-ts/compare/v0.4.2...v0.5.0) (2024-03-13)

### Features

- **openid4vc:** persistance and events ([#1793](https://github.com/openwallet-foundation/credo-ts/issues/1793)) ([f4c386a](https://github.com/openwallet-foundation/credo-ts/commit/f4c386a6ccf8adb829cad30b81d524e6ffddb029))

## [0.4.2](https://github.com/hyperledger/aries-framework-javascript/compare/v0.4.1...v0.4.2) (2023-10-05)

**Note:** Version bump only for package @credo-ts/action-menu

## [0.4.1](https://github.com/hyperledger/aries-framework-javascript/compare/v0.4.0...v0.4.1) (2023-08-28)

### Features

- oob without handhsake improvements and routing ([#1511](https://github.com/hyperledger/aries-framework-javascript/issues/1511)) ([9e69cf4](https://github.com/hyperledger/aries-framework-javascript/commit/9e69cf441a75bf7a3c5556cf59e730ee3fce8c28))

# [0.4.0](https://github.com/hyperledger/aries-framework-javascript/compare/v0.3.3...v0.4.0) (2023-06-03)

### Bug Fixes

- expose indy pool configs and action menu messages ([#1333](https://github.com/hyperledger/aries-framework-javascript/issues/1333)) ([518e5e4](https://github.com/hyperledger/aries-framework-javascript/commit/518e5e4dfb59f9c0457bfd233409e9f4b3c429ee))
- thread id improvements ([#1311](https://github.com/hyperledger/aries-framework-javascript/issues/1311)) ([229ed1b](https://github.com/hyperledger/aries-framework-javascript/commit/229ed1b9540ca0c9380b5cca6c763fefd6628960))

- refactor!: remove Dispatcher.registerMessageHandler (#1354) ([78ecf1e](https://github.com/hyperledger/aries-framework-javascript/commit/78ecf1ed959c9daba1c119d03f4596f1db16c57c)), closes [#1354](https://github.com/hyperledger/aries-framework-javascript/issues/1354)

### Features

- **openid4vc:** jwt format and more crypto ([#1472](https://github.com/hyperledger/aries-framework-javascript/issues/1472)) ([bd4932d](https://github.com/hyperledger/aries-framework-javascript/commit/bd4932d34f7314a6d49097b6460c7570e1ebc7a8))
- outbound message send via session ([#1335](https://github.com/hyperledger/aries-framework-javascript/issues/1335)) ([582c711](https://github.com/hyperledger/aries-framework-javascript/commit/582c711728db12b7d38a0be2e9fa78dbf31b34c6))

### BREAKING CHANGES

- `Dispatcher.registerMessageHandler` has been removed in favour of `MessageHandlerRegistry.registerMessageHandler`. If you want to register message handlers in an extension module, you can use directly `agentContext.dependencyManager.registerMessageHandlers`.

Signed-off-by: Ariel Gentile <gentilester@gmail.com>

## [0.3.3](https://github.com/hyperledger/aries-framework-javascript/compare/v0.3.2...v0.3.3) (2023-01-18)

### Bug Fixes

- fix typing issues with typescript 4.9 ([#1214](https://github.com/hyperledger/aries-framework-javascript/issues/1214)) ([087980f](https://github.com/hyperledger/aries-framework-javascript/commit/087980f1adf3ee0bc434ca9782243a62c6124444))

### Features

- **indy-sdk:** add indy-sdk package ([#1200](https://github.com/hyperledger/aries-framework-javascript/issues/1200)) ([9933b35](https://github.com/hyperledger/aries-framework-javascript/commit/9933b35a6aa4524caef8a885e71b742cd0d7186b))

## [0.3.2](https://github.com/hyperledger/aries-framework-javascript/compare/v0.3.1...v0.3.2) (2023-01-04)

**Note:** Version bump only for package @credo-ts/action-menu

## [0.3.1](https://github.com/hyperledger/aries-framework-javascript/compare/v0.3.0...v0.3.1) (2022-12-27)

**Note:** Version bump only for package @credo-ts/action-menu

# [0.3.0](https://github.com/hyperledger/aries-framework-javascript/compare/v0.2.5...v0.3.0) (2022-12-22)

- refactor!: rename Handler to MessageHandler (#1161) ([5e48696](https://github.com/hyperledger/aries-framework-javascript/commit/5e48696ec16d88321f225628e6cffab243718b4c)), closes [#1161](https://github.com/hyperledger/aries-framework-javascript/issues/1161)
- feat(action-menu)!: move to separate package (#1049) ([e0df0d8](https://github.com/hyperledger/aries-framework-javascript/commit/e0df0d884b1a7816c7c638406606e45f6e169ff4)), closes [#1049](https://github.com/hyperledger/aries-framework-javascript/issues/1049)

### BREAKING CHANGES

- Handler has been renamed to MessageHandler to be more descriptive, along with related types and methods. This means:

Handler is now MessageHandler
HandlerInboundMessage is now MessageHandlerInboundMessage
Dispatcher.registerHandler is now Dispatcher.registerMessageHandlers

- action-menu module has been removed from the core and moved to a separate package. To integrate it in an Agent instance, it can be injected in constructor like this:

```ts
const agent = new Agent({
  config: {
    /* config */
  },
  dependencies: agentDependencies,
  modules: {
    actionMenu: new ActionMenuModule(),
    /* other custom modules */
  },
})
```

Then, module API can be accessed in `agent.modules.actionMenu`.
