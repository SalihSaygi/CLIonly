import Redis from 'ioredis';
import { REDIS_OPTIONS } from '../config/redis';

const client = new Redis(REDIS_OPTIONS);

client.on('error', function (error) {
  console.dir(error);
  console.error('Redis Error');
});
client.on('ready', function () {
  console.dir('Redis connection is ready');
});
client.on('end', function () {
  console.dir('Redis connection closed');
});

export default client;
