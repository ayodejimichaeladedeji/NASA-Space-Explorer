import cron from 'node-cron';
import { DateTime } from 'luxon';
import redisClient from '../config/redisClient.js';

export function updateCacheAndPreventRenderSleep() {
  cron.schedule('*/14 * * * *', async () => {
    const nowET = DateTime.now().setZone('America/New_York');

    if (nowET.hour === 0 && nowET.minute === 0) {
      try {
        await redisClient.del('apod_latest');
        console.log('Redis key apod_latest cleared');
      } catch (error) {
        console.error('Error clearing Redis key apod_latest:', error);
      }
    }
    else{
      console.log('Refreshing instance to prevent sleep on Render');
    }
  });
}