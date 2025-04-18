import { EventEmitter, InjectionSymbols, Repository, StorageService, inject, injectable } from '@credo-ts/core'

import { BasicMessageRecord } from './BasicMessageRecord'

@injectable()
export class BasicMessageRepository extends Repository<BasicMessageRecord> {
  public constructor(
    @inject(InjectionSymbols.StorageService) storageService: StorageService<BasicMessageRecord>,
    eventEmitter: EventEmitter
  ) {
    super(BasicMessageRecord, storageService, eventEmitter)
  }
}
