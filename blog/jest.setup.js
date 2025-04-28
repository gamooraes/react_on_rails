// jest.setup.js
import { TextEncoder, TextDecoder } from 'text-encoding';
import '@testing-library/jest-dom';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
globalThis.import = { meta: { url: 'file://mock-url' } };