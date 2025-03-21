#!/usr/bin/env node

import { run } from '../main'

import figlet from 'figlet'
const body = figlet.textSync('Jason')

console.log(body)

run()
