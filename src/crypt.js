// const { resolveContent, createContent } = require('./tripledes3.js')
import { resolveContent, createContent } from './crypto'

export const decrypt = (data, appKey) => resolveContent(data, appKey)

export const encrypt = (data, appKey) => createContent(data, appKey)
