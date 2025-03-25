#!/usr/bin/env node

import config from '../../cli.config'
import { run } from '../main'
import figlet from 'figlet'

const body = figlet.textSync(config.banner)

console.log(body)

run()
