import { Omit } from './utils'
import assert from 'assert'

export interface FileInfo {
  file: string
  content: string | Buffer
  extname: string
}

export interface Configuration {
  uploadContent: (file: FileInfo) => Promise<string | boolean>
  /** whether to write webpack assets in local fs (usually for debugging) */
  keepLocalFiles?: boolean
  /** whether to keep sourcemap assets in local fs */
  keepSourcemaps?: boolean
  /** whether to backup the original html assets */
  backupHTMLFiles?: boolean
  /**
   * name of the json file which keeps the url mapping
   * (usually for debugging). `false` means that you do
   * not need this file.
   */
  manifestFilename?: string | boolean
  /** emit error on upload fail */
  errorOnUploadFail?: boolean
}

/** default configuration */
export const defaults: Omit<Required<Configuration>, 'uploadContent'> = {
  keepLocalFiles: false,
  keepSourcemaps: false,
  backupHTMLFiles: false,
  manifestFilename: false,
  errorOnUploadFail: false
}

/** merge user configuration with defaults */
export const standardize = function(
  config: Configuration
): Required<Configuration> {
  assert(
    typeof config.uploadContent === 'function',
    '`config.uploadContent` is not a function.'
  )

  return {
    ...defaults,
    ...config
  }
}
