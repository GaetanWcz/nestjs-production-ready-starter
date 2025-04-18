import { setTimeout } from 'timers';

setTimeout(() => {
  console.log('All done.');
}, 100);

interface DebuggableProcess extends NodeJS.Process {
  _getActiveHandles(): unknown[];
  _getActiveRequests(): unknown[];
}

const dbgProcess = process as DebuggableProcess;

console.log('🔍 Active handles:', dbgProcess._getActiveHandles());
console.log('🔍 Active requests:', dbgProcess._getActiveRequests());
