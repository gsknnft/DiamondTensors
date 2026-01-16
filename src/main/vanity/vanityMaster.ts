import { Worker } from 'worker_threads';

export async function generateVanityMultiThreaded(options: { prefix?: string; suffix?: string; workers?: number }) {
  const { prefix = '', suffix = '', workers = 4 } = options;

  return new Promise((resolve, reject) => {
    const workerArray: Worker[] = [];
    let found = false;

    for (let i = 0; i < workers; i++) {
      const worker = new Worker('./vanityWorker.js', {
        workerData: { prefix, suffix },
      });

      worker.on('message', (result) => {
        if (!found) {
          found = true;
          // Kill all other workers
          workerArray.forEach((w) => w.terminate());
          resolve(result);
        }
      });

      worker.on('error', reject);
      workerArray.push(worker);
    }
  });
}


/* 

(async () => {
  const result = await generateVanityMultiThreaded({
    prefix: '1234',
    suffix: 'abcd',
    workers: 8,
  });

  console.log('Generated vanity wallet:', result);
})();

*/