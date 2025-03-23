#!/usr/bin/env node

import { run } from '../main'
import figlet from 'figlet'

const body = figlet.textSync('Jason CLI')

console.log(body)

run()
