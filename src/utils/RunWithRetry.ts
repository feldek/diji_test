import { delay } from './Delay';

const runWithRetry = async <T>(
  handler: () => Promise<T>,
  maxRetries: number = 5,
): Promise<T> => {
  let lastException: unknown;

  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`Retry1: ${i}`);
      return await handler();
    } catch (e) {
      lastException = e;

      if (e instanceof Error) {
        await delay(50);

        continue;
      }

      throw e;
    }
  }

  throw lastException;
};

export { runWithRetry };
